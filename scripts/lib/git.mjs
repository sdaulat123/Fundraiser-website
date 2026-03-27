import fs from "node:fs/promises";
import path from "node:path";
import { runCommand } from "./shell.mjs";

function parseStatus(output) {
  return output
    .split(/\r?\n/)
    .map((line) => line.replace(/\r/g, ""))
    .filter(Boolean);
}

function parsePorcelain(output) {
  return parseStatus(output).map((line) => ({
    code: line.slice(0, 2),
    path: line.slice(3).trim(),
  }));
}

export async function ensureCleanWorkingTree(rootDir) {
  const { stdout } = await runCommand("git", ["status", "--porcelain"], { cwd: rootDir });
  const lines = parseStatus(stdout);
  if (lines.length > 0) {
    throw new Error("Working tree is not clean. Auto-edit aborted.");
  }
}

export async function currentBranch(rootDir) {
  const { stdout } = await runCommand("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd: rootDir });
  return stdout.trim();
}

export async function diffNames(rootDir) {
  const { stdout } = await runCommand("git", ["status", "--porcelain"], { cwd: rootDir });
  return parsePorcelain(stdout).map((entry) => entry.path);
}

export async function createDiffPatch(rootDir, patchPath) {
  const { stdout } = await runCommand("git", ["diff", "--binary", "--", "src", "components"], { cwd: rootDir });
  await fs.writeFile(patchPath, stdout, "utf8");
}

export async function rollbackPatch(rootDir, patchPath) {
  await runCommand("git", ["apply", "-R", patchPath], { cwd: rootDir });
}

export async function rollbackChanges(rootDir) {
  const { stdout } = await runCommand("git", ["status", "--porcelain"], { cwd: rootDir });
  const entries = parsePorcelain(stdout);
  const tracked = [];

  for (const entry of entries) {
    if (entry.code === "??") {
      await fs.rm(path.join(rootDir, entry.path), { recursive: true, force: true });
    } else {
      tracked.push(entry.path);
    }
  }

  if (tracked.length > 0) {
    await runCommand("git", ["restore", "--staged", "--worktree", "--source=HEAD", "--", ...tracked], {
      cwd: rootDir,
    });
  }
}

export async function commitAndPush(rootDir, message, remote, branch) {
  await runCommand("git", ["add", "."], { cwd: rootDir });
  await runCommand("git", ["commit", "-m", message], { cwd: rootDir });
  await runCommand("git", ["push", remote, branch], { cwd: rootDir });
  const { stdout } = await runCommand("git", ["rev-parse", "--short", "HEAD"], { cwd: rootDir });
  return stdout.trim();
}
