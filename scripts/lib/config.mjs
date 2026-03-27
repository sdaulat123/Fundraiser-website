import path from "node:path";

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function splitCsv(value, fallback) {
  return (value ?? fallback)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function loadConfig() {
  const rootDir = process.cwd();
  const allowedRoots = splitCsv(process.env.ALLOWED_EDIT_ROOTS, "src,components");

  return {
    rootDir,
    telegramBotToken: required("TELEGRAM_BOT_TOKEN"),
    telegramAllowedChatIds: splitCsv(process.env.TELEGRAM_ALLOWED_CHAT_IDS, ""),
    telegramPollIntervalMs: Number(process.env.TELEGRAM_POLL_INTERVAL_MS ?? 3000),
    telegramBaseUrl: process.env.TELEGRAM_BASE_URL ?? "https://api.telegram.org",
    codexBin: process.env.CODEX_BIN ?? "codex",
    codexModel: process.env.CODEX_MODEL ?? "",
    codexSandbox: process.env.CODEX_SANDBOX ?? "workspace-write",
    codexOutputDir: path.join(rootDir, ".codex-output"),
    allowedRoots,
    clarificationThreshold: Number(process.env.CLARIFICATION_THRESHOLD ?? 0.7),
    logFile: path.join(rootDir, "logs", "updates.log"),
    buildCommand: process.env.BUILD_COMMAND ?? "npm run build",
    gitRemote: process.env.GIT_REMOTE ?? "origin",
    gitBranch: process.env.GIT_BRANCH ?? "main",
  };
}
