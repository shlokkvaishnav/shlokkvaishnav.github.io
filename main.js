import { config } from './config.js'

const { personal, social, navItems, projects, skills, experience, albums, movies, philosophies, contacts } = config

// Helpers
const mk = (n, v) => ({ n, v, pct: v + '%' })
const timeline = experience.map((j, i) => ({ ...j, index: i + 1 }))
const skillsData = skills.map(cat => ({ name: cat.name, items: cat.items.map(s => mk(s.n, s.v)) }))

// State
let mobileOpen = false
let record = null
let playing = false

function go(id, e) {
  if (e) e.preventDefault()
  const t = document.getElementById(id)
  if (!t) return
  const y = t.getBoundingClientRect().top + window.scrollY - 64
  window.scrollTo({ top: y, behavior: 'smooth' })
  if (mobileOpen) { mobileOpen = false; updateMobile() }
}

function updateMobile() {
  const menu = document.querySelector('[data-mobile-menu]')
  if (menu) menu.style.display = mobileOpen ? 'flex' : 'none'
}

function updateTurntable() {
  const disc = document.querySelector('[data-disc]')
  const emptyMsg = document.querySelector('[data-empty-platter]')
  const arm = document.querySelector('[data-tonearm]')
  const status = document.querySelector('[data-status]')
  const titleEl = document.querySelector('[data-current-title]')
  const artistEl = document.querySelector('[data-current-artist]')
  const playBtn = document.querySelector('[data-play-btn]')

  const hasRecord = record !== null
  const current = hasRecord ? albums[record] : null

  if (disc) disc.style.display = hasRecord ? 'block' : 'none'
  if (emptyMsg) emptyMsg.style.display = hasRecord ? 'none' : 'grid'
  if (disc && hasRecord) {
    disc.style.animationPlayState = playing ? 'running' : 'paused'
    const label = disc.querySelector('[data-label]')
    if (label) {
      label.style.background = current.color
      label.querySelector('[data-label-title]').textContent = current.title
      label.querySelector('[data-label-artist]').textContent = current.artist
    }
  }
  if (arm) arm.style.transform = hasRecord && playing ? 'rotate(136deg)' : 'rotate(116deg)'
  if (status) status.textContent = !hasRecord ? 'Nothing playing' : playing ? 'Playing' : 'Ready'
  if (titleEl) titleEl.textContent = current?.title || 'No track selected'
  if (artistEl) artistEl.textContent = current?.artist || 'Choose an album below'
  if (playBtn) playBtn.textContent = playing ? '❚❚' : '▶'

  // Update crate selection
  document.querySelectorAll('[data-album-card]').forEach((card, i) => {
    const inner = card.querySelector('[data-album-inner]')
    if (record === i) {
      inner.style.borderColor = 'var(--color-accent)'
      inner.style.transform = 'translateY(-2px)'
    } else {
      inner.style.borderColor = 'var(--color-border)'
      inner.style.transform = 'none'
    }
  })

  // Spotify embed
  const container = document.querySelector('[data-spotify-container]')
  if (container) {
    if (hasRecord && playing && current?.spotifyTrack) {
      const src = `https://open.spotify.com/embed/track/${current.spotifyTrack}?utm_source=generator&theme=0`
      const existing = container.querySelector('iframe')
      if (!existing || existing.src !== src) {
        container.innerHTML = `<iframe src="${src}" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style="border-radius:10px;display:block"></iframe>`
      }
      container.style.maxHeight = '168px'
      container.style.opacity = '1'
    } else {
      container.style.maxHeight = '0'
      container.style.opacity = '0'
      if (!hasRecord) container.innerHTML = ''
    }
  }
}

