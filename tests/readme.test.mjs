import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'
import { rewriteReadmeHtml } from '../scripts/lib/readme.mjs'

const html = readFileSync(new URL('./fixtures/readme-quorum.html', import.meta.url), 'utf8')
const out = rewriteReadmeHtml(html, { owner: 'shlokkvaishnav', repo: 'quorum', branch: 'main' })

test('relative images point to raw.githubusercontent.com', () => {
  assert.match(out, /src="https:\/\/raw\.githubusercontent\.com\/shlokkvaishnav\/quorum\/main\/docs\/diagram\.png"/)
})

test('relative links point to the file on github.com', () => {
  assert.match(out, /href="https:\/\/github\.com\/shlokkvaishnav\/quorum\/blob\/main\/docs\/guide\.md"/)
  assert.match(out, /href="https:\/\/github\.com\/shlokkvaishnav\/quorum\/blob\/main\/docs\/api\.md"/)
})

test('links that start with a slash are read from the repo root, not the site root', () => {
  assert.doesNotMatch(out, /href="https:\/\/github\.com\/docs\//)
})

test('full addresses stay as they are', () => {
  assert.match(out, /href="https:\/\/example\.com\/x"/)
  assert.match(out, /src="https:\/\/camo\.githubusercontent\.com\/abc"/)
})

test('in-page links use the user-content prefix that the heading ids have', () => {
  assert.match(out, /id="user-content-usage"/)
  assert.match(out, /<a href="#user-content-usage">usage<\/a>/)
  assert.equal(out.includes('#user-content-user-content-'), false)
})

test('scripts, event handlers and javascript: links are removed', () => {
  assert.doesNotMatch(out, /<script/i)
  assert.doesNotMatch(out, /onclick/i)
  assert.doesNotMatch(out, /javascript:/i)
})

test('images get lazy loading once', () => {
  assert.match(out, /<img loading="lazy" src="https:\/\/raw\.githubusercontent\.com/)
  assert.equal((out.match(/loading="lazy"/g) ?? []).length, 2)
})

test('links to raw-HTML headings keep their plain ids', () => {
  const page = '<h2 id="features">Features</h2><p><a href="#features">go</a> <a href="#">top</a> <a href="#missing">x</a></p>'
  const result = rewriteReadmeHtml(page, { owner: 'o', repo: 'r', branch: 'main' })
  assert.match(result, /href="#features"/)
  assert.match(result, /href="#"/)
  assert.match(result, /href="#missing"/)
  assert.doesNotMatch(result, /user-content-/)
})
