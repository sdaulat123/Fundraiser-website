import { findRelevantFiles } from "./repo-search.mjs";

function detectIntent(message) {
  const lower = message.toLowerCase();
  if (/\bfix|bug|broken|error|issue|align|spacing|typo\b/.test(lower)) {
    return "fix_bug";
  }
  if (/\badd|create|include|insert|feature|section\b/.test(lower)) {
    return "add_feature";
  }
  return "edit_ui";
}

function computeConfidence(message, candidates) {
  let confidence = 0.35;
  const lower = message.toLowerCase();

  if (message.trim().length >= 18) {
    confidence += 0.12;
  }

  if (/\b(hero|footer|about|donation|transparency|impact|button|headline|text|color|layout|section)\b/.test(lower)) {
    confidence += 0.18;
  }

  if (/\b(change|update|fix|add|replace|remove|move)\b/.test(lower)) {
    confidence += 0.16;
  }

  if (candidates[0]?.score >= 0.4) {
    confidence += 0.2;
  } else if (candidates[0]?.score >= 0.25) {
    confidence += 0.1;
  }

  return Math.min(0.99, Number(confidence.toFixed(2)));
}

export async function parseTask({ rootDir, allowedRoots, message }) {
  const candidates = await findRelevantFiles(rootDir, allowedRoots, message);
  const targetFile = candidates[0]?.path ?? "";
  const confidence = computeConfidence(message, candidates);

  return {
    intent: detectIntent(message),
    target_file: targetFile,
    change_description: message.trim(),
    confidence,
    candidate_files: candidates,
  };
}
