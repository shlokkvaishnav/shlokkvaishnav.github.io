// Page templates. Each function takes data and returns a string. Nothing here reads files or the network.
// Every value that comes from outside (the GitHub API, the JSON files) goes through esc().

import { esc, formatDate, formatMonth } from './html.mjs'

const monthOf = (ym) => formatMonth(`${ym}-01T00:00:00Z`)

function layout({ site, profile, title, description, path, body, bodyClass = '', footer = true, jsonld = null }) {
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
<p>Built ${esc(built)} from GitHub. <a href="/feed.xml">Feed</a> · <a href="${esc(site.sourceUrl)}">Source</a></p>
</footer>`
      : ''
  }
<script src="/assets/site.js" defer></script>
</body>
</html>
`
}

function chips(project) {
  const out = []
  if (!project.archived) out.push(`<span class="chip chip-${project.status}">${project.status}</span>`)
  if (project.archived) out.push('<span class="chip">archived</span>')
  if (project.isFork) out.push('<span class="chip">fork</span>')
  return out.join('')
}

function tags(project) {
  if (!project.topics.length) return ''
  return `<p class="tags">${project.topics.map((t) => `<span class="tag" data-topic="${esc(t)}">${esc(t)}</span>`).join('')}</p>`
}

function projectItem(project) {
  const links = [`<a href="${esc(project.codeUrl)}">Code</a>`]
  if (project.liveUrl) links.push(`<a href="${esc(project.liveUrl)}">Live</a>`)
  const meta = [project.language, `Updated ${formatDate(project.pushedAt)}`].filter(Boolean).map(esc)
  const search = [project.name, project.description, project.language, ...project.topics].join(' ').toLowerCase()
  return `<li class="project" data-topics="${esc(project.topics.join(' '))}" data-search="${esc(search)}">
<div class="head"><a class="name" href="/projects/${esc(project.name)}/">${esc(project.name)}</a> <span class="chips">${chips(project)}</span></div>
${project.description ? `<p class="desc">${esc(project.description)}</p>` : ''}
<p class="meta">${meta.join(' · ')} · ${links.join(' · ')}</p>
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

export function indexPage({ site, profile, experience, news, privateWork, projects, recent }) {
  const links = [
    `<a href="mailto:${esc(profile.email)}">Email</a>`,
    '<a href="/cv.pdf">CV</a>',
    ...profile.links.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`),
    '<a href="/now/">Now</a>',
  ]

  const body = `<header>
<h1>${esc(profile.name)}</h1>
<p class="role">${esc(profile.role)}</p>
${profile.bio.map((p) => `<p>${esc(p)}</p>`).join('\n')}
<p class="links">${links.join(' · ')}</p>
${profile.availability ? `<p class="note">${esc(profile.availability)}</p>` : ''}
</header>

${
  news.length
    ? `<section id="news">
<h2>News</h2>
<ul class="plain">
${news.map((n) => `<li><span class="when">${esc(monthOf(n.date))}</span><div>${esc(n.text)}</div></li>`).join('\n')}
</ul>
</section>`
    : ''
}

<section id="experience">
<h2>Experience</h2>
<ul class="plain">
${experience
  .map(
    (e) => `<li><span class="when">${esc(monthOf(e.start))} – ${e.end ? esc(monthOf(e.end)) : 'now'}</span>
<div><strong>${esc(e.role)}</strong>, ${esc(e.org)}. ${esc(e.summary)}</div></li>`,
  )
  .join('\n')}
</ul>
</section>

<section id="projects">
<h2>Projects</h2>
<p class="intro">Read from my public GitHub repositories each time this site is built.</p>
<p class="filters" hidden><input type="search" id="q" placeholder="Filter projects (press /)" aria-label="Filter projects"></p>
<ul class="projects">
${projects.map(projectItem).join('\n')}
</ul>
${
  privateWork.length
    ? `<h3>Private research</h3>
<ul class="plain block">
${privateWork
  .map(
    (w) =>
      `<li><strong>${esc(w.title)}</strong> (${esc(w.year)}). ${esc(w.summary)} <span class="muted">The code is private.</span></li>`,
  )
  .join('\n')}
</ul>`
    : ''
}
</section>

${
  recent.length
    ? `<section id="recently">
<h2>Recently</h2>
<ul class="plain">
${recent
  .map(
    (c) =>
      `<li><span class="when">${esc(formatDate(c.date))}</span><div><a href="${esc(c.url)}">${esc(c.message.slice(0, 90))}</a> in <a href="/projects/${esc(c.repo)}/">${esc(c.repo)}</a></div></li>`,
  )
  .join('\n')}
</ul>
</section>`
    : ''
}`

  return layout({
    site,
    profile,
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio[0],
    path: '/',
    body,
    jsonld: personJsonLd(site, profile),
  })
}

export function projectPage({ site, profile, project, readmeHtml }) {
  const body = `<p class="crumb"><a href="/">← ${esc(profile.name)}</a></p>
<h1>${esc(project.name)} <span class="chips">${chips(project)}</span></h1>
${project.description ? `<p class="lead">${esc(project.description)}</p>` : ''}
<p class="meta">${[project.language, project.license, `Updated ${formatDate(project.pushedAt)}`].filter(Boolean).map(esc).join(' · ')}</p>
<p class="buttons"><a class="btn" href="${esc(project.codeUrl)}">Code</a>${
    project.liveUrl ? ` <a class="btn" href="${esc(project.liveUrl)}">Live demo</a>` : ''
  }</p>
${tags(project)}
<article class="readme">
${readmeHtml ?? '<p class="muted">This repository has no README.</p>'}
</article>`

  return layout({
    site,
    profile,
    title: `${project.name} — ${profile.name}`,
    description: project.description || `${project.name}, a project by ${profile.name}.`,
    path: `/projects/${project.name}/`,
    body,
  })
}

export function nowPage({ site, profile, html, updated }) {
  const body = `<p class="crumb"><a href="/">← ${esc(profile.name)}</a></p>
<h1>Now</h1>
${updated ? `<p class="meta">Updated ${esc(formatDate(updated))}</p>` : ''}
<div class="prose">
${html}
</div>`
  return layout({
    site,
    profile,
    title: `Now — ${profile.name}`,
    description: `What ${profile.name} studies and builds at the moment.`,
    path: '/now/',
    body,
  })
}

// The CV page. The workflow prints it to cv.pdf with headless Chrome.
export function cvPage({ site, profile, experience, privateWork, projects }) {
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
<p><strong>${esc(e.role)}</strong>, ${esc(e.org)} <span class="when">${esc(monthOf(e.start))} – ${e.end ? esc(monthOf(e.end)) : 'present'}</span></p>
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
    title: `CV — ${profile.name}`,
    description: `Curriculum vitae of ${profile.name}.`,
    path: '/cv/',
    body,
    bodyClass: 'cv',
    footer: false,
  })
}

export function notFoundPage({ site, profile }) {
  return layout({
    site,
    profile,
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
