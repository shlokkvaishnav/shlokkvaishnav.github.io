import { createHash } from 'node:crypto'
import { cpSync, existsSync, mkdtempSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
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

test('the social preview image is built: a PNG of 1200 x 630 pixels, under 500 KB', async () => {
  const outDir = tempOut()
  await build({ outDir, now })
  const png = readFileSync(path.join(outDir, 'assets/social.png'))
  assert.deepEqual([...png.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]) // the PNG signature
  assert.equal(png.readUInt32BE(16), 1200) // the width, in the IHDR chunk
  assert.equal(png.readUInt32BE(20), 630) // the height
  assert.ok(png.length < 500 * 1024, `${png.length} bytes`)
  assert.match(readFileSync(path.join(outDir, 'index.html'), 'utf8'), /<meta property="og:image" content="https:\/\/shlokkvaishnav\.github\.io\/assets\/social\.png\?v=[0-9a-f]{10}">/)
})

const shortHash = (file) => createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 10)

test('the stylesheet and the social image have a version that is a hash of the built file', async () => {
  const outDir = tempOut()
  await build({ outDir, now })
  const home = readFileSync(path.join(outDir, 'index.html'), 'utf8')
  assert.ok(home.includes(`<link rel="stylesheet" href="/assets/style.css?v=${shortHash(path.join(outDir, 'assets/style.css'))}">`))
  assert.ok(home.includes(`/assets/social.png?v=${shortHash(path.join(outDir, 'assets/social.png'))}"`))
  // The version follows the content: a changed stylesheet gets a new address.
  const root = mkdtempSync(path.join(tmpdir(), 'root-'))
  cpSync(new URL('../data', import.meta.url).pathname, path.join(root, 'data'), { recursive: true })
  cpSync(new URL('../assets', import.meta.url).pathname, path.join(root, 'assets'), { recursive: true })
  const css = path.join(root, 'assets/style.css')
  writeFileSync(css, `${readFileSync(css, 'utf8')}\n/* changed */\n`)
  const out2 = tempOut()
  await build({ root, outDir: out2, now })
  assert.notEqual(shortHash(css), shortHash(path.join(outDir, 'assets/style.css')))
  assert.ok(readFileSync(path.join(out2, 'index.html'), 'utf8').includes(`style.css?v=${shortHash(css)}"`))
})

test('the touch icon is a PNG of 180 x 180 pixels, and the page links to it', async () => {
  const outDir = tempOut()
  await build({ outDir, now })
  const png = readFileSync(path.join(outDir, 'assets/apple-touch-icon.png'))
  assert.deepEqual([...png.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  assert.equal(png.readUInt32BE(16), 180)
  assert.equal(png.readUInt32BE(20), 180)
  assert.match(readFileSync(path.join(outDir, 'index.html'), 'utf8'), /<link rel="apple-touch-icon" href="\/assets\/apple-touch-icon\.png">/)
})

