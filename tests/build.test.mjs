import { existsSync, mkdtempSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'
import { build } from '../scripts/build.mjs'
import { createFixtureClient } from '../scripts/lib/fixtures.mjs'

const fixtures = path.resolve(new URL('./fixtures', import.meta.url).pathname)
const now = new Date('2026-10-12T00:00:00Z')

test('builds the whole site from saved answers', async () => {
  const outDir = path.join(mkdtempSync(path.join(tmpdir(), 'site-')), 'dist')
  const result = await build({ client: createFixtureClient(fixtures), outDir, now, overrides: { showProjects: true } })
  assert.equal(result.projects, 4) // kornia is a fork, so it is hidden
  for (const f of ['index.html', '404.html', 'Shlok_Vaishnav_Resume.pdf', 'sitemap.xml', 'feed.xml', 'robots.txt', 'favicon.svg', 'assets/style.css', 'assets/avatar.jpg', 'assets/fonts/literata.woff2', '.nojekyll']) {
    assert.ok(existsSync(path.join(outDir, f)), f)
  }
  assert.ok(!existsSync(path.join(outDir, 'projects')), 'there are no README pages')
  assert.ok(!existsSync(path.join(outDir, 'now')), 'there is no /now/ page')
  assert.ok(!existsSync(`${outDir}.tmp`))
  const home = readFileSync(path.join(outDir, 'index.html'), 'utf8')
  assert.doesNotMatch(home, /Recently|News|<script src=/)
  assert.match(home, /<svg class="icon"/) // icons are inline
  assert.ok(!existsSync(path.join(outDir, 'assets/icons')), 'icon files are inlined, not copied')
})

test('fails, and keeps the old site, when GitHub returns no repositories', async () => {
  const outDir = path.join(mkdtempSync(path.join(tmpdir(), 'site-')), 'dist')
  mkdirSync(outDir)
  writeFileSync(path.join(outDir, 'index.html'), 'OLD SITE')
  const empty = { listPublicRepos: async () => [] }
  await assert.rejects(build({ client: empty, outDir, now, overrides: { showProjects: true } }), /no public repositories/)
  assert.equal(readFileSync(path.join(outDir, 'index.html'), 'utf8'), 'OLD SITE')
  assert.ok(!existsSync(`${outDir}.tmp`))
})

test('fails, and keeps the old site, when a request fails half way', async () => {
  const outDir = path.join(mkdtempSync(path.join(tmpdir(), 'site-')), 'dist')
  mkdirSync(outDir)
  writeFileSync(path.join(outDir, 'index.html'), 'OLD SITE')
  const base = createFixtureClient(fixtures)
  const broken = { ...base, listPublicRepos: async () => { throw new Error('GitHub answered 503') } }
  await assert.rejects(build({ client: broken, outDir, now, overrides: { showProjects: true } }), /503/)
  assert.equal(readFileSync(path.join(outDir, 'index.html'), 'utf8'), 'OLD SITE')
})

test('builds a research-only site without reading GitHub when showProjects is false', async () => {
  const outDir = path.join(mkdtempSync(path.join(tmpdir(), 'site-')), 'dist')
  const neverCalled = { listPublicRepos: async () => { throw new Error('GitHub must not be read') } }
  const result = await build({ client: neverCalled, outDir, now, overrides: { showProjects: false } })
  assert.equal(result.projects, 0)
  assert.ok(existsSync(path.join(outDir, 'index.html')))
  assert.ok(!existsSync(path.join(outDir, 'feed.xml')), 'the project-update feed is not built')
  const home = readFileSync(path.join(outDir, 'index.html'), 'utf8')
  assert.doesNotMatch(home, /id="projects"|feed\.xml/)
  assert.match(home, /<section id="research">/)
})

test('the committed config shows research only', () => {
  const config = JSON.parse(readFileSync(path.resolve(fixtures, '../../data/config.json'), 'utf8'))
  assert.equal(config.showProjects, false)
})
