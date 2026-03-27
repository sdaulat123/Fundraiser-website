
## Fundraiser Website

This repo now includes a local Telegram-to-Codex automation pipeline for controlled website edits.

## App

Run `npm install`.

Run `npm run dev` to start the website locally.

Run `npm run build` to validate the app bundle.

## Telegram Automation

The bot listens for Telegram messages, turns them into a structured task, asks Codex to apply a minimal code change, validates the build, then commits and pushes on success.

### Safety rules

- Only files under `src` or `components` are allowed to change.
- The pipeline refuses to run if the git working tree is dirty.
- If task confidence is below `0.7`, the bot replies with `Need clarification`.
- If validation fails, the bot rolls back its own patch before exiting.
- The pipeline never deletes files and instructs Codex to apply the smallest possible diff.

### Setup

1. Copy `.env.example` to `.env`.
2. Set `TELEGRAM_BOT_TOKEN`.
3. Optionally set `TELEGRAM_ALLOWED_CHAT_IDS` to restrict who can trigger edits.
4. Confirm `codex exec --help` works locally.
5. Make sure the current branch matches `GIT_BRANCH` and the working tree is clean.

### Run

Start the bot:

```bash
npm run telegram:bot
```

Test the parser locally:

```bash
npm run telegram:test-parse -- "Change the hero headline to Support Recovery Together"
```

### Logs

Each request is appended to `logs/updates.log` with:

- timestamp
- original message
- confidence
- files changed
- commit SHA or error status
  
