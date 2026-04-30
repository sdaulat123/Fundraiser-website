
## Fundraiser Website

This repo now includes a local Telegram-to-Codex automation pipeline for controlled website edits.

## App

Run `npm install`.

Run `npm run dev` to start the website locally.

Run `npm run build` to validate the app bundle.

## Blog CMS

The blog is now fully file-backed and managed through Decap CMS at `/admin`. Published posts live in `src/content/posts` as markdown files, and publishing from the admin commits those files back to GitHub.

### Owner publishing flow

1. The owner visits `/admin`.
2. The owner signs in.
3. The owner creates or edits a post.
4. Publishing writes a commit to the GitHub-connected repository.
5. Netlify rebuilds the site and the new blog content appears on `/blog`.

### No public sign-up

This admin is intended to be sign-in only.

1. Deploy the site to Netlify.
2. Enable Identity.
3. Set Identity registration to `Invite only`.
4. Enable Git Gateway for the site.
5. Invite the owner account from Netlify Identity users.
6. Optionally enable GitHub as the external provider for login so the owner signs in with GitHub.

With `Invite only`, there is no open public sign-up path. The owner must be invited before access works.

### Content model

Blog posts are stored in:

- `src/content/posts/*.md`
- uploaded media in `public/uploads/blog`

The CMS configuration is in:

- `public/admin/config.yml`
- `public/admin/index.html`

### Local development

Run `npm install`.

Run `npm run dev`.

The blog reads local markdown files during development and production builds.

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
  
