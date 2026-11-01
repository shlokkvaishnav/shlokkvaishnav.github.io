import { existsSync, mkdtempSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'
import { build } from '../scripts/build.mjs'

const now = new Date('2026-10-12T00:00:00Z')
const tempOut = () => path.join(mkdtempSync(path.join(tmpdir(), 'site-')), 'dist')

test('builds the whole site from the files in data/ and assets/', async () => {
  const outDir = tempOut()
  await build({ outDir, now })
  for (const f of ['index.html', '404.html', 'Shlok_Vaishnav_Resume.pdf', 'sitemap.xml', 'robots.txt', 'favicon.svg', 'assets/style.css', 'assets/avatar.jpg', 'assets/fonts/literata.woff2', '.nojekyll']) {
    assert.ok(existsSync(path.join(outDir, f)), f)
  }
  assert.ok(!existsSync(path.join(outDir, 'feed.xml')), 'there is no feed')
  assert.ok(!existsSync(path.join(outDir, 'projects')), 'there are no project pages')
  assert.ok(!existsSync(path.join(outDir, 'now')), 'there is no /now/ page')
  assert.ok(!existsSync(`${outDir}.tmp`))
  const home = readFileSync(path.join(outDir, 'index.html'), 'utf8')
  assert.doesNotMatch(home, /Recently|News|<script src=|id="projects"|feed\.xml/)
  assert.match(home, /<section id="research">/)
  assert.match(home, /<svg class="icon"/) // icons are inline
  assert.ok(!existsSync(path.join(outDir, 'assets/icons')), 'icon files are inlined, not copied')
})

test('does not use the network', async () => {
  const realFetch = globalThis.fetch
  globalThis.fetch = () => { throw new Error('the build must not use the network') }
  try {
    await build({ outDir: tempOut(), now })
  } finally {
    globalThis.fetch = realFetch
  }
})

test('fails, and keeps the old site, when a data file is broken', async () => {
  const outDir = tempOut()
  mkdirSync(outDir)
  writeFileSync(path.join(outDir, 'index.html'), 'OLD SITE')
  const root = mkdtempSync(path.join(tmpdir(), 'root-'))
  mkdirSync(path.join(root, 'data'))
  writeFileSync(path.join(root, 'data', 'config.json'), '{ not json')
  await assert.rejects(build({ root, outDir, now }), /JSON/)
  assert.equal(readFileSync(path.join(outDir, 'index.html'), 'utf8'), 'OLD SITE')
  assert.ok(!existsSync(`${outDir}.tmp`))
})
