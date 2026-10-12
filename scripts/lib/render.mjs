// Page templates. Each function takes data and returns a string. Nothing here reads files or the network.
// Every value that comes from outside (the GitHub API, the JSON files) goes through esc().

import { esc, formatDate, formatMonth } from './html.mjs'

const monthOf = (ym) => formatMonth(`${ym}-01T00:00:00Z`)

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
<link rel="alternate" type="application/atom+xml" href="/feed.xml" title="Updates">
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
<p>Built ${esc(built)} from GitHub.</p>
<p class="foot-links"><a class="ilink" href="/feed.xml">${icon('rss')} Feed</a> <a class="ilink" href="${esc(site.sourceUrl)}">${icon('github')} Source</a></p>
</footer>`
      : ''
  }
</body>
</html>
`
}

function chips(project) {
  const out = []
  if (project.archived) out.push('<span class="chip">archived</span>')
  if (project.isFork) out.push('<span class="chip">fork</span>')
  return out.join('')
}

// Small facts about a project: language, status, licence, last push. Each fact has a dot or text, no separators.
function facts(project, { license = false } = {}) {
  const dot = project.languageColor ? ` style="--dot:${esc(project.languageColor)}"` : ''
  return `<div class="facts">
${project.language ? `<span class="fact"><i class="dot"${dot}></i>${esc(project.language)}</span>` : ''}
<span class="fact status-${project.status}"><i class="dot"></i>${project.status}</span>
${license && project.license ? `<span class="fact muted">${esc(project.license)} licence</span>` : ''}
<span class="fact muted">Updated ${esc(formatDate(project.pushedAt))}</span>
</div>`
}

function tags(project) {
  if (!project.topics.length) return ''
  return `<p class="tags">${project.topics.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</p>`
}

