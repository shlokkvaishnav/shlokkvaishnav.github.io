// Builds the whole site into dist/.
//
//   node scripts/build.mjs                         read the live GitHub API (set GITHUB_TOKEN to avoid rate limits)
//   node scripts/build.mjs --offline <dir>         read saved answers from <dir> (used by the tests and CI)
//   node scripts/build.mjs --out <dir>             write somewhere other than dist/
//
// The build writes to a temporary folder first. It replaces the output folder only after every step worked.
// A failed build therefore never leaves an empty or half-written site.

import { cpSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { createClient } from './lib/github.mjs'
import { createFixtureClient } from './lib/fixtures.mjs'
import { createIcons } from './lib/icons.mjs'
import { rewriteReadmeHtml } from './lib/readme.mjs'
import { feedXml, indexPage, notFoundPage, projectPage, sitemapXml } from './lib/render.mjs'
import { selectProjects } from './lib/select.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Runs `fn` on every item, with at most `limit` calls at the same time.
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length)
  let next = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i])
    }
  })
  await Promise.all(workers)
  return results
}

function write(base, file, content) {
  const target = path.join(base, file)
  mkdirSync(path.dirname(target), { recursive: true })
  writeFileSync(target, content)
}

export async function build({ client, root = ROOT, outDir = path.join(root, 'dist'), now = new Date() }) {
  const readJson = (name) => JSON.parse(readFileSync(path.join(root, 'data', name), 'utf8'))
  const config = readJson('config.json')
  const profile = readJson('profile.json')
  const experience = readJson('experience.json')
  const leadership = readJson('leadership.json')
  const privateWork = readJson('private-work.json')
  const icon = createIcons(path.join(root, 'assets', 'icons'))

  const repos = await client.listPublicRepos(config.owner)
  const projects = selectProjects(repos, config)
  if (projects.length === 0) {
    throw new Error('GitHub returned no public repositories. Not building an empty site.')
  }

  const readmes = await mapLimit(projects, 4, (p) => client.getReadmeHtml(config.owner, p.name))
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
    write(tmp, 'index.html', indexPage({ ...shared, experience, leadership, privateWork, projects }))
    projects.forEach((project, i) => {
      const readmeHtml = readmes[i]
        ? rewriteReadmeHtml(readmes[i], { owner: config.owner, repo: project.name, branch: project.defaultBranch })
        : null
      write(tmp, `projects/${project.name}/index.html`, projectPage({ ...shared, project, readmeHtml }))
    })
    // The CV link opens my own resume. To update it, replace data/Shlok_Vaishnav_Resume.pdf.
    cpSync(path.join(root, 'data', 'Shlok_Vaishnav_Resume.pdf'), path.join(tmp, 'Shlok_Vaishnav_Resume.pdf'))
    write(tmp, '404.html', notFoundPage(shared))
    write(tmp, 'sitemap.xml', sitemapXml({ site, projects }))
    write(tmp, 'feed.xml', feedXml({ ...shared, projects }))
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
  return { projects: projects.length, outDir }
}

// Command line
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2)
  const option = (name) => {
    const i = args.indexOf(name)
    return i === -1 ? null : args[i + 1]
  }
  const offline = option('--offline')
  const out = option('--out')
  try {
    const client = offline ? createFixtureClient(path.resolve(offline)) : createClient()
    const result = await build({ client, ...(out ? { outDir: path.resolve(out) } : {}) })
    console.log(`Built ${result.projects} project pages into ${result.outDir}`)
  } catch (error) {
    console.error(`Build failed: ${error.message}`)
    process.exit(1)
  }
}
