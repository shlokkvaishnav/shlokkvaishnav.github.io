// A stand-in for the GitHub client. It reads saved answers from a folder.
// Files: repos.json and readme-<repo>.html. A missing file means "not found".

import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

export function createFixtureClient(dir) {
  const read = (file) => (existsSync(path.join(dir, file)) ? readFileSync(path.join(dir, file), 'utf8') : null)
  return {
    async listPublicRepos() {
      return JSON.parse(read('repos.json') ?? '[]')
    },
    async getReadmeHtml(_owner, repo) {
      return read(`readme-${repo}.html`)
    },
  }
}
