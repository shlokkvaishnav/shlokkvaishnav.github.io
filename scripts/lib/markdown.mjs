// A tiny Markdown subset for content/now.md. The text is escaped first, so it cannot add HTML.
// Supported: "#", "##" and "###" headings, "- " lists, paragraphs, **bold**, *italic*, `code`, [text](url).

import { esc } from './html.mjs'

const SAFE_URL = /^(?:https?:\/\/|mailto:|\/|#)/i

function inline(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, url) => {
      // `url` was escaped above, so "&amp;" in it is correct inside an attribute.
      const plain = url.replace(/&amp;/g, '&')
      return SAFE_URL.test(plain) ? `<a href="${url}">${label}</a>` : label
    })
}

export function renderMarkdown(source) {
  const blocks = source.replace(/\r\n/g, '\n').trim().split(/\n{2,}/)
  return blocks
    .map((block) => {
      const lines = block.split('\n')
      const heading = /^(#{1,3})\s+(.*)$/.exec(lines[0])
      if (heading && lines.length === 1) {
        const level = heading[1].length + 1 // The page title is the only <h1>.
        return `<h${level}>${inline(heading[2])}</h${level}>`
      }
      if (lines.every((l) => /^[-*]\s+/.test(l))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^[-*]\s+/, ''))}</li>`).join('')}</ul>`
      }
      return `<p>${inline(lines.join(' '))}</p>`
    })
    .join('\n')
}
