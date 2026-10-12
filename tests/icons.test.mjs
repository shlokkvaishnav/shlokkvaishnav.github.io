import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'
import { createIcons } from '../scripts/lib/icons.mjs'

const real = new URL('../assets/icons/', import.meta.url).pathname

test('an icon becomes an inline SVG that is hidden from screen readers', () => {
  const svg = createIcons(real)('github')
  assert.match(svg, /^<svg class="icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path /)
  assert.match(svg, /<\/svg>$/)
  assert.doesNotMatch(svg, /width=|height=|class="bi/)
})

test('a missing icon is a build error, not a gap in the page', () => {
  assert.throws(() => createIcons(real)('no-such-icon'), /Icon not found/)
})

test('an icon name cannot walk out of the icon folder', () => {
  for (const bad of ['../style', 'a/b', 'A', '']) assert.throws(() => createIcons(real)(bad), /Bad icon name/, bad)
})

test('a file that is not a plain SVG is refused', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'icons-'))
  writeFileSync(path.join(dir, 'x.svg'), '<html>not an svg</html>')
  assert.throws(() => createIcons(dir)('x'), /not a plain SVG/)
})

test('every icon file in the repo loads', async () => {
  const { readdirSync } = await import('node:fs')
  const icon = createIcons(real)
  for (const file of readdirSync(real)) assert.ok(icon(file.replace(/\.svg$/, '')).includes('<path'), file)
})

test('no icon file contains scripts or event handlers', async () => {
  const { readdirSync, readFileSync } = await import('node:fs')
  for (const file of readdirSync(real)) {
    assert.doesNotMatch(readFileSync(path.join(real, file), 'utf8'), /<script|\son[a-z]+=|javascript:|<foreignObject/i, file)
  }
})
