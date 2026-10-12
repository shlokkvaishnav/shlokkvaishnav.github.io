import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'
import { cvPage, feedXml, indexPage, projectPage, sitemapXml } from '../scripts/lib/render.mjs'
import { selectProjects } from '../scripts/lib/select.mjs'

const root = new URL('../', import.meta.url)
const json = (p) => JSON.parse(readFileSync(new URL(p, root), 'utf8'))
const repos = json('tests/fixtures/repos.json')
const profile = json('data/profile.json')
const config = { ...json('data/config.json'), pin: ['quorum'], liveOverride: {} }
const now = new Date('2026-10-12T00:00:00Z')
const site = { url: 'https://example.test', builtAt: now.toISOString(), sourceUrl: 'https://example.test/src' }
const projects = selectProjects(repos, config, now)
const ctx = { site, profile, experience: json('data/experience.json'), news: json('data/news.json'), privateWork: json('data/private-work.json'), projects, recent: [] }

test('the home page lists every selected project and links to its page', () => {
  const html = indexPage(ctx)
  for (const p of projects) assert.ok(html.includes(`href="/projects/${p.name}/"`), p.name)
  assert.ok(!html.includes('secret-research'))
})

test('text from GitHub is escaped everywhere', () => {
  const html = indexPage(ctx)
  assert.ok(!html.includes('<script>alert("x")</script>'))
  assert.match(html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt; &amp; &quot;quotes&quot;/)
  const page = projectPage({ site, profile, project: projects.find((p) => p.name === 'old-project'), readmeHtml: null })
  assert.ok(!page.includes('<script>alert("x")</script>'))
})

test('a project page without a README says so', () => {
  const html = projectPage({ site, profile, project: projects[0], readmeHtml: null })
  assert.match(html, /no README/)
})

test('the live link appears only when there is one', () => {
  const quorum = projects.find((p) => p.name === 'quorum')
  assert.match(projectPage({ site, profile, project: quorum, readmeHtml: '' }), /Live demo/)
  const none = projects.find((p) => p.name === 'llm-inference-engine')
  assert.doesNotMatch(projectPage({ site, profile, project: none, readmeHtml: '' }), /Live demo/)
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
