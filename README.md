
## Fundraiser Website

This repo now includes a local Telegram-to-Codex automation pipeline for controlled website edits.

## App

Run `npm install`.

Run `npm run dev` to start the website locally.

Run `npm run build` to validate the app bundle.

## Blog CMS

The Vercel-compatible blog setup uses Sanity.

### How it works

1. The website is deployed on Vercel.
2. The owner signs in to Sanity Studio.
3. The owner creates or edits blog posts there.
4. The site fetches published posts from Sanity and renders them on `/blog`.

### Owner sign-in

`/admin` is now the owner entrypoint. It does not use Netlify Identity or Git Gateway.

Instead, `/admin` sends the owner to Sanity Studio once `VITE_SANITY_STUDIO_URL` is configured.

There is no public sign-up on the website. Access is controlled by who you invite into the Sanity project.

### Frontend env vars

Add these to your Vercel project:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`
- `VITE_SANITY_USE_CDN`
- `VITE_SANITY_STUDIO_URL`

### Studio setup

This repo includes a `studio/` app for Sanity Studio.

1. Run `npm install`.
2. Run `npm --prefix studio install`.
3. Set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`.
4. Run `npm run cms:dev` locally.
5. Deploy `studio/` as its own Vercel project or use Sanity-hosted Studio.
6. Put that deployed Studio URL into `VITE_SANITY_STUDIO_URL` for the main site.

### Content fallback

Until Sanity is configured, the website still reads the local sample posts in `src/content/posts`.

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
  
