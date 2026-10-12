import test from 'node:test'
import assert from 'node:assert/strict'
import { renderMarkdown } from '../scripts/lib/markdown.mjs'

test('renders headings, lists, links and emphasis', () => {
  const html = renderMarkdown('## Working on\n\n- one **bold**\n- two [a link](https://example.com)\n\nA *plain* `code` line.')
  assert.match(html, /<h3>Working on<\/h3>/)
  assert.match(html, /<ul><li>one <strong>bold<\/strong><\/li><li>two <a href="https:\/\/example\.com">a link<\/a><\/li><\/ul>/)
  assert.match(html, /<p>A <em>plain<\/em> <code>code<\/code> line\.<\/p>/)
})

test('HTML in the text is escaped', () => {
  const html = renderMarkdown('<script>alert(1)</script> and <b>bold</b>')
  assert.doesNotMatch(html, /<script|<b>/)
  assert.match(html, /&lt;script&gt;/)
})

test('unsafe link addresses lose the link', () => {
  const html = renderMarkdown('[x](javascript:alert(1)) and [y](/projects/a/)')
  assert.doesNotMatch(html, /javascript:/)
  assert.match(html, /<a href="\/projects\/a\/">y<\/a>/)
})
