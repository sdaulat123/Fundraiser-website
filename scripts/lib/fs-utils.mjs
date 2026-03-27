import fs from "node:fs/promises";
import path from "node:path";

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function walkFiles(rootDir, allowedRoots) {
  const files = [];

  for (const root of allowedRoots) {
    const absoluteRoot = path.join(rootDir, root);
    if (!(await pathExists(absoluteRoot))) {
      continue;
    }
    await walk(absoluteRoot, files);
  }

  return files;
}

async function walk(currentPath, files) {
  const entries = await fs.readdir(currentPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(currentPath, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, files);
      continue;
    }
    files.push(fullPath);
  }
}
