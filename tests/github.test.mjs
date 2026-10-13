import test from 'node:test'
import assert from 'node:assert/strict'
import { createClient } from '../scripts/lib/github.mjs'

const reply = (status, body = {}, headers = {}) => ({
  status,
  ok: status >= 200 && status < 300,
  headers: { get: (k) => headers[k.toLowerCase()] ?? null },
  json: async () => body,
  text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
})
const noSleep = async () => {}

test('retries a 500 answer and then succeeds', async () => {
  let calls = 0
  const client = createClient({
    token: 't',
    sleep: noSleep,
    fetchImpl: async () => (++calls < 3 ? reply(500) : reply(200, [{ name: 'a' }])),
  })
  assert.deepEqual(await client.listPublicRepos('me'), [{ name: 'a' }])
  assert.equal(calls, 3)
})

test('gives up after the retries and throws', async () => {
  let calls = 0
  const client = createClient({ retries: 2, sleep: noSleep, fetchImpl: async () => (calls++, reply(503)) })
  await assert.rejects(client.listPublicRepos('me'), /503/)
  assert.equal(calls, 3)
})

test('does not retry a 401', async () => {
  let calls = 0
  const bad = createClient({ sleep: noSleep, fetchImpl: async () => (calls++, reply(401)) })
  await assert.rejects(bad.listPublicRepos('me'), /401/)
  assert.equal(calls, 1)
})

test('waits and retries when the rate limit is used up', async () => {
  let calls = 0
  const client = createClient({
    sleep: noSleep,
    fetchImpl: async () => (++calls === 1 ? reply(403, {}, { 'x-ratelimit-remaining': '0' }) : reply(200, [])),
  })
  assert.deepEqual(await client.listPublicRepos('me'), [])
  assert.equal(calls, 2)
})

test('reads all pages of the repo list', async () => {
  const page1 = Array.from({ length: 100 }, (_, i) => ({ name: `r${i}` }))
  const urls = []
  const client = createClient({
    sleep: noSleep,
    fetchImpl: async (url) => (urls.push(url), reply(200, urls.length === 1 ? page1 : [{ name: 'last' }])),
  })
  assert.equal((await client.listPublicRepos('me')).length, 101)
  assert.match(urls[1], /page=2/)
})
