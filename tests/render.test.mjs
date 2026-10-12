import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'
import { feedXml, indexPage, projectPage, sitemapXml } from '../scripts/lib/render.mjs'
import { createIcons } from '../scripts/lib/icons.mjs'
import { selectProjects } from '../scripts/lib/select.mjs'

const root = new URL('../', import.meta.url)
const json = (p) => JSON.parse(readFileSync(new URL(p, root), 'utf8'))
const repos = json('tests/fixtures/repos.json')
const profile = json('data/profile.json')
const config = { ...json('data/config.json'), pin: ['quorum'], liveOverride: {} }
const now = new Date('2026-10-12T00:00:00Z')
const site = { url: 'https://example.test', builtAt: now.toISOString(), sourceUrl: 'https://example.test/src' }
const icon = createIcons(new URL('assets/icons/', root).pathname)
const projects = selectProjects(repos, config, now, { Python: '#3572A5' })
const ctx = {
  site,
  profile,
  icon,
  experience: json('data/experience.json'),
  leadership: json('data/leadership.json'),
  privateWork: json('data/private-work.json'),
  projects,
}

// The HTML of one section of the home page.
const section = (html, id) => {
  const start = html.indexOf(`<section id="${id}">`)
  return html.slice(start, html.indexOf('</section>', start))
}

test('the home page lists every selected project and links to its page', () => {
  const html = indexPage(ctx)
  for (const p of projects) assert.ok(html.includes(`href="/projects/${p.name}/"`), p.name)
  assert.ok(!html.includes('secret-research'))
})

test('text from GitHub is escaped everywhere', () => {
  const html = indexPage(ctx)
  assert.ok(!html.includes('<script>alert("x")</script>'))
  assert.match(html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt; &amp; &quot;quotes&quot;/)
  const page = projectPage({ site, profile, icon, project: projects.find((p) => p.name === 'old-project'), readmeHtml: null })
  assert.ok(!page.includes('<script>alert("x")</script>'))
})

test('a project page without a README says so', () => {
  const html = projectPage({ site, profile, icon, project: projects[0], readmeHtml: null })
  assert.match(html, /no README/)
})

test('the live link appears only when there is one', () => {
  const quorum = projects.find((p) => p.name === 'quorum')
  assert.match(projectPage({ site, profile, icon, project: quorum, readmeHtml: '' }), /Live demo/)
  const none = projects.find((p) => p.name === 'llm-inference-engine')
  assert.doesNotMatch(projectPage({ site, profile, icon, project: none, readmeHtml: '' }), /Live demo/)
})