function setupScrollSpy() {
  const sections = document.querySelectorAll('[data-section]')
  const markers = document.querySelectorAll('[data-marker]')
  const links = document.querySelectorAll('[data-navlink]')

  const setActive = (id) => {
    markers.forEach(m => {
      const on = m.dataset.marker === id
      m.style.opacity = on ? '1' : '0.35'
      m.style.height = on ? '22px' : '12px'
      m.style.background = on ? 'var(--color-accent)' : 'var(--color-text-faint)'
    })
    links.forEach(n => {
      const on = n.dataset.navlink === id
      n.style.color = on ? 'var(--color-text)' : 'var(--color-text-muted)'
      const underline = n.querySelector('[data-underline]')
      if (underline) underline.style.transform = on ? 'scaleX(1)' : 'scaleX(0)'
    })
  }

  const io = new IntersectionObserver((ents) => {
    ents.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
  sections.forEach(s => io.observe(s))
}

// ============ RENDER ============
function render() {
  const root = document.getElementById('root')
  root.innerHTML = `
<div class="relative min-h-screen bg-bg text-text font-sans overflow-x-hidden" style="line-height:1.6">

  <!-- TOP NAV -->
  <header class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-5 px-5 sm:px-10 py-4 bg-bg/80 backdrop-blur-md border-b border-border">
    <a href="#home" data-go="home" class="flex items-baseline gap-2 no-underline text-text">
      <span data-logo class="font-extrabold text-[15px] tracking-[0.08em]">SHLOK VAISHNAV</span>
    </a>
    <nav data-desktop-nav aria-label="Sections" class="flex items-center gap-9">
      ${navItems.map(item => `<a href="#${item.id}" data-navlink="${item.id}" data-go="${item.id}" class="relative text-[13px] font-semibold tracking-wide text-text-muted no-underline pb-1" style="transition:color .25s ease">${item.label}<span data-underline class="absolute left-0 -bottom-px h-px w-full bg-accent" style="transform:scaleX(0);transform-origin:left"></span></a>`).join('')}
    </nav>
    <div class="flex items-center gap-3">
      <a href="${social.resume}" data-resume class="text-[13px] font-semibold tracking-wide no-underline text-text border border-border-strong px-4 py-2 rounded-md" style="transition:background-color .25s ease,border-color .25s ease">Resume</a>
      <button data-mobile-toggle aria-label="Open menu" class="hidden flex-col gap-1 w-10 h-10 items-center justify-center bg-transparent border border-border-strong rounded-md cursor-pointer">
        <span class="w-4 h-px bg-text block"></span>
        <span class="w-4 h-px bg-text block"></span>
        <span class="w-4 h-px bg-text block"></span>
      </button>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div data-mobile-menu style="display:none" class="fixed inset-0 z-[60] bg-bg/97 backdrop-blur flex-col items-center justify-center gap-2">
    <button data-close-mobile aria-label="Close menu" class="absolute top-5 right-5 w-10 h-10 text-2xl leading-none bg-transparent border-none text-text cursor-pointer">×</button>
    ${navItems.map(item => `<a href="#${item.id}" data-go="${item.id}" class="text-2xl font-semibold tracking-wide text-text no-underline p-2.5">${item.label}</a>`).join('')}
    <a href="${social.resume}" class="text-lg font-semibold tracking-wide text-accent no-underline mt-3 border border-accent rounded-md px-6 py-3">Resume</a>
  </div>

  <!-- Side Markers -->
  <aside data-sidenav aria-hidden="true" class="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 items-center">
    ${navItems.map(item => `<button data-marker="${item.id}" data-go="${item.id}" aria-label="${item.label}" title="${item.label}" class="w-[3px] rounded-full border-none cursor-pointer p-0" style="height:12px;background:var(--color-text-faint);opacity:.35;transition:all .3s ease"></button>`).join('')}
  </aside>

  <!-- ========== HOME ========== -->
  <section id="home" data-section class="relative overflow-hidden px-5 sm:px-10">
    <div class="max-w-[880px] mx-auto min-h-screen flex flex-col justify-center gap-0" style="padding:128px 0 96px">
      <div data-hero-text>
        <p class="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase m-0">${personal.tagline}</p>
        <h1 class="font-extrabold m-0 text-text" style="font-size:clamp(40px,8vw,92px);line-height:1.02;letter-spacing:-0.02em;margin-top:18px">Shlok Vaishnav</h1>
        <p class="max-w-[560px] text-text-muted m-0" style="font-size:clamp(16px,1.6vw,19px);line-height:1.7;margin-top:22px">${personal.bio}</p>
        <div class="flex flex-wrap gap-3" style="margin-top:34px">
          <a href="#work" data-go="work" data-btn-primary class="text-[13px] font-semibold no-underline text-bg bg-text px-6 py-3 rounded-md" style="transition:opacity .25s ease">View Work</a>
          <a href="#contact" data-go="contact" data-btn-outline class="text-[13px] font-semibold no-underline text-text border border-border-strong px-6 py-3 rounded-md" style="transition:background-color .25s ease,border-color .25s ease">Get in Touch</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== WORK ========== -->
  <section id="work" data-section class="relative px-5 sm:px-10" style="padding-top:clamp(80px,12vh,140px);padding-bottom:clamp(80px,12vh,140px)">
    <div class="max-w-[1080px] mx-auto relative z-10">
      <div data-reveal style="margin-bottom:48px">
        <p class="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase m-0">Work</p>
        <h2 class="font-extrabold text-text m-0" style="font-size:clamp(30px,4.5vw,48px);line-height:1.05;margin-top:10px">Selected projects</h2>
        <p class="max-w-[560px] text-text-muted m-0" style="font-size:16px;margin-top:14px">A few things I've built and shipped.</p>
      </div>
      <div class="grid gap-6" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
        ${projects.map((p) => `
        <article data-card data-reveal class="relative bg-bg-raised border border-border rounded-lg overflow-hidden" style="padding:26px 24px">
          <div class="flex items-start justify-between gap-3" style="margin-bottom:14px">
            <h3 class="font-bold text-text m-0" style="font-size:19px">${p.title}</h3>
            ${p.featured ? `<span class="text-[10px] font-semibold tracking-[0.12em] uppercase text-accent border border-accent/30 rounded-full flex-none" style="padding:3px 9px;background:var(--color-accent-soft)">Featured</span>` : ''}
          </div>
          <p class="text-text-muted m-0" style="font-size:14.5px;line-height:1.65;margin-bottom:18px">${p.desc}</p>
          <div class="flex flex-wrap gap-2" style="margin-bottom:20px">
            ${p.tags.map(t => `<span class="font-mono text-[11px] text-text-muted border border-border rounded-md" style="padding:4px 9px">${t}</span>`).join('')}
          </div>
          <div class="flex gap-5 border-t border-border" style="padding-top:14px">
            <a href="${p.demo || p.github || '#'}" target="_blank" rel="noopener noreferrer" data-link class="text-[12.5px] font-semibold no-underline text-text">View ↗</a>
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" data-link class="text-[12.5px] font-semibold no-underline text-text-muted">Source</a>` : ''}
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <!-- ========== SKILLS ========== -->
  <section id="skills" data-section class="relative px-5 sm:px-10 bg-bg-raised" style="padding-top:clamp(80px,12vh,140px);padding-bottom:clamp(80px,12vh,140px)">
    <div class="max-w-[1080px] mx-auto relative z-10">
      <div data-reveal style="margin-bottom:48px">
        <p class="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase m-0">Skills</p>
        <h2 class="font-extrabold text-text m-0" style="font-size:clamp(30px,4.5vw,48px);line-height:1.05;margin-top:10px">What I work with</h2>
      </div>
      <div class="grid gap-5" style="grid-template-columns:repeat(auto-fit,minmax(248px,1fr))">
        ${skillsData.map(cat => `
        <div data-reveal class="bg-bg border border-border rounded-lg" style="padding:22px 20px">
          <h3 class="font-bold text-[13px] tracking-[0.1em] uppercase text-text-muted m-0" style="margin-bottom:18px">${cat.name}</h3>
          <div class="flex flex-col gap-4">
            ${cat.items.map(s => `
            <div>
              <div class="flex justify-between items-baseline" style="margin-bottom:6px">
                <span class="text-[14px] font-medium text-text">${s.n}</span>
              </div>
              <div class="h-1 rounded-full bg-border overflow-hidden">
                <div class="h-full rounded-full bg-accent" style="width:${s.pct}"></div>
              </div>
            </div>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ========== EXPERIENCE ========== -->
  <section id="experience" data-section class="relative px-5 sm:px-10" style="padding-top:clamp(80px,12vh,140px);padding-bottom:clamp(80px,12vh,140px)">
    <div class="max-w-[760px] mx-auto relative z-10">
      <div data-reveal style="margin-bottom:48px">
        <p class="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase m-0">Experience</p>
        <h2 class="font-extrabold text-text m-0" style="font-size:clamp(30px,4.5vw,48px);line-height:1.05;margin-top:10px">Where I've worked</h2>
      </div>
      <div class="relative flex flex-col" style="gap:0">
        ${timeline.map((job, i) => `
        <div data-reveal class="relative flex gap-6" style="padding-bottom:${i === timeline.length - 1 ? '0' : '34px'}">
          <div class="flex-none flex flex-col items-center">
            <span class="w-2.5 h-2.5 rounded-full bg-accent flex-none"></span>
            ${i === timeline.length - 1 ? '' : '<span class="w-px flex-1 bg-border" style="margin-top:6px"></span>'}
          </div>
          <div class="flex-1 min-w-0" style="padding-bottom:4px">
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <h3 class="font-bold text-text m-0" style="font-size:clamp(16px,2vw,19px)">${job.role}</h3>
              <span class="font-mono text-[11.5px] text-text-faint">${job.dates}</span>
            </div>
            <p class="font-semibold text-accent uppercase m-0" style="font-size:12.5px;letter-spacing:0.04em;margin:4px 0 10px">${job.company}</p>
            <p class="text-text-muted m-0" style="font-size:14.5px;line-height:1.65;max-width:600px">${job.detail}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ========== INTERESTS ========== -->
  <section id="interests" data-section class="relative px-5 sm:px-10 bg-bg-raised" style="padding-top:clamp(80px,12vh,140px);padding-bottom:clamp(80px,12vh,140px)">
    <div class="max-w-[1080px] mx-auto relative z-10">
      <div data-reveal style="margin-bottom:44px">
        <p class="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase m-0">Interests</p>
        <h2 class="font-extrabold text-text m-0" style="font-size:clamp(30px,4.5vw,48px);line-height:1.05;margin-top:10px">Beyond the work</h2>
      </div>
      <div data-elysium-grid class="grid gap-6" style="grid-template-columns:1.6fr 1fr;align-items:start">
        <!-- Turntable -->
        <div data-reveal class="bg-bg border border-border rounded-lg" style="padding:clamp(18px,3vw,26px)">
          <div class="flex items-baseline justify-between gap-3" style="margin-bottom:18px">
            <h3 class="font-bold text-[13px] tracking-[0.1em] uppercase text-text-muted m-0">Now Playing</h3>
            <span class="font-mono text-[11px] text-text-faint">33⅓ rpm</span>
          </div>
          <div class="relative flex flex-wrap gap-6 items-center bg-bg-raised-2 rounded-lg border border-border" style="padding:clamp(20px,3vw,28px)">
            <div class="relative flex-none" style="width:clamp(190px,26vw,240px);aspect-ratio:1">
              <div class="absolute inset-0 rounded-full" style="background:radial-gradient(circle at 50% 50%,#1c1c1e 0 22%,#161616 22%),repeating-radial-gradient(circle at 50% 50%,rgba(255,255,255,.04) 0 1px,rgba(0,0,0,0) 1px 4px)">
                <div data-disc style="display:none" class="absolute rounded-full" style="inset:5%;background:repeating-radial-gradient(circle at 50% 50%,#0c0c0e 0 1px,#161618 1px 3px);animation:vinylSpin 1.9s linear infinite;animation-play-state:paused">
                  <div data-label class="absolute rounded-full flex flex-col items-center justify-center text-center" style="inset:30%;padding:6px">
                    <span data-label-title class="font-bold text-text" style="font-size:11px;line-height:1.15"></span>
                    <span data-label-artist class="font-mono text-text-muted" style="font-size:8px;margin-top:3px"></span>
                  </div>
                </div>
                <div data-empty-platter class="absolute inset-0 flex items-center justify-center text-center">
                  <span class="font-mono text-text-faint uppercase" style="font-size:10.5px;letter-spacing:0.1em;max-width:64%">Select an album to begin</span>
                </div>
                <div class="absolute rounded-full bg-accent" style="top:50%;left:50%;width:8px;height:8px;transform:translate(-50%,-50%);z-index:3"></div>
              </div>
              <div aria-hidden="true" class="absolute rounded-full bg-accent" style="top:-2px;right:-2px;width:32px;height:32px;z-index:4">
                <div data-tonearm class="absolute rounded-md bg-bg" style="top:15px;left:15px;width:130px;height:5px;transform-origin:3px 3px;transform:rotate(116deg);transition:transform .8s cubic-bezier(.34,.8,.3,1)"></div>
              </div>
            </div>
            <div class="flex-1" style="min-width:180px;display:flex;flex-direction:column;gap:14px">
              <div class="rounded-md border border-border" style="background:rgba(255,255,255,.03);padding:12px 14px">
                <p data-status class="font-mono uppercase text-text-faint m-0" style="font-size:10px;letter-spacing:0.1em;margin-bottom:4px">Nothing playing</p>
                <p data-current-title class="font-bold text-text m-0" style="font-size:16px">No track selected</p>
                <p data-current-artist class="text-text-muted m-0" style="font-size:12.5px;margin-top:2px">Choose an album below</p>
              </div>
              <div class="flex items-center gap-3">
                <button data-play-btn class="rounded-full border-none cursor-pointer bg-accent text-bg flex items-center justify-center" style="width:44px;height:44px;font-size:14px;transition:opacity .25s ease">▶</button>
                <button data-eject-btn class="rounded-md border border-border-strong bg-transparent text-text-muted cursor-pointer" style="height:36px;padding:0 14px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;transition:border-color .25s ease,color .25s ease">Eject</button>
              </div>
            </div>
          </div>
          <div data-spotify-container class="overflow-hidden rounded-lg" style="margin:14px 0 0;transition:max-height .4s ease,opacity .4s ease;max-height:0;opacity:0"></div>
          <p class="font-bold text-[12px] tracking-[0.08em] uppercase text-text-faint" style="margin:22px 0 12px">Albums</p>
          <div class="grid gap-3" style="grid-template-columns:repeat(auto-fill,minmax(78px,1fr))">
            ${albums.map((al, i) => `
            <button data-album-card data-album-idx="${i}" title="${al.title}" class="block border-none bg-transparent p-0 cursor-pointer text-left">
              <div data-album-inner class="relative rounded-md overflow-hidden border border-border" style="aspect-ratio:1;transition:transform .2s ease,border-color .2s ease">
                <img src="${al.cover}" alt="${al.title}" class="w-full h-full object-cover block" loading="lazy">
              </div>
              <p class="text-[11px] font-medium text-text-muted whitespace-nowrap overflow-hidden text-ellipsis m-0" style="margin-top:6px">${al.title}</p>
            </button>`).join('')}
          </div>
        </div>
        <!-- Sidebar -->
        <div class="flex flex-col gap-5">
          <div data-reveal class="bg-bg border border-border rounded-lg" style="padding:22px">
            <h3 class="font-bold text-[13px] tracking-[0.1em] uppercase text-text-muted m-0" style="margin-bottom:14px">Favorite films</h3>
            <div class="flex flex-col gap-2.5">
              ${movies.map(m => `<span class="text-[14px] text-text" style="font-weight:500">${m}</span>`).join('')}
            </div>
          </div>
          <div data-reveal class="bg-bg border border-border rounded-lg" style="padding:22px">
            <h3 class="font-bold text-[13px] tracking-[0.1em] uppercase text-text-muted m-0" style="margin-bottom:14px">Philosophies</h3>
            <div class="flex flex-col gap-3">
              ${philosophies.map(p => `<div><p class="font-semibold text-text m-0" style="font-size:14px">${p.title}</p><p class="text-text-muted m-0" style="font-size:13px;line-height:1.55;margin-top:2px">${p.note}</p></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== CONTACT ========== -->
  <section id="contact" data-section class="relative px-5 sm:px-10" style="padding:clamp(80px,12vh,140px) 0 0">
    <div data-reveal class="max-w-[640px] mx-auto text-center relative z-10" style="padding-bottom:clamp(80px,12vh,120px)">
      <p class="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase m-0">Contact</p>
      <h2 class="font-extrabold text-text m-0" style="font-size:clamp(32px,5.5vw,56px);line-height:1.05;margin-top:10px">Let's build something</h2>
      <p class="max-w-[460px] mx-auto text-text-muted m-0" style="font-size:16px;margin:16px auto 32px">Have a project in mind or just want to say hi? My inbox is open.</p>
      <a href="mailto:${personal.email}" class="inline-block text-[14px] font-semibold no-underline text-bg bg-text rounded-md" style="padding:14px 30px;transition:opacity .25s ease">Say hello</a>
      <div class="flex flex-wrap gap-3 justify-center" style="margin-top:36px">
        ${contacts.map(c => `<a href="${c.href}" target="_blank" rel="noopener noreferrer" data-contact-card class="flex flex-col items-start gap-0.5 no-underline bg-bg-raised border border-border rounded-lg" style="min-width:150px;padding:12px 16px"><span class="font-mono uppercase text-text-faint" style="font-size:10px;letter-spacing:0.1em">${c.label}</span><span class="text-[14px] font-medium text-text">${c.value}</span></a>`).join('')}
      </div>
    </div>
    <footer class="border-t border-border text-center relative z-10" style="padding:24px clamp(20px,5vw,48px)">
      <p class="m-0 text-text-faint" style="font-size:12px;letter-spacing:0.06em">© Shlok Vaishnav</p>
    </footer>
  </section>

</div>`

  // Event Listeners
  document.querySelectorAll('[data-go]').forEach(el => {
    el.addEventListener('click', (e) => go(el.dataset.go, e))
  })

  document.querySelector('[data-mobile-toggle]')?.addEventListener('click', () => {
    mobileOpen = true; updateMobile()
  })
  document.querySelector('[data-close-mobile]')?.addEventListener('click', () => {
    mobileOpen = false; updateMobile()
  })

  document.querySelector('[data-play-btn]')?.addEventListener('click', () => {
    if (record !== null) { playing = !playing; updateTurntable() }
  })
  document.querySelector('[data-eject-btn]')?.addEventListener('click', () => {
    record = null; playing = false; updateTurntable()
  })

  document.querySelectorAll('[data-album-card]').forEach(btn => {
    btn.addEventListener('click', () => {
      record = parseInt(btn.dataset.albumIdx); playing = false; updateTurntable()
    })
  })

  setupScrollSpy()
  setupReveal()
}

function setupReveal() {
  const els = document.querySelectorAll('[data-reveal]')
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => el.classList.add('visible'))
    return
  }
  const io = new IntersectionObserver((ents) => {
    ents.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
  els.forEach(el => io.observe(el))
}

window.history.scrollRestoration = 'manual'
window.scrollTo(0, 0)
render()
