import test from 'node:test'
import assert from 'node:assert/strict'
import { formatDuration, monthsBetween } from '../scripts/lib/html.mjs'

const now = '2026-10-12T00:00:00Z'

test('months are counted the way LinkedIn counts them', () => {
  assert.equal(monthsBetween('2026-02', null, now), 9) // Feb to Oct 2026
  assert.equal(monthsBetween('2026-04', '2026-09', now), 6)
  assert.equal(monthsBetween('2025-09', '2026-08', now), 12)
  assert.equal(monthsBetween('2026-09', null, now), 2)
  assert.equal(monthsBetween('2025-09', null, now), 14)
  assert.equal(monthsBetween('2026-10', '2026-10', now), 1)
})

test('durations read like "1 yr 2 mos"', () => {
  assert.equal(formatDuration(1), '1 mo')
  assert.equal(formatDuration(6), '6 mos')
  assert.equal(formatDuration(12), '1 yr')
  assert.equal(formatDuration(13), '1 yr 1 mo')
  assert.equal(formatDuration(14), '1 yr 2 mos')
  assert.equal(formatDuration(24), '2 yrs')
})
