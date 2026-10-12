// Inline SVG icons from assets/icons/ (Bootstrap Icons, MIT). See assets/CREDITS.md.
// An icon is put into the page as an <svg>, so it takes the text colour and needs no extra request.
// The width, height and fill are also set on the tag. The icon then looks right even before the
// stylesheet loads, and in browsers that handle SVG sizing badly.
// A missing icon is a build error. It must never become a silent gap in the page.

import { readFileSync } from 'node:fs'
import path from 'node:path'

const SVG = /<svg\b[^>]*\bviewBox="([^"]+)"[^>]*>([\s\S]*?)<\/svg>/

export function createIcons(dir) {
  const cache = new Map()
  return function icon(name) {
    if (!/^[a-z0-9-]+$/.test(name)) throw new Error(`Bad icon name: ${name}`)
    if (!cache.has(name)) {
      let source
      try {
        source = readFileSync(path.join(dir, `${name}.svg`), 'utf8')
      } catch {
        throw new Error(`Icon not found: assets/icons/${name}.svg`)
      }
      const match = SVG.exec(source)
      if (!match) throw new Error(`Icon is not a plain SVG: ${name}`)
      const inner = match[2].trim().replace(/>\s+</g, '><')
      cache.set(name, `<svg class="icon" width="16" height="16" fill="currentColor" viewBox="${match[1]}" aria-hidden="true" focusable="false">${inner}</svg>`)
    }
    return cache.get(name)
  }
}
