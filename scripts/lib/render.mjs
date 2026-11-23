// Page templates. Each function takes data and returns a string. Nothing here reads files or the network.
// Every value that comes from outside (the JSON files) goes through esc().

import { esc, formatDate, formatDuration, formatMonth, monthsBetween } from './html.mjs'

const monthOf = (ym) => formatMonth(`${ym}-01T00:00:00Z`)

// A line of text with an emoji after it. The emoji only decorates, so screen readers skip it.
// A non-breaking space keeps the emoji on the same line as the last word.
function fun(item) {
  return `${esc(item.text)}${item.emoji ? `&nbsp;<span class="emoji" aria-hidden="true">${item.emoji}</span>` : ''}`
}

function layout({ site, profile, icon, title, description, path, body, bodyClass = '', footer = true, jsonld = null }) {
  const url = `${site.url}${path}`
  const built = formatDate(site.builtAt)
  // The picture that shows when the address is shared. It is rendered from scripts/social-card.html (see the README).
  // The version in the address makes a browser or a sharing service fetch a changed file at once.
  const versioned = (file, version) => (version ? `${file}?v=${version}` : file)
  const image = `${site.url}${versioned('/assets/social.png', site.imageVersion)}`
  const imageAlt = `${profile.name}: ${profile.role}`
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#fbfbfc" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#14151a" media="(prefers-color-scheme: dark)">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:site_name" content="${esc(profile.name)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
<meta name="twitter:image:alt" content="${esc(imageAlt)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/literata.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${versioned('/assets/style.css', site.cssVersion)}">${
    jsonld ? `\n<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>` : ''
  }
</head>
<body class="${esc(bodyClass)}">
<a class="skip" href="#main">Skip to content</a>
<main id="main">
${body}
</main>${
    footer
      ? `
<footer>
<p>Last built ${esc(built)}.</p>
<p class="foot-links"><a class="ilink" href="${esc(site.sourceUrl)}">${icon('github')} Source</a></p>
</footer>`
      : ''
  }
</body>
</html>
`
}

// One organization with its roles, newest first. The role is the main line of each entry: its title with the dates
// on the same row, then the organization (and place) in a quieter line, then the summary. An organization with
// several roles shows its name once above them, so a promotion is easy to see. Every role sits on the same left
// edge, whether it is alone or one of several. A new position at the same organization is one more entry at the top
// of its `roles` list.
function roleItem(role, now, byline) {
  const duration = formatDuration(monthsBetween(role.start, role.end, now))
  return `<li class="position${role.end ? '' : ' current'}">
<div class="position-head"><p class="position-title"><strong>${esc(role.title)}</strong></p>
<p class="position-when"><span>${esc(monthOf(role.start))} to ${role.end ? esc(monthOf(role.end)) : 'now'}</span><span>${esc(duration)}</span></p></div>
${byline ? `<p class="position-org">${esc(byline)}</p>` : ''}
<p class="position-text">${esc(role.summary)}</p>
</li>`
}

function orgItem(group, now) {
  const multi = group.roles.length > 1
  const first = group.roles.reduce((a, r) => (r.start < a ? r.start : a), group.roles[0].start)
  const stillOpen = group.roles.some((r) => !r.end)
  const last = stillOpen ? null : group.roles.reduce((a, r) => (r.end > a ? r.end : a), group.roles[0].end)
  const total = multi ? formatDuration(monthsBetween(first, last, now)) : ''
  // One role: the organization is the line under the title. Several roles: the name heads the group instead.
  const byline = multi ? '' : [group.org, group.location].filter(Boolean).join(' \u00b7 ')
  return `<li class="org">
${
  multi
    ? `<div class="org-head"><span class="org-name">${esc(group.org)}</span>${total ? `<span class="org-total">${esc(total)}</span>` : ''}</div>
${group.location ? `<p class="org-place">${esc(group.location)}</p>` : ''}
`
    : ''
}<ol class="positions">
${group.roles.map((r) => roleItem(r, now, byline)).join('\n')}
</ol>
</li>`
}

function timeline(groups, now) {
  return `<ul class="timeline">
${groups.map((g) => orgItem(g, now)).join('\n')}
</ul>`
}

function personJsonLd(site, profile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: site.url,
    jobTitle: profile.role,
    affiliation: { '@type': 'CollegeOrUniversity', name: profile.education.institution },
    sameAs: profile.links.map((l) => l.href),
  }
}

// One publication, in the same markup as a role in Experience: the title (a link to its DOI) where the role
// title goes, the year where the dates go, the authors (my name in bold) where the organization goes, then a
// one-line description, the venue and the DOI.
function publication(p) {
  const authors = (p.authors ?? []).map((a) => (a === p.me ? `<strong>${esc(a)}</strong>` : esc(a))).join(', ')
  const doiUrl = `https://doi.org/${encodeURI(p.doi ?? '').replace(/#/g, '%23').replace(/\?/g, '%3F')}`
  const where = [p.venue, p.place].filter(Boolean).join(', ')
  return `<li class="org">
<ol class="positions">
<li class="position">
<div class="position-head"><p class="position-title"><strong><a class="pub-title" href="${esc(doiUrl)}">${esc(p.title)}</a></strong></p>
<p class="position-when"><span>${esc(String(p.year))}</span></p></div>
<p class="position-org pub-authors">${authors}</p>
${p.description ? `<p class="position-text pub-desc">${esc(p.description)}</p>\n` : ''}${where ? `<p class="pub-meta">${esc(where)}</p>\n` : ''}${p.doi ? `<p class="pub-meta">DOI: <a href="${esc(doiUrl)}">${esc(p.doi)}</a></p>` : ''}
</li>
</ol>
</li>`
}

