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
  const result = await build({ client: createFixtureClient(fixtures), outDir, now })
  assert.equal(result.projects, 5)
  for (const f of ['index.html', '404.html', 'now/index.html', 'cv/index.html', 'sitemap.xml', 'feed.xml', 'robots.txt', 'favicon.svg', 'assets/style.css', 'assets/site.js', '.nojekyll', 'projects/quorum/index.html', 'projects/kornia/index.html']) {
    assert.ok(existsSync(path.join(outDir, f)), f)
  }
  assert.ok(!existsSync(path.join(outDir, 'projects/secret-research')))
  assert.ok(!existsSync(`${outDir}.tmp`))
  const quorum = readFileSync(path.join(outDir, 'projects/quorum/index.html'), 'utf8')
  assert.match(quorum, /raw\.githubusercontent\.com\/shlokkvaishnav\/quorum\/main\/docs\/diagram\.png/)
  const home = readFileSync(path.join(outDir, 'index.html'), 'utf8')
  assert.match(home, /Add the policy gate/) // the "Recently" line
})

test('fails, and keeps the old site, when GitHub returns no repositories', async () => {
  const outDir = path.join(mkdtempSync(path.join(tmpdir(), 'site-')), 'dist')
  mkdirSync(outDir)
  writeFileSync(path.join(outDir, 'index.html'), 'OLD SITE')
  const empty = { listPublicRepos: async () => [], getReadmeHtml: async () => null, getLatestCommit: async () => null }
  await assert.rejects(build({ client: empty, outDir, now }), /no public repositories/)
  assert.equal(readFileSync(path.join(outDir, 'index.html'), 'utf8'), 'OLD SITE')
  assert.ok(!existsSync(`${outDir}.tmp`))
})

test('fails, and keeps the old site, when a request fails half way', async () => {
  const outDir = path.join(mkdtempSync(path.join(tmpdir(), 'site-')), 'dist')
  mkdirSync(outDir)
  writeFileSync(path.join(outDir, 'index.html'), 'OLD SITE')
  const base = createFixtureClient(fixtures)
  const broken = { ...base, getReadmeHtml: async () => { throw new Error('GitHub answered 503') } }
  await assert.rejects(build({ client: broken, outDir, now }), /503/)
  assert.equal(readFileSync(path.join(outDir, 'index.html'), 'utf8'), 'OLD SITE')
})
