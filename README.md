# shlokkvaishnav.github.io

My personal site. A small Node script builds one plain page from my public GitHub repositories, so the project list is never out of date.

![Site](https://github.com/shlokkvaishnav/shlokkvaishnav.github.io/actions/workflows/site.yml/badge.svg) ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Live: <https://shlokkvaishnav.github.io>

## Overview

The site is one page with no framework and no npm packages. It shows my experience, leadership roles, projects and ongoing research. The projects come from the GitHub API at build time: every public repository becomes a row, and its GitHub description is the project text. A project with a GitHub Pages site or a homepage address gets a "Live" link, so each project page (for example the mini-vLLM scheduler lab) is one click away.

## How it works

```
data/*.json  ─┐
              ├─> scripts/build.mjs ──> dist/ ──> GitHub Pages
GitHub API   ─┘   (public data only)
```

- **Projects.** Every public repository becomes a row on the home page. The repository description is the project text.
- **Live links.** A project shows "Live" if its repository has a GitHub Pages site or a homepage address.
- **Research.** Work with no public code comes from `data/private-work.json`.
- **CV.** The CV link opens `data/Shlok_Vaishnav_Resume.pdf`. To update it, replace that file.
- **Feed.** `/feed.xml` is an Atom feed of project updates.

### When it updates

The workflow `.github/workflows/site.yml` builds and deploys the site:

- on every push to `main`,
- every 6 hours,
- when you start it by hand (Actions tab, "Run workflow").

The build fails if GitHub returns no repositories or a request fails. A failed build does not deploy, so the live site stays as it was.

### What to edit

| What | Where |
|---|---|
| Name, bio, links, email, and the lines with emojis (heading subtitles, footer, 404) | `data/profile.json` |
| Experience (organizations and roles) | `data/experience.json` |
| Leadership (organizations and roles) | `data/leadership.json` |
| Research with no public code | `data/private-work.json` |
| Which repositories show, their order, live links | `data/config.json` |
| Look | `assets/style.css`. Icons, fonts and their licences: `assets/CREDITS.md` |
| A project's text | Its description on GitHub. The next build uses it. |

**Add a position.** At an organization that is already listed, add an entry at the top of its `roles` list, with `title`, `start` (`YYYY-MM`), `end` (`YYYY-MM`, or `null` while I still hold it) and `summary`. The roles then show on a connecting line, as on LinkedIn, and the durations come from the dates. An organization with only one role shows as a plain entry. For a new organization, add an object with `org` and `roles`.

`data/config.json`:

- `exclude`: repository names to hide. The profile repository and this repository are hidden.
- `pin`: repositories to show first, in this order. The rest follow, newest push first.
- `hideForks`: when `true`, forks of other people's projects are not shown.
- `ownForks`: forks that are my own work. They show even when `hideForks` is `true`.
- `liveOverride`: the live link for a repository, or `null` to show none.

## Run it locally

Node 22 or newer. There is nothing to install.

```sh
GITHUB_TOKEN=$(gh auth token) npm run build     # build from the live GitHub API into dist/
npm run build:offline                            # build from saved answers in tests/fixtures
python3 -m http.server --directory dist 8000     # open http://localhost:8000
```

`GITHUB_TOKEN` is optional. Without it, GitHub allows 60 requests per hour.

## Tests

```sh
npm test                          # unit tests
node scripts/check-links.mjs dist # every link in the built site
```

## Limitations

- Private repositories do not show as projects, because the build reads public data only. List them in `data/private-work.json` instead.
- A pinned repository that is deleted or made private is skipped without an error. Remove it from `pin` to keep `data/config.json` clean.

## Repo layout

| Path | What |
|---|---|
| `scripts/build.mjs` | The build: reads `data/` and the GitHub API, writes `dist/` |
| `scripts/lib/` | GitHub client, repository selection, HTML rendering, icons |
| `scripts/check-links.mjs` | Link checker for the built site |
| `data/` | Profile, experience, leadership, research, config, and the CV |
| `assets/` | Stylesheet, fonts, icons, avatar, and their licences |
| `tests/` | Unit tests and saved GitHub answers (`tests/fixtures/`) |
| `.github/workflows/` | `site.yml` builds and deploys; `ci.yml` runs the tests |

The earlier React and Three.js design is kept in git history, at the tag `archive/observatory-v2`.

## License

MIT. See [LICENSE](LICENSE).
