// Checks the built site. Every internal link and file reference must point to a file in the output folder.
//   node scripts/check-links.mjs [dist] [--allow=/cv.pdf] [--external]
// Add --external to also check that external addresses answer (needs the network).

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const dist = path.resolve(args.find((a) => !a.startsWith('--')) ?? 'dist')
const checkExternal = args.includes('--external')
// Files that a later build step creates (cv.pdf), for a check before that step.
const allowed = new Set(args.filter((a) => a.startsWith('--allow=')).map((a) => a.slice(8)))

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) yield* walk(full)
    else yield full
  }
}

const problems = []
const warnings = []
const external = new Set()

for (const file of walk(dist)) {
  if (!file.endsWith('.html')) continue
  const html = readFileSync(file, 'utf8')
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))
  for (const [, attr, raw] of html.matchAll(/\b(href|src)="([^"]*)"/g)) {
    const value = raw.replace(/&amp;/g, '&')
    if (!value || /^(mailto:|data:|javascript:)/i.test(value)) continue
    if (/^https?:\/\//i.test(value)) {
      external.add(value)
      continue
    }
    if (value.startsWith('#')) {
      if (value.length > 1 && !ids.has(value.slice(1))) {
        // A README can link to anchors that do not exist, also on GitHub. That is the repo's own text.
        const message = `${path.relative(dist, file)}: missing anchor ${value}`
        ;(path.relative(dist, file).startsWith('projects') ? warnings : problems).push(message)
      }
      continue
    }
    const [pathname] = value.split(/[?#]/)
    if (allowed.has(pathname)) continue
    let target = path.join(dist, pathname)
    if (pathname.endsWith('/')) target = path.join(target, 'index.html')
    if (!existsSync(target)) problems.push(`${path.relative(dist, file)}: ${attr} ${value} does not exist`)
  }
}

if (checkExternal) {
  const targets = [...external].filter((u) => !/linkedin\.com|twitter\.com|x\.com/.test(u)) // these sites refuse bots
  const results = await Promise.all(
    targets.map(async (url) => {
      try {
        const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) })
        return res.status === 405 || res.status === 403 ? null : res.ok ? null : `${url} answered ${res.status}`
      } catch (error) {
        return `${url} failed: ${error.message}`
      }
    }),
  )
  problems.push(...results.filter(Boolean).map((r) => `external: ${r}`))
}

if (warnings.length) console.warn(`Warnings (links inside README text):\n${warnings.join('\n')}\n`)
if (problems.length) {
  console.error(problems.join('\n'))
  console.error(`\n${problems.length} problem(s) found.`)
  process.exit(1)
}
console.log(`Links ok. ${external.size} external addresses${checkExternal ? ' checked' : ' not checked (use --external)'}.`)
