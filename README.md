# shlokkvaishnav.github.io

![Site](https://github.com/shlokkvaishnav/shlokkvaishnav.github.io/actions/workflows/site.yml/badge.svg) ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

The personal site of Shlok Vaishnav: <https://shlokkvaishnav.github.io>

It is one plain page. It has no framework and no npm packages. A small Node script builds it from my public GitHub repositories, so the project list is never out of date.

## How it works

```
data/*.json   ─┐
content/*.md  ─┼─> scripts/build.mjs ──> dist/ ──> GitHub Pages
GitHub API    ─┘   (public data only)
```

- **Projects.** Every public repository becomes a row on the home page. The repository description is the project text. Each repository also gets its own page at `/projects/<repo>/`, made from its README.
- **Live demo links.** A project shows "Live" if its repository has a GitHub Pages site, or a homepage address.
- **CV.** The CV link opens my resume, the file `data/Shlok_Vaishnav_Resume.pdf`. To update it, replace that file.
- **Feed.** `/feed.xml` is an Atom feed of project updates.

## When it updates

The workflow `.github/workflows/site.yml` builds and deploys the site:

- on every push to `main`,
- every 6 hours,
- when you start it by hand (Actions tab, "Run workflow").

The build fails if GitHub returns no repositories or a request fails. A failed build does not deploy, so the live site stays as it was.

## What to edit

| What | Where |
|---|---|
| Name, bio, links, email, and the fun lines with emojis (tagline, fun fact, heading subtitles, footer, 404) | `data/profile.json` |
| Experience (organizations and roles) | `data/experience.json` |
| Leadership (organizations and roles) | `data/leadership.json` |
| Research with no public code | `data/private-work.json` |
| Which repositories show, order, live links | `data/config.json` |
| Look | `assets/style.css`. Icons, fonts and their licences: `assets/CREDITS.md` |

**Add a position.** At an organization that is already listed, add one more entry at the top of its `roles` list, with `title`, `start` (`YYYY-MM`), `end` (`YYYY-MM`, or `null` while I still hold it) and `summary`. The roles then show on a connecting line, like on LinkedIn, and the durations are worked out from the dates. An organization with only one role is shown as a plain entry. For a new organization, add a new object with `org` and `roles`.

`data/config.json`:

- `exclude`: repository names to hide. The profile repository and this repository are hidden.
- `pin`: repositories to show first, in this order. The rest follow, newest push first.
- `hideForks`: when `true`, forks of other people's projects are not shown.
- `ownForks`: forks that are my own work. They are shown even when `hideForks` is `true`.
- `liveOverride`: set the live link for a repository, or `null` to show none.

To change a project's text, change its description on GitHub. The next build picks it up.

## Run it on your computer

Node 22 or newer. There is nothing to install.

```sh
npm test                    # unit tests
GITHUB_TOKEN=$(gh auth token) npm run build     # build from the live GitHub API into dist/
npm run build:offline       # build from saved answers in tests/fixtures
node scripts/check-links.mjs dist
python3 -m http.server --directory dist 8000    # open http://localhost:8000
```

`GITHUB_TOKEN` is optional. Without it, GitHub allows 60 requests per hour.

## Old design

The earlier React and Three.js design is kept in git history. See the tag `archive/observatory-v2`.

## License

MIT. See [LICENSE](LICENSE).
