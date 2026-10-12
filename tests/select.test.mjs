import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'
import { isSafeSlug, liveUrlOf, selectProjects } from '../scripts/lib/select.mjs'

const repos = JSON.parse(readFileSync(new URL('./fixtures/repos.json', import.meta.url), 'utf8'))
const now = new Date('2026-10-12T00:00:00Z')
const config = {
  owner: 'shlokkvaishnav',
  exclude: ['shlokkvaishnav', 'shlokkvaishnav.github.io'],
  pin: ['quorum'],
  ownForks: ['layoff-analysis'],
  hideForks: true,
  liveOverride: { 'layoff-analysis': 'https://layoff-analysis.vercel.app' },
}

test('keeps public repos and drops private, excluded and unsafe names', () => {
  const names = selectProjects(repos, config, now).map((p) => p.name)
  assert.deepEqual([...names].sort(), ['layoff-analysis', 'llm-inference-engine', 'old-project', 'quorum'])
})

test('pinned repos come first, the rest by newest push', () => {
  const names = selectProjects(repos, config, now).map((p) => p.name)
  assert.equal(names[0], 'quorum')
  assert.deepEqual(names.slice(1), ['llm-inference-engine', 'layoff-analysis', 'old-project'])
})

test('forks of other projects are hidden, but a fork listed as own work stays', () => {
  const names = selectProjects(repos, config, now).map((p) => p.name)
  assert.ok(!names.includes('kornia'))
  assert.ok(names.includes('layoff-analysis'))
  const own = selectProjects(repos, config, now).find((p) => p.name === 'layoff-analysis')
  assert.equal(own.isFork, false)
})

test('with hideForks off, a fork shows with a fork flag', () => {
  const all = selectProjects(repos, { ...config, hideForks: false }, now)
  const kornia = all.find((p) => p.name === 'kornia')
  assert.equal(kornia.isFork, true)
  assert.equal(kornia.isOwn, false)
})

test('a project has no status field', () => {
  for (const p of selectProjects(repos, config, now)) assert.equal('status' in p, false)
})

test('live address: override, then own Pages site, then homepage, else none', () => {
  const r = (extra) => ({ name: 'x', has_pages: false, homepage: '', ...extra })
  assert.equal(liveUrlOf(r({ name: 'layoff-analysis', has_pages: true }), config), 'https://layoff-analysis.vercel.app')
  assert.equal(liveUrlOf(r({ has_pages: true }), config), 'https://shlokkvaishnav.github.io/x/')
  assert.equal(liveUrlOf(r({ homepage: 'https://h.example' }), config), 'https://h.example')
  assert.equal(liveUrlOf(r(), config), null)
  assert.equal(liveUrlOf(r({ name: 'q', has_pages: true }), { ...config, liveOverride: { q: null } }), null)
})

test('license NOASSERTION is not shown', () => {
  const p = selectProjects([{ ...repos[0], license: { spdx_id: 'NOASSERTION' } }], config, now)[0]
  assert.equal(p.license, null)
})

test('slug check refuses path tricks', () => {
  for (const bad of ['', '.', '..', 'a/b', 'a b', 'x!', '../x']) assert.equal(isSafeSlug(bad), false, bad)
  for (const good of ['quorum', 'a.b-c_d', 'shlokkvaishnav.github.io']) assert.equal(isSafeSlug(good), true, good)
})