test('the sitemap lists the home page and every project page', () => {
  const xml = sitemapXml({ site, projects })
  assert.match(xml, /<loc>https:\/\/example\.test\/<\/loc>/)
  assert.doesNotMatch(xml, /\/now\//)
  for (const p of projects) assert.ok(xml.includes(`/projects/${p.name}/</loc>`), p.name)
})

test('the feed is valid-looking Atom with one entry per project', () => {
  const xml = feedXml({ site, profile, projects })
  assert.match(xml, /^<\?xml/)
  assert.equal((xml.match(/<entry>/g) ?? []).length, projects.length)
})

test('the site never mentions the old custom domain', () => {
  const all = [indexPage(ctx), sitemapXml({ site, projects })].join('\n')
  assert.doesNotMatch(all, /shlokkvaishnav\.dev/)
})

test('the home page has no News, Recently or search bar', () => {
  const html = indexPage(ctx)
  assert.doesNotMatch(html, /News|Recently|type="search"|<script src=/)
})

test('project rows show the language colour, the status and icon links', () => {
  const html = indexPage(ctx)
  assert.match(html, /<i class="dot" style="--dot:#3572A5"><\/i>Python/)
  assert.doesNotMatch(html, /status-|>active<|>stable<|>dormant</)
  assert.match(html, /<svg class="icon"[^>]*>[\s\S]*?<\/svg> Code/)
})

test('the portrait has an alt text and a size, so the page does not jump', () => {
  assert.match(indexPage(ctx), /<img class="avatar" src="\/assets\/avatar\.jpg" width="160" height="160" alt="Portrait of Shlok Vaishnav">/)
})

test('the home page has a side panel with the links, and the content next to it', () => {
  const html = indexPage(ctx)
  assert.match(html, /<body class="home">/)
  assert.match(html, /<aside class="profile">[\s\S]*<nav class="links"[\s\S]*<\/aside>\s*<div class="content">/)
  // The experience and projects are in the content column, not in the side panel.
  assert.ok(html.indexOf('<div class="content">') < html.indexOf('id="experience"'))
  assert.ok(html.indexOf('</aside>') < html.indexOf('id="projects"'))
})

test('the home page and the CV show the current roles, not the old ones', () => {
  const all = indexPage(ctx)
  assert.match(all, /Computer Vision Researcher/)
  assert.match(all, /Apr 2026 to Sep 2026/) // the Bull Agritech internship has ended
  assert.doesNotMatch(all, /NanoDB|Climate equation discovery|castor/i)
})

test('no public page contains the phone number', () => {
  const all = indexPage(ctx)
  assert.doesNotMatch(all, /7984739443|\+91/)
})

test('the home page has no Now link', () => {
  assert.doesNotMatch(indexPage(ctx), /href="\/now\/"|>Now</)
})

test('the tab title of the home page is just the name', () => {
  assert.match(indexPage(ctx), /<title>Shlok Vaishnav<\/title>/)
  assert.match(indexPage(ctx), /<meta property="og:title" content="Shlok Vaishnav">/)
})

test('the CV link opens the resume PDF', () => {
  assert.match(indexPage(ctx), /<a class="ilink" href="\/Shlok_Vaishnav_Resume\.pdf">/)
})

test('Experience has only ISRO and Bull Agritech', () => {
  const html = section(indexPage(ctx), 'experience')
  assert.match(html, /<h2>[\s\S]*Experience<\/h2>/)
  assert.match(html, /Space Applications Centre, ISRO/)
  assert.match(html, /Bull Agritech/)
  assert.doesNotMatch(html, /Data Science Club|IEEE/)
  assert.equal((html.match(/class="org"/g) ?? []).length, 2)
})

test('Leadership is a separate section with the Data Science Club and IEEE CS', () => {
  const html = section(indexPage(ctx), 'leadership')
  assert.match(html, /<h2>[\s\S]*Leadership<\/h2>/)
  assert.match(html, /Data Science Club, Nirma University/)
  assert.match(html, /IEEE Computer Society, Nirma University/)
  assert.doesNotMatch(html, /Bull Agritech|ISRO/)
  assert.equal((html.match(/class="org"/g) ?? []).length, 2)
})

test('the Data Science Club shows both roles under one organization, newest first', () => {
  const html = section(indexPage(ctx), 'leadership')
  const club = html.slice(html.indexOf('Data Science Club'), html.indexOf('IEEE Computer Society'))
  assert.equal((club.match(/<li class="position/g) ?? []).length, 2)
  assert.ok(club.indexOf('President') < club.indexOf('Technical Team Member'))
  assert.match(club, /<ol class="positions linked">/)
  assert.match(club, /<li class="position current">/) // the role held now
})

test('IEEE CS is its own entry with a single role', () => {
  const html = section(indexPage(ctx), 'leadership')
  const ieee = html.slice(html.indexOf('IEEE Computer Society'))
  assert.match(ieee, /Founding Board Member/)
  assert.equal((ieee.match(/<li class="position/g) ?? []).length, 1)
})

test('periods and durations come from the dates (build date is 12 Oct 2026)', () => {
  const html = indexPage(ctx)
  assert.match(html, /Feb 2026 to now<\/span><span>9 mos/) // ISRO
  assert.match(html, /Apr 2026 to Sep 2026<\/span><span>6 mos/) // Bull Agritech
  assert.match(html, /Sep 2026 to now<\/span><span>2 mos/) // President
  assert.match(html, /Sep 2025 to Aug 2026<\/span><span>1 yr/) // Technical Team Member and IEEE CS
  assert.match(html, /<span class="org-total">1 yr 2 mos<\/span>/) // the club in total
})

test('projects have no topic tags', () => {
  const html = indexPage(ctx) + projectPage({ site, profile, icon, project: projects[0], readmeHtml: '' })
  assert.doesNotMatch(html, /class="tags?"|data-topic|ai-agents|paged-attention/)
})

test('nobody is marked "Promoted"', () => {
  assert.doesNotMatch(indexPage(ctx), /Promoted|chip-accent/)
})

test('Experience and Leadership use the same timeline look for every organization', () => {
  const html = indexPage(ctx)
  assert.equal((html.match(/<ol class="positions linked">/g) ?? []).length, 4) // 2 + 2 organizations
})

test('a future position at the same organization joins the same timeline', () => {
  const experience = [
    {
      org: 'Example Lab',
      roles: [
        { title: 'Senior Researcher', start: '2026-08', end: null, summary: 'Newer role.' },
        { title: 'Researcher', start: '2026-01', end: '2026-07', summary: 'Older role.' },
      ],
    },
  ]
  const html = section(indexPage({ ...ctx, experience }), 'experience')
  assert.equal((html.match(/class="org"/g) ?? []).length, 1) // one organization
  assert.equal((html.match(/<li class="position/g) ?? []).length, 2) // two roles under it
  assert.ok(html.indexOf('Senior Researcher') < html.indexOf('>Researcher<'))
  assert.match(html, /<span class="org-total">10 mos<\/span>/) // Jan to Oct 2026
  assert.match(html, /<li class="position current">/)
})
