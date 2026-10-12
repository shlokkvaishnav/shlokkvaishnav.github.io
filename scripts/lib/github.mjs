// A small GitHub REST client. It reads public data only.
// It retries network errors, 5xx answers and rate limits. It never retries a 404.

const API = 'https://api.github.com'

const defaultSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function createClient({
  token = process.env.GITHUB_TOKEN,
  fetchImpl = globalThis.fetch,
  retries = 4,
  sleep = defaultSleep,
} = {}) {
  async function request(path, { accept = 'application/vnd.github+json', as = 'json' } = {}) {
    const headers = {
      Accept: accept,
      'User-Agent': 'portfolio-site-build',
      'X-GitHub-Api-Version': '2022-11-28',
    }
    if (token) headers.Authorization = `Bearer ${token}`

    let lastError
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetchImpl(`${API}${path}`, { headers })
        if (res.status === 404 || res.status === 409) return null // missing, or an empty repo
        if (res.ok) return as === 'text' ? await res.text() : await res.json()

        const limited =
          res.status === 429 || (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0')
        if (res.status >= 500 || limited) {
          lastError = new Error(`GitHub answered ${res.status} for ${path}`)
        } else {
          // Other 4xx answers will not get better with a retry.
          throw Object.assign(new Error(`GitHub answered ${res.status} for ${path}`), { fatal: true })
        }
      } catch (error) {
        if (error.fatal) throw error
        lastError = error
      }
      if (attempt < retries) await sleep(1000 * 2 ** attempt)
    }
    throw lastError
  }

  return {
    // All public repositories of a user, newest push first.
    async listPublicRepos(owner) {
      const all = []
      for (let page = 1; page <= 10; page++) {
        const batch = await request(`/users/${owner}/repos?type=owner&sort=pushed&per_page=100&page=${page}`)
        if (!batch) break
        all.push(...batch)
        if (batch.length < 100) break
      }
      return all
    },

    // The README as HTML that GitHub made safe. Returns null if the repo has no README.
    getReadmeHtml(owner, repo) {
      return request(`/repos/${owner}/${repo}/readme`, {
        accept: 'application/vnd.github.html+json',
        as: 'text',
      })
    },
  }
}
