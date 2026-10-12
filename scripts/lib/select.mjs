// Chooses which repositories appear on the site, and derives what to show for each.

// A repo name becomes a folder name. Allow only plain names.
export function isSafeSlug(name) {
  return /^[A-Za-z0-9._-]+$/.test(name) && name !== '.' && name !== '..'
}

// The address of the live demo, or null.
// Order: a manual override, then the repo's own Pages site, then its homepage field.
export function liveUrlOf(repo, config) {
  const overrides = config.liveOverride ?? {}
  if (Object.hasOwn(overrides, repo.name)) return overrides[repo.name]
  if (repo.has_pages) return `https://${config.owner}.github.io/${repo.name}/`
  return repo.homepage || null
}

export function selectProjects(repos, config) {
  const exclude = new Set(config.exclude ?? [])
  const ownForks = new Set(config.ownForks ?? [])
  const pin = config.pin ?? []

  const projects = repos
    .filter((r) => r.private !== true && r.visibility !== 'private')
    .filter((r) => !r.disabled && !exclude.has(r.name) && isSafeSlug(r.name))
    // Forks of other people's projects stay hidden. A fork listed in `ownForks` is my own work.
    .filter((r) => !(config.hideForks && r.fork && !ownForks.has(r.name)))
    .map((r) => ({
      name: r.name,
      description: r.description ?? '',
      codeUrl: r.html_url,
      liveUrl: liveUrlOf(r, config),
      isFork: Boolean(r.fork) && !ownForks.has(r.name),
      isOwn: !r.fork || ownForks.has(r.name),
      archived: Boolean(r.archived),
      pushedAt: r.pushed_at,
      license: r.license?.spdx_id && r.license.spdx_id !== 'NOASSERTION' ? r.license.spdx_id : null,
      defaultBranch: r.default_branch ?? 'main',
    }))

  const rank = (name) => {
    const i = pin.indexOf(name)
    return i === -1 ? Infinity : i
  }
  // Pinned repos come first, in the order of the pin list. The rest follow, newest push first.
  return projects.sort((a, b) => {
    const ra = rank(a.name)
    const rb = rank(b.name)
    if (ra !== rb) return ra < rb ? -1 : 1
    return new Date(b.pushedAt) - new Date(a.pushedAt)
  })
}
