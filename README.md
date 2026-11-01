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
| Name, bio, links, email, the short `description` (up to 160 characters, used by search and shared links), and the lines with emojis (heading subtitles, 404) | `data/profile.json` |
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

## Cache and versions

The build adds a version to the address of the stylesheet and of the social picture, for example `/assets/style.css?v=01aa2544c3`. The version is a short hash of the file. A changed file gets a new address, so a browser or a sharing service fetches it at once and never shows an old design. Nothing to do: the build does it.

`assets/apple-touch-icon.png` (180 x 180) is the icon for iPhone home screens. Make it again from the avatar with `sips -z 180 180 -s format png assets/avatar.jpg --out assets/apple-touch-icon.png`.

## Social preview card

When someone shares the site address, LinkedIn, X and Slack show the picture `assets/social.png` (1200 x 630 pixels). The page head points to it with the `og:image` and `twitter:*` tags.

The picture is made once and committed. Its source is `scripts/social-card.html`. Render it again after a change of name, role or avatar. Run this from the repo root (needs Google Chrome):

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --allow-file-access-from-files --virtual-time-budget=4000 --window-size=1200,630 \
  --screenshot="$PWD/assets/social.png" "file://$PWD/scripts/social-card.html"
```

Then check the size with `sips -g pixelWidth -g pixelHeight assets/social.png`. A test fails if the picture is not 1200 x 630. The services keep a copy of a preview, so a new picture can take a while to show.

## Repo layout

| Path | What |
|---|---|
| `scripts/build.mjs` | The build: reads `data/`, writes `dist/` |
| `scripts/lib/` | HTML rendering and icons |
| `scripts/check-links.mjs` | Link checker for the built site |
| `scripts/social-card.html` | Source of `assets/social.png`, the picture for shared links |
| `data/` | Profile, experience, leadership, research, config, and the CV |
| `assets/` | Stylesheet, fonts, icons, avatar, and their licences |
| `tests/` | Unit tests |
| `.github/workflows/` | `site.yml` builds and deploys; `ci.yml` runs the tests |

The earlier React and Three.js design is kept in git history, at the tag `archive/observatory-v2`. An earlier version of this site listed my public GitHub repositories as projects. That code is in git history before the commit "Remove the Projects section".

## License

MIT. See [LICENSE](LICENSE).