// One project, in the same markup as a role in Experience: the name and tagline where the role title goes, the
// links (live site, and the code when the repo is public) where the dates go, the tools where the organization
// goes, and the description where the summary goes.
function project(p) {
  const links = [
    p.live ? `<a href="${esc(p.live)}">Live</a>` : '',
    p.repo ? `<a href="${esc(p.repo)}">GitHub</a>` : '',
  ].filter(Boolean)
  return `<li class="org">
<ol class="positions">
<li class="position">
<div class="position-head"><p class="position-title"><strong>${esc(p.name)}</strong>${p.tagline ? `<span class="project-tagline">: ${esc(p.tagline)}</span>` : ''}</p>
${links.length ? `<p class="position-when project-links">${links.join('')}</p>` : ''}</div>
${p.tools ? `<p class="position-org">${esc(p.tools)}</p>\n` : ''}<p class="position-text">${esc(p.description)}</p>
</li>
</ol>
</li>`
}

export function indexPage({ site, profile, icon, experience, projects = [], leadership, privateWork, publications = [] }) {
  const links = [
    `<a class="ilink" href="mailto:${esc(profile.email)}">${icon('envelope')} Email</a>`,
    `<a class="ilink" href="/Shlok_Vaishnav_Resume.pdf">${icon('file-earmark-person')} CV</a>`,
    `<a class="ilink" href="/Shlok_Vaishnav_Resume_Research.pdf">${icon('file-earmark-person')} Research CV</a>`,
    ...profile.links.map((l) => `<a class="ilink" href="${esc(l.href)}">${icon(l.icon)} ${esc(l.label)}</a>`),
  ]

  const body = `<div class="layout">
<aside class="profile">
<img class="avatar" src="${esc(profile.avatar)}" width="160" height="160" alt="Portrait of ${esc(profile.name)}">
<div class="who">
<h1>${esc(profile.name)}</h1>
<p class="role">${esc(profile.role)}</p>
</div>
<ul class="affil">
<li>${icon('mortarboard')} ${esc(profile.education.institution)}</li>
<li>${icon('geo-alt')} ${esc(profile.education.location)}</li>
</ul>
<nav class="links" aria-label="Contact and profiles">
${links.join('\n')}
</nav>
${profile.availability ? `<p class="note">${fun(profile.availability)}</p>` : ''}
</aside>

<div class="content">
<div class="bio">
<p class="lead">${esc(profile.bio[0])}</p>
${profile.bio
  .slice(1)
  .map((p) => `<p>${esc(p)}</p>`)
  .join('\n')}
</div>

<section id="experience">
<header class="section-head">
<h2>${icon('briefcase')} Experience</h2>
${profile.subtitles?.experience ? `<p class="subtitle">${fun(profile.subtitles.experience)}</p>` : ''}
</header>
${timeline(experience, site.builtAt)}
</section>

${
  projects.length
    ? `<section id="projects">
<header class="section-head">
<h2>${icon('kanban')} Projects</h2>
${profile.subtitles?.projects ? `<p class="subtitle">${fun(profile.subtitles.projects)}</p>` : ''}
</header>
<ul class="timeline">
${projects.map(project).join('\n')}
</ul>
</section>
`
    : ''
}
<section id="leadership">
<header class="section-head">
<h2>${icon('people')} Leadership</h2>
${profile.subtitles?.leadership ? `<p class="subtitle">${fun(profile.subtitles.leadership)}</p>` : ''}
</header>
${timeline(leadership, site.builtAt)}
</section>

${
  privateWork.length
    ? `<section id="research">
<header class="section-head">
<h2>${icon('lightbulb')} Research</h2>
${profile.subtitles?.research ? `<p class="subtitle">${fun(profile.subtitles.research)}</p>` : ''}
</header>
<ul class="points">
${privateWork
  .map((w) => `<li>${esc(w.summary)} <span class="chip">${fun({ text: w.tag, emoji: w.emoji })}</span></li>`)
  .join('\n')}
</ul>
</section>
`
    : ''
}${
  publications.length
    ? `
<section id="publications">
<header class="section-head">
<h2>${icon('journal-text')} Publications</h2>
${profile.subtitles?.publications ? `<p class="subtitle">${fun(profile.subtitles.publications)}</p>` : ''}
</header>
<ul class="timeline">
${publications.map(publication).join('\n')}
</ul>
</section>
`
    : ''
}</div>
</div>`

  return layout({
    site,
    profile,
    icon,
    title: profile.name,
    description: profile.description ?? profile.bio[0],
    path: '/',
    bodyClass: 'home',
    body,
    jsonld: personJsonLd(site, profile),
  })
}

export function notFoundPage({ site, profile, icon }) {
  return layout({
    site,
    profile,
    icon,
    title: `Page not found — ${profile.name}`,
    description: 'This page does not exist.',
    path: '/404.html',
    body: `<h1>Page not found</h1>
<p>${profile.notFoundLine ? fun(profile.notFoundLine) : 'This page does not exist.'}</p>
<p><a href="/">Take me home</a></p>`,
  })
}

export function sitemapXml({ site }) {
  const urls = [
    { loc: `${site.url}/`, lastmod: site.builtAt },
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `<url><loc>${esc(u.loc)}</loc><lastmod>${new Date(u.lastmod).toISOString().slice(0, 10)}</lastmod></url>`)
  .join('\n')}
</urlset>
`
}
