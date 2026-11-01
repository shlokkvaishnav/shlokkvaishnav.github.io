# shlokkvaishnav.github.io

My personal site. A small Node script builds one plain page from the files in `data/`. The page shows my experience, my leadership roles and my research.

![Site](https://github.com/shlokkvaishnav/shlokkvaishnav.github.io/actions/workflows/site.yml/badge.svg) ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Live: <https://shlokkvaishnav.github.io>

## Overview

The site is one page with no framework and no npm packages. It has three sections: Experience, Leadership and Research. There is no Projects section and no feed. The build uses only the files in this repository. It does not use the network.

## How it works

```
data/*.json  ──> scripts/build.mjs ──> dist/ ──> GitHub Pages
```

- **Research.** Each item in `data/private-work.json` is one line in the Research section.
- **CV.** The CV link opens `data/Shlok_Vaishnav_Resume.pdf`. To update it, replace that file.

### When it updates

The workflow `.github/workflows/site.yml` builds and deploys the site:

- on every push to `main`,
- when you start it by hand (Actions tab, "Run workflow").

A failed build does not deploy, so the live site stays as it was.

### What to edit

| What | Where |
|---|---|
| Name, bio, links, email, and the lines with emojis (heading subtitles, footer, 404) | `data/profile.json` |
| Experience (organizations and roles) | `data/experience.json` |
| Leadership (organizations and roles) | `data/leadership.json` |
| Research | `data/private-work.json` |
| The site address and the GitHub owner | `data/config.json` |
| Look | `assets/style.css`. Icons, fonts and their licences: `assets/CREDITS.md` |

**Add a position.** At an organization that is already listed, add an entry at the top of its `roles` list, with `title`, `start` (`YYYY-MM`), `end` (`YYYY-MM`, or `null` while I still hold it) and `summary`. The roles then show on a connecting line, as on LinkedIn, and the durations come from the dates. An organization with only one role shows as a plain entry. For a new organization, add an object with `org` and `roles`.

**Add a research item.** Add an object at the top of `data/private-work.json` with `summary`, `tag` and `emoji`. Write the question, not a result.

## Run it locally

Node 22 or newer. There is nothing to install.

```sh
npm run build                                    # write dist/
python3 -m http.server --directory dist 8000     # open http://localhost:8000
```

## Tests

```sh
npm test                          # unit tests
node scripts/check-links.mjs dist # every link in the built site
```

## Repo layout

| Path | What |
|---|---|
| `scripts/build.mjs` | The build: reads `data/`, writes `dist/` |
| `scripts/lib/` | HTML rendering and icons |
| `scripts/check-links.mjs` | Link checker for the built site |
| `data/` | Profile, experience, leadership, research, config, and the CV |
| `assets/` | Stylesheet, fonts, icons, avatar, and their licences |
| `tests/` | Unit tests |
| `.github/workflows/` | `site.yml` builds and deploys; `ci.yml` runs the tests |

The earlier React and Three.js design is kept in git history, at the tag `archive/observatory-v2`. An earlier version of this site listed my public GitHub repositories as projects. That code is in git history before the commit "Remove the Projects section".

## License

MIT. See [LICENSE](LICENSE).
