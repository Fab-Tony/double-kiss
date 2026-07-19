# Double Kiss — team site

A small mobile-first web app for the **Double Kiss** pool team (Sydney Diamond League, Season 28),
hosted free on **GitHub Pages** and installable to a phone home screen (PWA).

- **Repo:** https://github.com/Fab-Tony/double-kiss
- **Live site:** https://fab-tony.github.io/double-kiss/
- **Deploy branch:** `main` (auto-publishes via GitHub Actions on every push)

## Pages
| File | Tab | What it shows |
|------|-----|---------------|
| `index.html`  | Home   | Next match, who's available, news, upcoming fixtures |
| `roster.html` | Roster | Games by week (tap to expand who's on) + player filter + finals targets |
| `stats.html`  | Stats  | Season record & performance (fills in as results land) |
| `teams.html`  | Teams  | The 13 Monday teams & captains |
| `info.html`   | Info   | League rules, scoring, contact |

Shared files: `styles.css` (all styling), `app.js` (top bar + bottom tab bar),
`data.js` (**all the data**). Icons: `favicon.svg`, `icon.svg`, `icon-192/512.png`,
`apple-touch-icon.png`, plus `manifest.json` (home-screen install).

## Editing content — do it in `data.js`
`data.js` is the single source of truth. Change it and every page updates.

- **Who's away:** edit a player's `out: [ ... ]` (week numbers) and their `leave:` text.
- **Fixtures:** the `fixtures` array (wk, date, iso, opponent, home/away, table).
- **Finals targets:** each player's `target` (matches needed), `finals` (true/false), `played` (bump as they play).
- **News:** add `{ date, title, body }` to the `news` array (newest first).
- **Stats/results:** fill in the `stats` object and push `results` entries after each match.
- **Teams:** the `teams` array.

Rule of thumb: only **3 play per night** (`PLAYERS_PER_NIGHT`), so rotate the lineup to hit everyone's finals target.

## Publishing a change
From a clone of the repo:
```bash
git add -A
git commit -m "Update"
git push origin main
```
GitHub Actions rebuilds and the live site updates in ~1–2 minutes. (Or ask Claude to make the change and push.)

## Adding a new page
1. Copy an existing page (e.g. `info.html`) and set `<body data-page="...">`.
2. Add a tab to the `tabs` array in `app.js`.
3. Pull any data from `window.DK` in `data.js`.

## Context for Claude (future Cowork sessions)
- **The cloud sandbox cannot reach `api.github.com`** (Anthropic proxy blocks it) — the REST API and `gh` CLI don't work here. Use **git over HTTPS**; that path works.
- Pages is deployed by the Actions workflow `.github/workflows/pages.yml` (source = "GitHub Actions").
- **Auth:** a fine-grained PAT on `Fab-Tony/double-kiss` with **Contents, Pages, and Workflows** (read/write). Not stored in the repo; Tony pastes it per session. **Never commit the token.**
- Verify locally with the pre-installed Chromium via Playwright (`iPhone 12` device) before pushing.
- Source content: 2026 Comprehensive Rules + Season 28 schedule in Tony's `Double kiss` folder; roster/leave/targets from Tony.

## Troubleshooting a 404
Repo must be **public**; check the **Actions** tab for a failed run; **Settings → Pages** source should be **GitHub Actions**; first deploy can take a few minutes.
