
## Fundraiser Website

This repo now includes a local Telegram-to-Codex automation pipeline for controlled website edits.

## App

Run `npm install`.

Run `npm run dev` to start the website locally.

Run `npm run build` to validate the app bundle.

## Blog CMS

The owner blog now uses GitHub-backed markdown publishing.

### How it works

1. The website is deployed on Vercel.
2. The owner signs in at `/admin`.
3. The admin creates or edits a post.
4. The server commits a markdown file into `src/content/posts` through the GitHub API.
5. Vercel redeploys from `main`, and the updated post appears on `/blog`.

### Owner sign-in

### Required Vercel env vars

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH`

`GITHUB_TOKEN` must have repository write access so the publish endpoint can commit markdown files.

### Content source

The public site reads blog posts from `src/content/posts`.

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
  
