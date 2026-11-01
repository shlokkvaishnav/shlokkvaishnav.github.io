import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'
import { indexPage, notFoundPage, sitemapXml } from '../scripts/lib/render.mjs'
import { createIcons } from '../scripts/lib/icons.mjs'

const root = new URL('../', import.meta.url)
const json = (p) => JSON.parse(readFileSync(new URL(p, root), 'utf8'))
const profile = json('data/profile.json')
const now = new Date('2026-10-12T00:00:00Z')
const site = { url: 'https://example.test', builtAt: now.toISOString(), sourceUrl: 'https://example.test/src' }
const icon = createIcons(new URL('assets/icons/', root).pathname)
const ctx = {
  site,
  profile,
  icon,
  experience: json('data/experience.json'),
  leadership: json('data/leadership.json'),
  privateWork: json('data/private-work.json'),
}

// The HTML of one section of the home page.
const section = (html, id) => {
  const start = html.indexOf(`<section id="${id}">`)
  return html.slice(start, html.indexOf('</section>', start))
}

test('the sitemap lists only the home page', () => {
  const xml = sitemapXml({ site })
  assert.match(xml, /<loc>https:\/\/example\.test\/<\/loc>/)
  assert.doesNotMatch(xml, /\/now\//)
})

test('the site never mentions the old custom domain', () => {
  const all = [indexPage(ctx), sitemapXml({ site })].join('\n')
  assert.doesNotMatch(all, /shlokkvaishnav\.dev/)
})

test('the home page has no News, Recently or search bar', () => {
  const html = indexPage(ctx)
  assert.doesNotMatch(html, /News|Recently|type="search"|<script src=/)
})

test('the portrait has an alt text and a size, so the page does not jump', () => {
  assert.match(indexPage(ctx), /<img class="avatar" src="\/assets\/avatar\.jpg" width="160" height="160" alt="Portrait of Shlok Vaishnav">/)
})

test('the home page has a side panel with the links, and the content next to it', () => {
  const html = indexPage(ctx)
  assert.match(html, /<body class="home">/)
  assert.match(html, /<aside class="profile">[\s\S]*<nav class="links"[\s\S]*<\/aside>\s*<div class="content">/)
  // The experience and research are in the content column, not in the side panel.
  assert.ok(html.indexOf('<div class="content">') < html.indexOf('id="experience"'))
  assert.ok(html.indexOf('</aside>') < html.indexOf('id="research"'))
})

test('the home page and the CV show the current roles, not the old ones', () => {
  const all = indexPage(ctx)
  assert.match(all, /Computer Vision Researcher/)
  assert.match(all, /Apr 2026 to Sep 2026/) // the Bull Agritech internship has ended
  assert.doesNotMatch(all, /NanoDB|Climate equation discovery|castor/i)
})

test('no public page contains the phone number', () => {
  const all = indexPage(ctx)
  assert.doesNotMatch(all, /7984739443|\+91/)
})

test('the home page has no Now link', () => {
  assert.doesNotMatch(indexPage(ctx), /href="\/now\/"|>Now</)
})

test('the tab title of the home page is just the name', () => {
  assert.match(indexPage(ctx), /<title>Shlok Vaishnav<\/title>/)
  assert.match(indexPage(ctx), /<meta property="og:title" content="Shlok Vaishnav">/)
})

test('the CV link opens the resume PDF', () => {
  assert.match(indexPage(ctx), /<a class="ilink" href="\/Shlok_Vaishnav_Resume\.pdf">/)
})

test('Experience has only ISRO and Bull Agritech', () => {
  const html = section(indexPage(ctx), 'experience')
  assert.match(html, /<h2>[\s\S]*Experience<\/h2>/)
  assert.match(html, /Space Applications Centre, ISRO/)
  assert.match(html, /Bull Agritech/)
  assert.doesNotMatch(html, /Data Science Club|IEEE/)
  assert.equal((html.match(/class="org"/g) ?? []).length, 2)
})

test('Leadership is a separate section with the Data Science Club and IEEE CS', () => {
  const html = section(indexPage(ctx), 'leadership')
  assert.match(html, /<h2>[\s\S]*Leadership<\/h2>/)
  assert.match(html, /Data Science Club, Nirma University/)
  assert.match(html, /IEEE Computer Society, Nirma University/)
  assert.doesNotMatch(html, /Bull Agritech|ISRO/)
  assert.equal((html.match(/class="org"/g) ?? []).length, 2)
})

test('the Data Science Club shows both roles under one organization, newest first', () => {
  const html = section(indexPage(ctx), 'leadership')
  const club = html.slice(html.indexOf('<li class="org">'), html.lastIndexOf('<li class="org">'))
  assert.equal((club.match(/<li class="position/g) ?? []).length, 2)
  assert.ok(club.indexOf('President') < club.indexOf('Technical Team Member'))
  assert.match(club, /<ol class="positions">/)
  assert.equal((club.match(/class="org-head"/g) ?? []).length, 1) // the name heads the group once
  assert.doesNotMatch(club, /class="position-org"/) // so the roles do not repeat it
  assert.match(club, /<li class="position current">/) // the role held now
})

test('IEEE CS is its own entry with a single role, and the organization sits under the title', () => {
  const html = section(indexPage(ctx), 'leadership')
  const ieee = html.slice(html.lastIndexOf('<li class="org">'))
  assert.match(ieee, /Founding Board Member/)
  assert.equal((ieee.match(/<li class="position/g) ?? []).length, 1)
  assert.match(ieee, /<p class="position-org">IEEE Computer Society, Nirma University<\/p>/)
  assert.doesNotMatch(ieee, /class="org-head"/)
})

test('periods and durations come from the dates (build date is 12 Oct 2026)', () => {
  const html = indexPage(ctx)
  assert.match(html, /Feb 2026 to now<\/span><span>9 mos/) // ISRO
  assert.match(html, /Apr 2026 to Sep 2026<\/span><span>6 mos/) // Bull Agritech
  assert.match(html, /Sep 2026 to now<\/span><span>2 mos/) // President
  assert.match(html, /Sep 2025 to Aug 2026<\/span><span>1 yr/) // Technical Team Member and IEEE CS
  assert.match(html, /<span class="org-total">1 yr 2 mos<\/span>/) // the club in total
})

test('nobody is marked "Promoted"', () => {
  assert.doesNotMatch(indexPage(ctx), /Promoted|chip-accent/)
})

test('every role sits on the same left edge, alone or one of several', () => {
  const html = indexPage(ctx)
  assert.equal((html.match(/<ol class="positions">/g) ?? []).length, 4) // ISRO, Bull Agritech, the club, IEEE CS
  assert.doesNotMatch(html, /positions linked/)
  const css = readFileSync(new URL('assets/style.css', root), 'utf8')
  assert.doesNotMatch(css, /\.positions\.linked/) // no extra indent for several roles
  assert.match(css, /\.positions \{[^}]*padding: 0/)
})

test('the title and the dates share a row, and only the role held now has a dot', () => {
  const html = indexPage(ctx)
  assert.equal((html.match(/<div class="position-head">/g) ?? []).length, 5) // one per role
  const css = readFileSync(new URL('assets/style.css', root), 'utf8')
  assert.match(css, /\.position\.current \.position-title strong::after/)
  assert.doesNotMatch(css, /(^|\n)\.position::before/)
})

test('a future position at the same organization joins the same timeline', () => {
  const experience = [
    {
      org: 'Example Lab',
      roles: [
        { title: 'Senior Researcher', start: '2026-08', end: null, summary: 'Newer role.' },
        { title: 'Researcher', start: '2026-01', end: '2026-07', summary: 'Older role.' },
      ],
    },
  ]
  const html = section(indexPage({ ...ctx, experience }), 'experience')
  assert.equal((html.match(/class="org"/g) ?? []).length, 1) // one organization
  assert.equal((html.match(/<li class="position/g) ?? []).length, 2) // two roles under it
  assert.ok(html.indexOf('Senior Researcher') < html.indexOf('>Researcher<'))
  assert.match(html, /<span class="org-total">10 mos<\/span>/) // Jan to Oct 2026
  assert.match(html, /<li class="position current">/)
})

test('the Research list has a short line and a tag for each item, and no names', () => {
  const html = indexPage(ctx)
  assert.match(html, /<h2>[\s\S]*?Research<\/h2>/)
  assert.doesNotMatch(html, /Private research|private code/)
  assert.match(html, /I am working on whether a replicated approximate-nearest-neighbour index silently diverges in search quality across replicas under node failure, and whether that divergence persists after recovery\./)
  assert.equal((html.match(/Currently ongoing/g) ?? []).length, 3)
  assert.doesNotMatch(html, /Replica recall divergence|Null scaffold audit|replica-recall|null-scaffold/i)
})

test('the intro is a single paragraph', () => {
  const html = indexPage(ctx)
  const bio = html.slice(html.indexOf('<div class="bio">'), html.indexOf('<section id="experience">'))
  assert.equal((bio.match(/<p/g) ?? []).length, 1)
  assert.doesNotMatch(html, /I build systems from scratch|I am a computer vision researcher/)
})

const emojiIn = (html) => [...html.matchAll(/<span class="emoji" aria-hidden="true">([^<]+)<\/span>/g)].map((m) => m[1])

test('the fun lines are in the places I agreed on', () => {
  const html = indexPage(ctx)
  assert.doesNotMatch(html, /class="tagline"|Teaching computers to find craters/) // the line under the name was removed
  assert.doesNotMatch(html, /class="funfact"|Fun fact/) // the fun-fact line was removed
  assert.match(html, /<p class="note">Open to internships and research collaborations&nbsp;<span class="emoji"/)
  for (const line of ['Where I have worked', 'Clubs I have helped lead', 'Questions I am chasing']) {
    assert.match(html, new RegExp(`<p class="subtitle">${line.replace(/'/g, '&#39;')}&nbsp;<span class="emoji"`), line)
  }
  assert.doesNotMatch(html, /never sleeps|Built from GitHub/) // the footer has only the build date and the links
  assert.match(html, /Currently ongoing&nbsp;<span class="emoji" aria-hidden="true">🔬<\/span>/)
  const missing = notFoundPage({ site, profile, icon })
  assert.match(missing, /This page got lost, like a rover on the Moon&nbsp;<span class="emoji" aria-hidden="true">🌑<\/span>/)
  assert.match(missing, /<a href="\/">Take me home<\/a>/)
})

test('every emoji is hidden from screen readers, and none is in the title or description', () => {
  const html = indexPage(ctx)
  const all = [...html.matchAll(/\p{Extended_Pictographic}/gu)].length
  assert.equal(emojiIn(html).length >= 7, true)
  // Each emoji character in the page sits inside an aria-hidden span.
  const outside = html.replace(/<span class="emoji" aria-hidden="true">[^<]+<\/span>/g, '').match(/\p{Extended_Pictographic}/gu)
  assert.equal(outside, null)
  assert.ok(all > 0)
  assert.doesNotMatch(html, /<title>[^<]*\p{Extended_Pictographic}/u)
  assert.doesNotMatch(html, /<meta name="description" content="[^"]*\p{Extended_Pictographic}/u)
})

test('the fun lines are optional: without them the page still builds', () => {
  const bare = { ...profile }
  for (const k of ['availability', 'subtitles', 'notFoundLine']) delete bare[k]
  const noEmoji = ctx.privateWork.map(({ emoji, ...rest }) => rest)
  const html = indexPage({ ...ctx, profile: bare, privateWork: noEmoji })
  assert.doesNotMatch(html, /class="subtitle"|class="emoji"/)
  assert.match(notFoundPage({ site, profile: bare, icon }), /This page does not exist\./)
})

test('Research is a list of points, one bullet per item', () => {
  const html = indexPage(ctx)
  const list = html.slice(html.indexOf('<ul class="points">'), html.indexOf('</ul>', html.indexOf('<ul class="points">')))
  assert.equal((list.match(/<li>/g) ?? []).length, 3)
  assert.match(list, /<li>I am working on whether a replicated approximate-nearest-neighbour index silently diverges in search quality across replicas under node failure, and whether that divergence persists after recovery\. <span class="chip">Currently ongoing/)
  assert.doesNotMatch(list, /class="project"|class="desc"/)
})

test('the page has an Experience, a Leadership and a Research section, and nothing about projects', () => {
  const html = indexPage(ctx)
  assert.deepEqual([...html.matchAll(/<section id="([a-z]+)">/g)].map((m) => m[1]), ['experience', 'leadership', 'research'])
  assert.doesNotMatch(html, /id="projects"|class="projects?"|Things I have built|Live demo|feed\.xml/)
  assert.ok(html.includes('skipping layers to make a language model run faster'))
})

test('text in the research list is escaped', () => {
  const bad = [{ summary: '<script>alert("x")</script> & "quotes"', tag: 'Currently ongoing', emoji: '' }]
  const html = indexPage({ ...ctx, privateWork: bad })
  assert.ok(!html.includes('<script>alert("x")</script>'))
  assert.match(html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt; &amp; &quot;quotes&quot;/)
})

// The content of one <meta> tag, found by its property or name.
const metaContent = (html, key) => html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)">`))?.[1]

test('the head has a social preview: an absolute image address and a large Twitter card', () => {
  const html = indexPage(ctx)
  assert.equal(metaContent(html, 'og:image'), 'https://example.test/assets/social.png')
  assert.equal(metaContent(html, 'twitter:image'), 'https://example.test/assets/social.png')
  assert.equal(metaContent(html, 'og:image:width'), '1200')
  assert.equal(metaContent(html, 'og:image:height'), '630')
  assert.equal(metaContent(html, 'twitter:card'), 'summary_large_image')
  assert.equal(metaContent(html, 'og:site_name'), 'Shlok Vaishnav')
  assert.equal(metaContent(html, 'twitter:title'), 'Shlok Vaishnav')
  assert.equal(metaContent(html, 'twitter:description'), metaContent(html, 'og:description'))
  assert.match(metaContent(html, 'og:image:alt'), /^Shlok Vaishnav: /)
  assert.equal(metaContent(html, 'twitter:image:alt'), metaContent(html, 'og:image:alt'))
})

test('the 404 page has the social preview too', () => {
  assert.equal(metaContent(notFoundPage({ site, profile, icon }), 'og:image'), 'https://example.test/assets/social.png')
})

test('the social preview text is escaped', () => {
  const html = indexPage({ ...ctx, profile: { ...profile, role: 'A "quoted" <b>role</b>' } })
  assert.match(metaContent(html, 'og:image:alt'), /A &quot;quoted&quot; &lt;b&gt;role&lt;\/b&gt;/)
  assert.ok(!html.includes('content="Shlok Vaishnav: A "quoted"'))
})

