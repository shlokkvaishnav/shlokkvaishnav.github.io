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
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/literata.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/style.css">${
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
<p>Last built ${esc(built)}. ${profile.footerLine ? fun(profile.footerLine) : ''}</p>
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

export function indexPage({ site, profile, icon, experience, leadership, privateWork }) {
  const links = [
    `<a class="ilink" href="mailto:${esc(profile.email)}">${icon('envelope')} Email</a>`,
    `<a class="ilink" href="/Shlok_Vaishnav_Resume.pdf">${icon('file-earmark-person')} CV</a>`,
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
<h2>${icon('briefcase')} Experience</h2>
${profile.subtitles?.experience ? `<p class="subtitle">${fun(profile.subtitles.experience)}</p>` : ''}
${timeline(experience, site.builtAt)}
</section>

<section id="leadership">
<h2>${icon('people')} Leadership</h2>
${profile.subtitles?.leadership ? `<p class="subtitle">${fun(profile.subtitles.leadership)}</p>` : ''}
${timeline(leadership, site.builtAt)}
</section>

${
  privateWork.length
    ? `<section id="research">
<h2>${icon('lightbulb')} Research</h2>
${profile.subtitles?.research ? `<p class="subtitle">${fun(profile.subtitles.research)}</p>` : ''}
<ul class="points">
${privateWork
  .map((w) => `<li>${esc(w.summary)} <span class="chip">${fun({ text: w.tag, emoji: w.emoji })}</span></li>`)
  .join('\n')}
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
    description: profile.bio[0],
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
