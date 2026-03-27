import fs from "node:fs/promises";
import path from "node:path";
import { walkFiles } from "./fs-utils.mjs";

const EXTENSION_SCORE = {
  ".tsx": 0.16,
  ".ts": 0.12,
  ".jsx": 0.16,
  ".js": 0.12,
  ".css": 0.08,
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "button",
  "change",
  "component",
  "create",
  "for",
  "from",
  "in",
  "make",
  "page",
  "section",
  "the",
  "to",
  "update",
  "website",
  "with",
]);

function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter(
    (token) => token.length > 2 && !STOP_WORDS.has(token),
  );
}

function scoreFile(relativePath, content, tokens) {
  const fileName = path.basename(relativePath).toLowerCase();
  const relPath = relativePath.toLowerCase();
  let score = EXTENSION_SCORE[path.extname(relativePath)] ?? 0;

  for (const token of tokens) {
    if (fileName.includes(token)) {
      score += 0.25;
    } else if (relPath.includes(token)) {
      score += 0.12;
    }

    if (content.includes(token)) {
      score += 0.05;
    }
  }

  return Number(score.toFixed(4));
}

export async function findRelevantFiles(rootDir, allowedRoots, message, limit = 5) {
  const tokens = tokenize(message);
  const files = await walkFiles(rootDir, allowedRoots);
  const scored = [];

  for (const absolutePath of files) {
    const relativePath = path.relative(rootDir, absolutePath);
    const rawContent = await fs.readFile(absolutePath, "utf8");
    const content = rawContent.toLowerCase().slice(0, 6000);
    const score = scoreFile(relativePath, content, tokens);

    if (score > 0) {
      scored.push({ path: relativePath.replace(/\\/g, "/"), score });
    }
  }

  scored.sort((left, right) => right.score - left.score);
  return scored.slice(0, limit);
}
