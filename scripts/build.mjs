// Builds the whole site into dist/.
//
//   node scripts/build.mjs              write dist/
//   node scripts/build.mjs --out <dir>  write somewhere other than dist/
//
// The build reads only the files in data/ and assets/. It does not use the network.
// It writes to a temporary folder first. It replaces the output folder only after every step worked.
// A failed build therefore never leaves an empty or half-written site.

import { cpSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { createIcons } from './lib/icons.mjs'
import { indexPage, notFoundPage, sitemapXml } from './lib/render.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function write(base, file, content) {
  const target = path.join(base, file)
  mkdirSync(path.dirname(target), { recursive: true })
  writeFileSync(target, content)
}

export async function build({ root = ROOT, outDir = path.join(root, 'dist'), now = new Date() } = {}) {
  const readJson = (name) => JSON.parse(readFileSync(path.join(root, 'data', name), 'utf8'))
  const config = readJson('config.json')
  const profile = readJson('profile.json')
  const experience = readJson('experience.json')
  const leadership = readJson('leadership.json')
  const privateWork = readJson('private-work.json')
  const icon = createIcons(path.join(root, 'assets', 'icons'))

  const site = {
    url: config.siteUrl,
    builtAt: now.toISOString(),
    sourceUrl: `https://github.com/${config.owner}/${config.owner}.github.io`,
  }
  const shared = { site, profile, icon }
  const tmp = `${outDir}.tmp`
  rmSync(tmp, { recursive: true, force: true })
  mkdirSync(tmp, { recursive: true })

  try {
    write(tmp, 'index.html', indexPage({ ...shared, experience, leadership, privateWork }))
    // The CV link opens my own resume. To update it, replace data/Shlok_Vaishnav_Resume.pdf.
    cpSync(path.join(root, 'data', 'Shlok_Vaishnav_Resume.pdf'), path.join(tmp, 'Shlok_Vaishnav_Resume.pdf'))
    write(tmp, '404.html', notFoundPage(shared))
    write(tmp, 'sitemap.xml', sitemapXml({ site }))
    write(tmp, 'robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`)
    write(tmp, '.nojekyll', '')
    // The icons are put into the pages, so the icon files are not copied.
    cpSync(path.join(root, 'assets'), path.join(tmp, 'assets'), {
      recursive: true,
      filter: (source) => path.relative(path.join(root, 'assets'), source) !== 'icons',
    })
    cpSync(path.join(root, 'assets', 'favicon.svg'), path.join(tmp, 'favicon.svg'))
  } catch (error) {
    rmSync(tmp, { recursive: true, force: true })
    throw error
  }

  rmSync(outDir, { recursive: true, force: true })
  renameSync(tmp, outDir)
  return { outDir }
}

// Command line
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2)
  const i = args.indexOf('--out')
  const out = i === -1 ? null : args[i + 1]
  try {
    const result = await build(out ? { outDir: path.resolve(out) } : {})
    console.log(`Built the site into ${result.outDir}`)
  } catch (error) {
    console.error(`Build failed: ${error.message}`)
    process.exit(1)
  }
}
