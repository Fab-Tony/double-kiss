# Double Kiss site — how it's built and how to update it

Static site for the **Double Kiss** pool team (Sydney Diamond League, Season 28).
The main page is a single self-contained file — `index.html` — with all CSS and JS inline.
Hosted free on **GitHub Pages**.

- **Repo:** https://github.com/Fab-Tony/double-kiss
- **Live site:** https://fab-tony.github.io/double-kiss/
- **Deploy branch:** `main`

---

## How publishing works

Every push to `main` runs the workflow `.github/workflows/pages.yml`, which publishes the
whole repo root to GitHub Pages. There is no manual publish step — **commit, push, wait
~1–2 minutes, refresh the site.**

---

## Editing the page

`index.html` is the page. Edit it, then from a clone of the repo:

```bash
git add -A
git commit -m "Update reference"
git push origin main
```

The Action redeploys automatically. Or just ask Claude in a Cowork session to make the
change and push it for you.

---

## Adding more pages

Drop another `.html` file in the repo root (e.g. `results.html`) and link to it from
`index.html`. It goes live at `https://fab-tony.github.io/double-kiss/results.html`.
The workflow publishes everything in the root, so new files deploy the same way.

Keep each page self-contained (inline CSS/JS), or add a shared `style.css` and link to it
from each page — either works.

---

## Context for Claude (future Cowork sessions)

Read this before trying to deploy — the environment has one important quirk.

- **The cloud sandbox cannot reach `api.github.com`.** Anthropic's proxy blocks it, so the
  GitHub REST API and the `gh` CLI do **not** work here. Use **git over HTTPS** instead —
  that path works fine. This is why Pages was enabled via the Actions workflow
  (`actions/configure-pages` with `enablement: true`) rather than the REST API.
- **Auth:** a fine-grained Personal Access Token on `Fab-Tony/double-kiss` with
  **Contents: read/write**, **Pages: read/write**, and **Workflows: read/write**.
  The token is **not** stored in this repo and does not persist between sessions — Tony
  pastes it into the session when a push is needed.
- **Push pattern that works from the sandbox:**
  ```bash
  git clone https://x-access-token:<TOKEN>@github.com/Fab-Tony/double-kiss.git
  cd double-kiss
  # edit files
  git commit -am "..." && git push origin main
  ```
- **Never commit the token** or write it into any file in the repo.
- Content (fixtures, roster, leave, rules) comes from the 2026 Comprehensive Rules and the
  Season 28 schedule in Tony's `Double kiss` folder, plus roster/leave Tony provides.
  Claude's project memory file `double_kiss_reference.md` holds the structured data — keep
  it and this repo in sync when things change.

---

## Troubleshooting a 404 on the live site

1. **The repo must be public** — GitHub Pages on the free plan won't serve a private repo.
2. Check the **Actions** tab for a failed run (red ✗) and read the failing step.
3. In **Settings → Pages**, the source should be **GitHub Actions** (we deploy via the
   workflow). If it's set to "Deploy from a branch" as well, prefer switching it to
   "GitHub Actions" to avoid the two methods conflicting.
4. The very first deploy can take a few minutes to propagate through the CDN.
