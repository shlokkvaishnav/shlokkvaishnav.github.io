// Makes the README HTML from the GitHub API work on another site.
// The API leaves links relative to the repo. This file turns them into full addresses.

const ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i

// Removes things that should never be in a README page.
// GitHub already cleans this HTML. This is a second guard.
function stripUnsafe(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe\b[\s\S]*?<\/iframe>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, '')
    .replace(/(href|src)\s*=\s*"\s*javascript:[^"]*"/gi, '$1="#"')
}

export function rewriteReadmeHtml(html, { owner, repo, branch }) {
  const blobBase = `https://github.com/${owner}/${repo}/blob/${branch}/`
  const rawBase = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`

  // The API puts "user-content-" in front of the ids that Markdown headings get, but not in front
  // of links to them. Headings written as raw HTML keep their plain ids. Add the prefix only when
  // the prefixed id exists in this page.
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))

  const fix = (attr, value) => {
    if (value === '' || value === '#') return value
    if (value.startsWith('#')) {
      const name = value.slice(1)
      return ids.has(`user-content-${name}`) ? `#user-content-${name}` : value
    }
    if (ABSOLUTE.test(value)) return value
    const relative = value.replace(/^\/+/, '')
    try {
      return new URL(relative, attr === 'src' ? rawBase : blobBase).href
    } catch {
      return value
    }
  }

  const out = stripUnsafe(html)
    .replace(/\b(src|href)="([^"]*)"/g, (_, attr, value) => `${attr}="${fix(attr, value)}"`)
    .replace(/<img\b(?![^>]*\bloading=)/g, '<img loading="lazy"')
  return out
}
