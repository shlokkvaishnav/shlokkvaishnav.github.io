import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'
import { cvPage, feedXml, indexPage, projectPage, sitemapXml } from '../scripts/lib/render.mjs'
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
const ctx = { site, profile, icon, experience: json('data/experience.json'), privateWork: json('data/private-work.json'), projects }

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

test('the sitemap lists the home page, /now/ and every project page', () => {
  const xml = sitemapXml({ site, projects })
  assert.match(xml, /<loc>https:\/\/example\.test\/<\/loc>/)
  assert.match(xml, /<loc>https:\/\/example\.test\/now\/<\/loc>/)
  for (const p of projects) assert.ok(xml.includes(`/projects/${p.name}/</loc>`), p.name)
})

test('the feed is valid-looking Atom with one entry per project', () => {
  const xml = feedXml({ site, profile, projects })
  assert.match(xml, /^<\?xml/)
  assert.equal((xml.match(/<entry>/g) ?? []).length, projects.length)
})

test('the CV lists contact details, education and experience', () => {
  const html = cvPage(ctx)
  assert.match(html, /shlok9640@gmail\.com/)
  assert.match(html, /Nirma University/)
  assert.match(html, /Bull Agritech/)
})

test('the site never mentions the old custom domain', () => {
  const all = [indexPage(ctx), cvPage(ctx), sitemapXml({ site, projects })].join('\n')
  assert.doesNotMatch(all, /shlokkvaishnav\.dev/)
})

test('the home page has no News, Recently or search bar', () => {
  const html = indexPage(ctx)
  assert.doesNotMatch(html, /News|Recently|type="search"|<script src=/)
})

test('project rows show the language colour, the status and icon links', () => {
  const html = indexPage(ctx)
  assert.match(html, /<i class="dot" style="--dot:#3572A5"><\/i>Python/)
  assert.match(html, /class="fact status-active"/)
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
