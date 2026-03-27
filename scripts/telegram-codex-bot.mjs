import fs from "node:fs/promises";
import path from "node:path";
import { loadConfig } from "./lib/config.mjs";
import { runCodexEdit } from "./lib/codex-runner.mjs";
import { ensureDir } from "./lib/fs-utils.mjs";
import { ensureCleanWorkingTree, createDiffPatch, rollbackPatch, rollbackChanges, diffNames, commitAndPush, currentBranch } from "./lib/git.mjs";
import { logUpdate } from "./lib/logger.mjs";
import { parseTask } from "./lib/task-parser.mjs";
import { fetchUpdates, sendMessage } from "./lib/telegram.mjs";
import { validateBuild } from "./lib/validator.mjs";

const config = loadConfig();
const stateFile = path.join(config.codexOutputDir, "telegram-state.json");

async function loadOffset() {
  try {
    const raw = await fs.readFile(stateFile, "utf8");
    return JSON.parse(raw).offset ?? 0;
  } catch {
    return 0;
  }
}

async function saveOffset(offset) {
  await ensureDir(path.dirname(stateFile));
  await fs.writeFile(stateFile, JSON.stringify({ offset }, null, 2), "utf8");
}

function summarizeFiles(files) {
  return files.length > 0 ? files.join(", ") : "none";
}

function isAllowedChat(chatId) {
  if (config.telegramAllowedChatIds.length === 0) {
    return true;
  }
  return config.telegramAllowedChatIds.includes(String(chatId));
}

function createCommitMessage(message) {
  const summary = message.replace(/\s+/g, " ").trim().slice(0, 72);
  return `Auto update from Telegram request: ${summary}`;
}

async function handleMessage(message) {
  const chatId = message.chat.id;
  const originalText = message.text?.trim();

  if (!originalText) {
    await sendMessage(config.telegramBaseUrl, config.telegramBotToken, chatId, "Need clarification");
    return;
  }

  if (!isAllowedChat(chatId)) {
    await sendMessage(config.telegramBaseUrl, config.telegramBotToken, chatId, "Chat is not authorized for repository updates.");
    return;
  }

  const task = await parseTask({
    rootDir: config.rootDir,
    allowedRoots: config.allowedRoots,
    message: originalText,
  });

  if (task.confidence < config.clarificationThreshold || !task.target_file) {
    await logUpdate(config.logFile, {
      status: "clarification_needed",
      message: originalText,
      confidence: task.confidence,
      filesChanged: [],
    });
    await sendMessage(config.telegramBaseUrl, config.telegramBotToken, chatId, "Need clarification");
    return;
  }

  await ensureCleanWorkingTree(config.rootDir);

  const patchPath = path.join(config.codexOutputDir, "last-change.patch");
  await ensureDir(config.codexOutputDir);

  try {
    const branch = await currentBranch(config.rootDir);
    if (branch !== config.gitBranch) {
      throw new Error(`Current branch is ${branch}, expected ${config.gitBranch}.`);
    }

    await runCodexEdit({
      rootDir: config.rootDir,
      codexBin: config.codexBin,
      codexModel: config.codexModel,
      codexSandbox: config.codexSandbox,
      codexOutputDir: config.codexOutputDir,
      task,
      allowedRoots: config.allowedRoots,
    });

    const filesChanged = await diffNames(config.rootDir);
    const outOfBounds = filesChanged.filter(
      (file) => !config.allowedRoots.some((root) => file === root || file.startsWith(`${root}/`) || file.startsWith(`${root}\\`)),
    );

    if (filesChanged.length === 0) {
      await logUpdate(config.logFile, {
        status: "no_change",
        message: originalText,
        confidence: task.confidence,
        filesChanged: [],
      });
      await sendMessage(config.telegramBaseUrl, config.telegramBotToken, chatId, "Need clarification");
      return;
    }

    if (outOfBounds.length > 0) {
      throw new Error(`Codex modified files outside allowed roots: ${outOfBounds.join(", ")}`);
    }

    await createDiffPatch(config.rootDir, patchPath);
    await validateBuild(config.rootDir, config.buildCommand);
    const commitSha = await commitAndPush(
      config.rootDir,
      createCommitMessage(originalText),
      config.gitRemote,
      config.gitBranch,
    );

    await logUpdate(config.logFile, {
      status: "success",
      message: originalText,
      confidence: task.confidence,
      filesChanged,
      commitSha,
    });

    await sendMessage(
      config.telegramBaseUrl,
      config.telegramBotToken,
      chatId,
      `Updated successfully.\nCommit: ${commitSha}\nFiles: ${summarizeFiles(filesChanged)}`,
    );
  } catch (error) {
    const patchExists = await fs
      .access(patchPath)
      .then(() => true)
      .catch(() => false);

    if (patchExists) {
      await rollbackPatch(config.rootDir, patchPath).catch(() => {});
    }
    await rollbackChanges(config.rootDir).catch(() => {});

    await logUpdate(config.logFile, {
      status: "error",
      message: originalText,
      confidence: task.confidence,
      filesChanged: [],
      error: error.message,
    });

    await sendMessage(
      config.telegramBaseUrl,
      config.telegramBotToken,
      chatId,
      `Request failed: ${error.message}`,
    );
  } finally {
    await fs.rm(patchPath, { force: true }).catch(() => {});
  }
}

async function main() {
  let offset = await loadOffset();

  while (true) {
    try {
      const updates = await fetchUpdates(config.telegramBaseUrl, config.telegramBotToken, offset);

      for (const update of updates) {
        offset = update.update_id + 1;
        await saveOffset(offset);

        if (update.message) {
          await handleMessage(update.message);
        }
      }
    } catch (error) {
      console.error(`[telegram-codex-bot] ${error.message}`);
    }

    await new Promise((resolve) => setTimeout(resolve, config.telegramPollIntervalMs));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
