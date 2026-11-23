# shlokkvaishnav.github.io: notes for the agent

The owner's personal site: one plain page (Experience, Leadership, Research, Publications) built by
`scripts/build.mjs` from `data/*.json`. No framework and no npm packages. Live at
https://shlokkvaishnav.github.io.

## Start here
1. The SessionStart hook prints the branch and the next step from `.claude/STATE.md`.
2. Content is in `data/` (the "What to edit" table in `README.md`); look is `assets/style.css`;
   rendering is `scripts/lib/`; tests are `tests/*.test.mjs`.

## Hard rules
- MUST NOT push to `main` unless the owner asks: every push deploys the live site
  (`.github/workflows/site.yml`).
- MUST NOT add npm packages or a framework. (Why: the site's point is no dependencies.)
- MUST NOT copy the owner's email, phone or other details from `data/profile.json` into any other
  file, commit message, issue or external request.
- Research lines state the question, not a result (README, "Add a research item").
- Plain English. No co-author or AI attribution lines in commits.

## Commands (repo root, Node 22+)
- Done check: `bash .claude/check.sh` (unit tests, build to a temp dir, link check).
- Preview: `npm run build && python3 -m http.server --directory dist 8000`.

## Definition of done
`bash .claude/check.sh` passes, and the change was looked at in the built page (desktop and phone
width). One change at a time.

## End of session
Rewrite `.claude/STATE.md` (about 20 lines at most): branch, what changed, next step. Replace it.