function projectItem(project, icon) {
  return `<li class="project">
<div class="head"><a class="name" href="/projects/${esc(project.name)}/">${esc(project.name)}</a>${chips(project)}</div>
${project.description ? `<p class="desc">${esc(project.description)}</p>` : ''}
${facts(project)}
<div class="actions"><a class="ilink" href="${esc(project.codeUrl)}">${icon('github')} Code</a>${
    project.liveUrl ? `<a class="ilink" href="${esc(project.liveUrl)}">${icon('box-arrow-up-right')} Live demo</a>` : ''
  }</div>
${tags(project)}
</li>`
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

export function indexPage({ site, profile, icon, experience, privateWork, projects }) {
  const links = [
    `<a class="ilink" href="mailto:${esc(profile.email)}">${icon('envelope')} Email</a>`,
    `<a class="ilink" href="/cv.pdf">${icon('file-earmark-person')} CV</a>`,
    ...profile.links.map((l) => `<a class="ilink" href="${esc(l.href)}">${icon(l.icon)} ${esc(l.label)}</a>`),
    `<a class="ilink" href="/now/">${icon('compass')} Now</a>`,
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
${profile.availability ? `<p class="note">${esc(profile.availability)}</p>` : ''}
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
<ul class="entries">
${experience
  .map(
    (e) => `<li>
<div class="when">${esc(monthOf(e.start))} to ${e.end ? esc(monthOf(e.end)) : 'now'}</div>
<div class="what"><p class="title"><strong>${esc(e.role)}</strong> <span class="org">${esc(e.org)}</span></p>
<p>${esc(e.summary)}</p></div>
</li>`,
  )
  .join('\n')}
</ul>
</section>

<section id="projects">
<h2>${icon('braces')} Projects</h2>
<p class="intro-note">This list is read from my public GitHub repositories each time the site is built.</p>
<ul class="projects">
${projects.map((p) => projectItem(p, icon)).join('\n')}
</ul>
${
  privateWork.length
    ? `<h3>${icon('lock')} Private research</h3>
<ul class="projects">
${privateWork
  .map(
    (w) => `<li class="project">
<div class="head"><span class="name">${esc(w.title)}</span><span class="chip">private code</span></div>
<p class="desc">${esc(w.summary)}</p>
<div class="facts"><span class="fact muted">${esc(w.year)}</span></div>
</li>`,
  )
  .join('\n')}
</ul>`
    : ''
}
</section>
</div>
</div>`

  return layout({
    site,
    profile,
    icon,
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio[0],
    path: '/',
    bodyClass: 'home',
    body,
    jsonld: personJsonLd(site, profile),
  })
}

export function projectPage({ site, profile, icon, project, readmeHtml }) {
  const body = `<p class="crumb"><a class="ilink" href="/">${icon('arrow-left')} ${esc(profile.name)}</a></p>
<h1>${esc(project.name)}${chips(project) ? ` <span class="chips">${chips(project)}</span>` : ''}</h1>
${project.description ? `<p class="lead">${esc(project.description)}</p>` : ''}
${facts(project, { license: true })}
<p class="buttons"><a class="btn" href="${esc(project.codeUrl)}">${icon('github')} Code</a>${
    project.liveUrl ? `<a class="btn" href="${esc(project.liveUrl)}">${icon('box-arrow-up-right')} Live demo</a>` : ''
  }</p>
${tags(project)}
<article class="readme">
${readmeHtml ?? '<p class="muted">This repository has no README.</p>'}
</article>`

  return layout({
    site,
    profile,
    icon,
    title: `${project.name} — ${profile.name}`,
    description: project.description || `${project.name}, a project by ${profile.name}.`,
    path: `/projects/${project.name}/`,
    body,
  })
}

export function nowPage({ site, profile, icon, html, updated }) {
  const body = `<p class="crumb"><a class="ilink" href="/">${icon('arrow-left')} ${esc(profile.name)}</a></p>
<h1>Now</h1>
${updated ? `<p class="meta">Updated ${esc(formatDate(updated))}</p>` : ''}
<div class="prose">
${html}
</div>`
  return layout({
    site,
    profile,
    icon,
    title: `Now — ${profile.name}`,
    description: `What ${profile.name} studies and builds at the moment.`,
    path: '/now/',
    body,
  })
}

// The CV page. The workflow prints it to cv.pdf with headless Chrome.
export function cvPage({ site, profile, icon, experience, privateWork, projects }) {
  const picks = projects.filter((p) => p.isOwn && !p.archived).slice(0, 6)
  const contact = [
    esc(profile.email),
    ...profile.links.map((l) => `${esc(l.label)}: ${esc(l.handle)}`),
    esc(site.url.replace(/^https:\/\//, '')),
  ]
  const body = `<h1>${esc(profile.name)}</h1>
<p class="role">${esc(profile.role)}</p>
<p class="contact">${contact.join(' · ')}</p>

<h2>Summary</h2>
${profile.bio.map((p) => `<p>${esc(p)}</p>`).join('\n')}

<h2>Education</h2>
<p><strong>${esc(profile.education.program)}</strong>, ${esc(profile.education.institution)}, ${esc(profile.education.location)}</p>

<h2>Experience</h2>
${experience
  .map(
    (e) => `<div class="entry">
<p><strong>${esc(e.role)}</strong>, ${esc(e.org)} <span class="when">${esc(monthOf(e.start))} to ${e.end ? esc(monthOf(e.end)) : 'present'}</span></p>
<p>${esc(e.summary)}</p>
</div>`,
  )
  .join('\n')}

<h2>Selected projects</h2>
${picks
  .map(
    (p) => `<div class="entry">
<p><strong>${esc(p.name)}</strong> <span class="when">${esc(p.codeUrl.replace(/^https:\/\//, ''))}</span></p>
${p.description ? `<p>${esc(p.description)}</p>` : ''}
</div>`,
  )
  .join('\n')}
${privateWork
  .map(
    (w) => `<div class="entry">
<p><strong>${esc(w.title)}</strong> <span class="when">${esc(w.year)} · private code</span></p>
<p>${esc(w.summary)}</p>
</div>`,
  )
  .join('\n')}`

  return layout({
    site,
    profile,
    icon,
    title: `CV — ${profile.name}`,
    description: `Curriculum vitae of ${profile.name}.`,
    path: '/cv/',
    body,
    bodyClass: 'cv',
    footer: false,
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
<p>This page does not exist. <a href="/">Go to the home page</a>.</p>`,
  })
}

export function sitemapXml({ site, projects }) {
  const urls = [
    { loc: `${site.url}/`, lastmod: site.builtAt },
    { loc: `${site.url}/now/`, lastmod: site.builtAt },
    ...projects.map((p) => ({ loc: `${site.url}/projects/${p.name}/`, lastmod: p.pushedAt })),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `<url><loc>${esc(u.loc)}</loc><lastmod>${new Date(u.lastmod).toISOString().slice(0, 10)}</lastmod></url>`)
  .join('\n')}
</urlset>
`
}

export function feedXml({ site, profile, projects }) {
  const entries = [...projects].sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt)).slice(0, 20)
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<title>${esc(profile.name)} — updates</title>
<id>${esc(site.url)}/</id>
<link href="${esc(site.url)}/feed.xml" rel="self"/>
<link href="${esc(site.url)}/"/>
<updated>${new Date(site.builtAt).toISOString()}</updated>
<author><name>${esc(profile.name)}</name></author>
${entries
  .map(
    (p) => `<entry>
<title>${esc(p.name)}</title>
<id>${esc(site.url)}/projects/${esc(p.name)}/#${esc(p.pushedAt)}</id>
<link href="${esc(site.url)}/projects/${esc(p.name)}/"/>
<updated>${new Date(p.pushedAt).toISOString()}</updated>
<summary>${esc(p.description || 'Updated.')}</summary>
</entry>`,
  )
  .join('\n')}
</feed>
`
}
