import fs from "node:fs/promises";
import path from "node:path";
import { ensureDir } from "./fs-utils.mjs";

export async function logUpdate(logFile, payload) {
  await ensureDir(path.dirname(logFile));
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    ...payload,
  });
  await fs.appendFile(logFile, `${line}\n`, "utf8");
}
