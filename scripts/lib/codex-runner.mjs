import fs from "node:fs/promises";
import path from "node:path";
import { ensureDir } from "./fs-utils.mjs";
import { runCommand } from "./shell.mjs";

function buildPrompt(task, allowedRoots) {
  const candidateSummary = task.candidate_files
    .map((candidate) => `- ${candidate.path} (${candidate.score})`)
    .join("\n");

  return `
You are modifying a local website repo in response to a Telegram request.

Task JSON:
${JSON.stringify(task, null, 2)}

Hard constraints:
- Only modify files inside these roots: ${allowedRoots.join(", ")}
- Never delete files
- Never overwrite the entire project
- Apply the smallest possible diff
- Preserve existing formatting and component structure
- If the request is unclear, do not edit any file and explain why
- After editing, stop and provide a short summary of files changed

Relevant candidate files:
${candidateSummary || "- none"}
`.trim();
}

export async function runCodexEdit({ rootDir, codexBin, codexModel, codexSandbox, codexOutputDir, task, allowedRoots }) {
  await ensureDir(codexOutputDir);
  const outputFile = path.join(codexOutputDir, "last-message.txt");
  const args = [
    "exec",
    "--cd",
    rootDir,
    "--sandbox",
    codexSandbox,
    "--output-last-message",
    outputFile,
  ];

  if (codexModel) {
    args.push("--model", codexModel);
  }

  args.push("-");

  await runCommand(codexBin, args, {
    cwd: rootDir,
    stdin: buildPrompt(task, allowedRoots),
  });

  return fs.readFile(outputFile, "utf8");
}
