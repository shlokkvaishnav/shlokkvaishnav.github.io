import { config } from './config.js'

const { personal, social, navItems, projects, skills, experience, albums, movies, philosophies, contacts } = config

// Helpers
const mk = (n, v) => ({ n, v, pct: v + '%', label: v >= 90 ? 'Legendary' : v >= 80 ? 'Honed' : v >= 70 ? 'Tempered' : 'Forged' })
const tones = ['#f0e7d3', '#e8d8b9', '#ddc99f', '#d3bb8c']
const depths = ['0 – 2 m', '2 – 4 m', '4 – 6 m', '6 – 8 m']
const numerals = ['I', 'II', 'III', 'IV']
const timeline = experience.map((j, i) => ({ ...j, tone: tones[i] || tones.at(-1), depth: depths[i] || depths.at(-1), stratum: numerals[i] || '' }))
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
  if (status) status.textContent = !hasRecord ? 'Empty Platter' : playing ? 'Now Spinning' : 'Ready — Press Play'
  if (titleEl) titleEl.textContent = current?.title || 'No Relic Loaded'
  if (artistEl) artistEl.textContent = current?.artist || 'Select from the crate below'
  if (playBtn) playBtn.textContent = playing ? '❚❚' : '▶'

  // Update crate selection
  document.querySelectorAll('[data-album-card]').forEach((card, i) => {
    const inner = card.querySelector('[data-album-inner]')
    if (record === i) {
      inner.style.boxShadow = '0 12px 22px -10px rgba(60,42,20,.6), 0 0 0 2px #8f6f33'
      inner.style.transform = 'translateY(-5px)'
    } else {
      inner.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,.4)'
      inner.style.transform = 'none'
    }
  })
}

function setupScrollSpy() {
  const sections = document.querySelectorAll('[data-section]')
  const markers = document.querySelectorAll('[data-marker]')
  const links = document.querySelectorAll('[data-navlink]')

  const setActive = (id) => {
    markers.forEach(m => {
      const on = m.dataset.marker === id
      m.style.opacity = on ? '1' : '0.4'
      m.style.height = on ? '34px' : '16px'
      m.style.background = on ? '#8f6f33' : '#bd9a52'
    })
    links.forEach(n => {
      const on = n.dataset.navlink === id
      n.style.color = on ? '#8f6f33' : '#5a4a36'
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
<div style="position:relative;min-height:100vh;background:#ece2cf;color:#3b3024;font-family:'Manrope',system-ui,sans-serif;overflow-x:hidden;line-height:1.6">

  <!-- TOP NAV -->
  <header style="position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:14px clamp(18px,4vw,42px);background:rgba(236,226,207,0.78);backdrop-filter:blur(10px);border-bottom:1px solid rgba(90,70,45,0.16)">
    <a href="#sanctuary" data-go="sanctuary" style="display:flex;align-items:baseline;gap:10px;text-decoration:none;color:inherit">
      <span data-logo style="font-family:'Cinzel',serif;font-weight:800;font-size:19px;letter-spacing:0.16em;color:#3b3024">SHLOK&nbsp;VAISHNAV</span>
      <span data-est style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.28em;color:#8f6f33;opacity:.8">EST·MMXXVI</span>
    </a>
    <nav data-desktop-nav aria-label="Sections" style="display:flex;align-items:center;gap:clamp(14px,2vw,30px)">
      ${navItems.map(item => `<a href="#${item.id}" data-navlink="${item.id}" data-go="${item.id}" style="font-family:'Cinzel',serif;font-size:12.5px;font-weight:600;letter-spacing:0.13em;text-transform:uppercase;color:#5a4a36;text-decoration:none;padding-bottom:3px;transition:color .3s ease">${item.label}</a>`).join('')}
    </nav>
    <div style="display:flex;align-items:center;gap:12px">
      <a href="${social.resume}" data-resume style="font-family:'Cinzel',serif;font-size:12.5px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;color:#3b3024;border:1.5px solid #8f6f33;padding:9px 18px;border-radius:2px;background:transparent;transition:background .3s ease,color .3s ease">Resume</a>
      <button data-mobile-toggle aria-label="Open menu" style="display:none;flex-direction:column;gap:4px;width:42px;height:42px;align-items:center;justify-content:center;background:transparent;border:1.5px solid rgba(90,70,45,.3);border-radius:2px;cursor:pointer">
        <span style="width:18px;height:2px;background:#3b3024;display:block"></span>
        <span style="width:18px;height:2px;background:#3b3024;display:block"></span>
        <span style="width:18px;height:2px;background:#3b3024;display:block"></span>
      </button>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div data-mobile-menu style="display:none;position:fixed;inset:0;z-index:60;background:rgba(236,226,207,0.97);backdrop-filter:blur(8px);flex-direction:column;align-items:center;justify-content:center;gap:8px">
    <button data-close-mobile aria-label="Close menu" style="position:absolute;top:20px;right:22px;width:42px;height:42px;font-size:26px;line-height:1;background:transparent;border:none;color:#3b3024;cursor:pointer">×</button>
    ${navItems.map(item => `<a href="#${item.id}" data-go="${item.id}" style="font-family:'Cinzel',serif;font-size:24px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#3b3024;text-decoration:none;padding:10px">${item.label}</a>`).join('')}
    <a href="${social.resume}" style="font-family:'Cinzel',serif;font-size:20px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8f6f33;text-decoration:none;padding:10px;margin-top:12px;border:1.5px solid #8f6f33;border-radius:2px;padding:12px 24px">Resume</a>
  </div>

  <!-- Side Markers -->
  <aside data-sidenav aria-hidden="true" style="position:fixed;left:20px;top:50%;transform:translateY(-50%);z-index:40;display:flex;flex-direction:column;gap:12px;align-items:center">
    ${navItems.map(item => `<button data-marker="${item.id}" data-go="${item.id}" aria-label="${item.label}" title="${item.label}" style="width:5px;height:16px;border-radius:2px;border:none;cursor:pointer;background:#bd9a52;opacity:.4;transition:all .35s ease;padding:0"></button>`).join('')}
  </aside>

  <!-- ========== HERO / SANCTUARY ========== -->
  <section id="sanctuary" data-section style="position:relative;overflow:hidden;padding:0 clamp(20px,5vw,48px)">
    <div data-hero-grid style="max-width:1180px;margin:0 auto;min-height:100vh;display:grid;grid-template-columns:1.05fr 0.95fr;align-items:center;gap:40px;padding:128px 0 96px">
      <div data-hero-text style="position:relative;z-index:2;text-align:left">
        <p style="font-family:'Cinzel',serif;font-size:clamp(11px,1.4vw,14px);letter-spacing:0.42em;text-transform:uppercase;color:#8f6f33;margin:0">${personal.tagline}</p>
        <div aria-hidden="true" style="height:16px;width:180px;opacity:.6;margin:16px 0 22px"></div>
        <h1 style="font-family:'Cinzel',serif;font-weight:900;font-size:clamp(46px,8.4vw,128px);line-height:0.94;letter-spacing:0.015em;margin:0;color:#352b20;text-shadow:0 2px 0 rgba(255,252,244,.55),0 -2px 2px rgba(60,40,20,.26)">SHLOK<br>VAISHNAV</h1>
        <p style="max-width:520px;margin:28px 0 0;font-size:clamp(16px,1.9vw,20px);color:#5e4f3a;line-height:1.7">${personal.bio}</p>
        <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:36px">
          <a href="#quest-log" data-go="quest-log" data-btn-primary style="font-family:'Cinzel',serif;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;color:#f4ecda;background:#8f6f33;padding:14px 28px;border-radius:2px;box-shadow:0 12px 26px -14px rgba(60,42,20,.7);transition:transform .25s ease">Enter the Quest Log</a>
          <a href="#gathering" data-go="gathering" data-btn-outline style="font-family:'Cinzel',serif;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;color:#3b3024;border:1.5px solid #8f6f33;padding:14px 28px;border-radius:2px;transition:background .25s ease,color .25s ease">Make Contact</a>
        </div>
      </div>
      <div data-hero-art style="position:relative;height:clamp(380px,62vh,560px)">
        <div aria-hidden="true" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(420px,82%);aspect-ratio:1;border:1.5px solid #8f6f33;border-radius:50%;opacity:.3"></div>
        <div aria-hidden="true" style="position:absolute;top:6%;right:8%;width:118px;opacity:.4"><svg viewBox="0 0 120 120" fill="none" stroke="#8f6f33" stroke-width="2.4" stroke-linecap="round" style="width:100%;height:auto;display:block"><circle cx="60" cy="60" r="20"/><path d="M86 60 H99 M60 86 V99 M21 60 H34 M60 21 V34 M78 78 L87 87 M42 78 L33 87 M42 42 L33 33 M78 42 L87 33"/></svg></div>
        <div aria-hidden="true" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);height:96%;opacity:.6;filter:drop-shadow(0 14px 24px rgba(60,42,20,.18))"><svg viewBox="0 0 120 175" fill="none" stroke="#8f6f33" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" style="height:100%;width:auto;display:block"><path d="M44 14 H76 L72 26 H48 Z"/><path d="M48 26 C40 42 30 46 30 80 C30 110 42 140 60 152 C78 140 90 110 90 80 C90 46 80 42 72 26"/><path d="M48 32 C30 34 27 58 44 62"/><path d="M72 32 C90 34 93 58 76 62"/><path d="M52 152 L50 162 M68 152 L70 162 M46 162 H74"/><path d="M40 72 H80 M42 88 H78" opacity="0.5"/></svg></div>
      </div>
    </div>
    <a href="#quest-log" data-go="quest-log" aria-label="Scroll to begin" style="position:absolute;bottom:28px;left:clamp(20px,5vw,48px);z-index:2;display:flex;align-items:center;gap:12px;text-decoration:none;color:#8f6f33;animation:ruinFloat 3.4s ease-in-out infinite">
      <span style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.34em;text-transform:uppercase">Begin Your Journey</span>
      <span style="font-size:18px;line-height:1">⌄</span>
    </a>
  </section>

  <!-- ========== QUEST LOG ========== -->
  <section id="quest-log" data-section style="position:relative;padding:clamp(80px,12vh,150px) clamp(20px,5vw,48px);background:#ece2cf;overflow:hidden">
    <div style="max-width:1180px;margin:0 auto;position:relative;z-index:1">
      <div data-reveal style="margin-bottom:56px">
        <p style="font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.34em;text-transform:uppercase;color:#8f6f33;margin:0 0 12px">II · The Quest Log</p>
        <h2 style="font-family:'Cinzel',serif;font-weight:800;font-size:clamp(34px,5.5vw,64px);line-height:1.02;margin:0;color:#352b20;text-shadow:0 1px 0 rgba(255,252,244,.5)">Completed Campaigns</h2>
        <p style="max-width:620px;margin:16px 0 0;font-size:17px;color:#5e4f3a">Each tablet records a finished undertaking — the problem faced, the tools wielded, and what was left standing.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:28px">
        ${projects.map((p, i) => `
        <article data-card data-reveal style="position:relative;background:#f3ead8;border:1px solid rgba(90,70,45,.2);border-radius:3px;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 20px 40px -26px rgba(60,42,20,.55),0 2px 6px rgba(60,42,20,.1);transition:transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .35s ease">
          <div style="position:relative;aspect-ratio:16/10;overflow:hidden;display:grid;place-items:center;background:repeating-linear-gradient(135deg,#dccbab 0 14px,#d2c09e 14px 28px);border-bottom:1px solid rgba(90,70,45,.16)">
            <span style="position:absolute;top:14px;left:14px;font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:0.18em;color:#f4ecda;background:rgba(53,43,32,.82);padding:6px 11px;border-radius:2px">QUEST ${String(i + 1).padStart(2, '0')}</span>
            ${p.featured ? `<span title="Featured" style="position:absolute;top:12px;right:12px;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#dcbb66,#8f6f33);color:#2f2517;font-size:15px;box-shadow:0 3px 8px rgba(60,42,20,.4),inset 0 1px 0 rgba(255,255,255,.4)">★</span>` : ''}
            <span style="font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(70,52,28,.6)">[ project shot ]</span>
          </div>
          <div style="padding:22px 22px 24px">
            <h3 style="font-family:'Cinzel',serif;font-weight:700;font-size:21px;letter-spacing:0.02em;margin:0 0 4px;color:#352b20">${p.title}</h3>
            <p style="margin:0 0 16px;font-size:14.5px;color:#6a5a42;line-height:1.6">${p.desc}</p>
            <div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:18px">
              ${p.tags.map(t => `<span style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.04em;color:#5e4f3a;background:rgba(109,84,54,.1);border:1px solid rgba(109,84,54,.2);padding:4px 9px;border-radius:2px">${t}</span>`).join('')}
            </div>
            <div style="display:flex;gap:18px;border-top:1px solid rgba(90,70,45,.16);padding-top:14px">
              <a href="${p.demo || p.github || '#'}" target="_blank" rel="noopener noreferrer" data-link style="font-family:'Cinzel',serif;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8f6f33;text-decoration:none">View Relic ↗</a>
              ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" data-link style="font-family:'Cinzel',serif;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7a6a52;text-decoration:none">Inscriptions</a>` : ''}
            </div>
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <!-- ========== ARMORY ========== -->
  <section id="armory" data-section style="position:relative;padding:clamp(80px,12vh,150px) clamp(20px,5vw,48px);background:#e4d6bc;overflow:hidden">
    <div style="max-width:1180px;margin:0 auto;position:relative;z-index:1">
      <div data-reveal style="margin-bottom:56px">
        <p style="font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.34em;text-transform:uppercase;color:#8f6f33;margin:0 0 12px">III · The Armory</p>
        <h2 style="font-family:'Cinzel',serif;font-weight:800;font-size:clamp(34px,5.5vw,64px);line-height:1.02;margin:0;color:#352b20;text-shadow:0 1px 0 rgba(255,252,244,.5)">Tools of the Trade</h2>
        <p style="max-width:620px;margin:16px 0 0;font-size:17px;color:#5e4f3a">The inventory carried into every campaign — sharpened through use, each marked by its honed edge.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(248px,1fr));gap:22px">
        ${skillsData.map(cat => `
        <div style="background:#f3ead8;border:1px solid rgba(90,70,45,.2);border-radius:3px;padding:24px 22px 26px;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 18px 36px -26px rgba(60,42,20,.5)">
          <h3 style="font-family:'Cinzel',serif;font-weight:700;font-size:16px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 4px;color:#352b20">${cat.name}</h3>
          <div style="width:34px;height:2px;background:#8f6f33;margin-bottom:20px"></div>
          <div style="display:flex;flex-direction:column;gap:16px">
            ${cat.items.map(s => `
            <div>
              <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
                <span style="font-size:14px;font-weight:600;color:#46392a">${s.n}</span>
                <span style="font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#8a7757">${s.label}</span>
              </div>
              <div style="height:7px;border-radius:2px;background:rgba(90,70,45,.16);overflow:hidden;box-shadow:inset 0 1px 2px rgba(60,42,20,.2)">
                <div style="height:100%;width:${s.pct};border-radius:2px;background:linear-gradient(90deg,#8f6f33,#bd9a52);box-shadow:0 0 6px -1px #bd9a52"></div>
              </div>
            </div>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ========== JOURNEY ========== -->
  <section id="journey" data-section style="position:relative;padding:clamp(80px,12vh,150px) clamp(20px,5vw,48px);background:#ece2cf;overflow:hidden">
    <div style="max-width:1020px;margin:0 auto;position:relative;z-index:1">
      <div data-reveal style="margin-bottom:42px">
        <p style="font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.34em;text-transform:uppercase;color:#8f6f33;margin:0 0 12px">IV · The Journey</p>
        <h2 style="font-family:'Cinzel',serif;font-weight:800;font-size:clamp(34px,5.5vw,64px);line-height:1.02;margin:0;color:#352b20;text-shadow:0 1px 0 rgba(255,252,244,.5)">The Excavation</h2>
        <p style="max-width:620px;margin:16px 0 0;font-size:17px;color:#5e4f3a">A cross-section of the career, read like a dig site — the present lies at the surface; descend through the strata to reach where it began.</p>
      </div>
      <div style="position:relative;border:1px solid rgba(90,70,45,.28);border-radius:4px;overflow:hidden;box-shadow:0 30px 60px -34px rgba(60,42,20,.6),inset 0 1px 0 rgba(255,255,255,.4)">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px clamp(16px,3vw,28px);background:repeating-linear-gradient(90deg,#9b7d4e 0 6px,#8c6f43 6px 12px);color:#f4ecda">
          <span style="font-family:'Cinzel',serif;font-size:12px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase">Surface · Present Day</span>
          <span style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.1em;opacity:.85">GRID N-04 · ELEV 0.0m</span>
        </div>
        ${timeline.map(job => `
        <div style="position:relative;display:flex;align-items:stretch;gap:clamp(14px,3vw,30px);padding:clamp(22px,3vw,34px) clamp(16px,3vw,30px);background:${job.tone};border-top:2px dashed rgba(90,70,45,.32)">
          <div style="flex:none;width:clamp(74px,9vw,104px);display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center">
            <span style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.06em;color:#6a5a42">${job.depth}</span>
            <div style="width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 36% 30%,#dcbb66,#8f6f33);color:#2f2517;font-family:'Cinzel',serif;font-weight:800;font-size:17px;box-shadow:0 5px 12px -4px rgba(60,42,20,.6),inset 0 1px 0 rgba(255,255,255,.45),inset 0 0 0 3px rgba(60,42,20,.18)">${job.stratum}</div>
            <span style="font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:0.18em;text-transform:uppercase;color:#7a6a52">Stratum</span>
          </div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px">
              <h3 style="font-family:'Cinzel',serif;font-weight:700;font-size:clamp(18px,2.4vw,23px);margin:0;color:#352b20">${job.role}</h3>
              <span style="font-family:ui-monospace,Menlo,monospace;font-size:12px;letter-spacing:0.06em;color:#8f6f33">${job.dates}</span>
            </div>
            <p style="margin:3px 0 12px;font-size:14px;font-weight:700;letter-spacing:0.02em;color:#7a6a52;text-transform:uppercase">${job.company}</p>
            <p style="margin:0;font-size:14.5px;color:#5e4f3a;line-height:1.65;max-width:640px">${job.detail}</p>
            <p style="margin:12px 0 0;font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.04em;color:#8a7757">▣ recovered find · ${job.find}</p>
          </div>
        </div>`).join('')}
        <div style="position:relative;height:96px;background:repeating-linear-gradient(135deg,#b89a6a 0 16px,#ad8f5f 16px 32px);border-top:2px dashed rgba(90,70,45,.32);overflow:hidden">
          <span style="position:absolute;left:clamp(16px,3vw,30px);top:14px;font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#3b3024;opacity:.7">Bedrock · Where it began</span>
          <div aria-hidden="true" style="position:absolute;right:6%;bottom:-44px;width:96px;opacity:.5"><svg viewBox="0 0 120 175" fill="none" stroke="#3b3024" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" style="width:100%;height:auto;display:block"><path d="M44 14 H76 L72 26 H48 Z"/><path d="M48 26 C40 42 30 46 30 80 C30 110 42 140 60 152 C78 140 90 110 90 80 C90 46 80 42 72 26"/><path d="M48 32 C30 34 27 58 44 62"/><path d="M72 32 C90 34 93 58 76 62"/></svg></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== ELYSIUM ========== -->
  <section id="elysium" data-section style="position:relative;padding:clamp(80px,12vh,150px) clamp(20px,5vw,48px);background:#e4d6bc;overflow:hidden">
    <div style="max-width:1180px;margin:0 auto;position:relative;z-index:1">
      <div data-reveal style="margin-bottom:48px">
        <p style="font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.34em;text-transform:uppercase;color:#8f6f33;margin:0 0 12px">V · Elysium</p>
        <h2 style="font-family:'Cinzel',serif;font-weight:800;font-size:clamp(34px,5.5vw,64px);line-height:1.02;margin:0;color:#352b20;text-shadow:0 1px 0 rgba(255,252,244,.5)">Beyond the Work</h2>
        <p style="max-width:620px;margin:16px 0 0;font-size:17px;color:#5e4f3a">Set a relic on the platter, drop the needle, and let it spin — the fields where the mind wanders when the tools are set down.</p>
      </div>
      <div data-elysium-grid style="display:grid;grid-template-columns:2fr 1fr;gap:24px;align-items:start">
        <!-- Turntable -->
        <div style="background:#f3ead8;border:1px solid rgba(90,70,45,.2);border-radius:4px;padding:clamp(18px,3vw,28px);box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 20px 40px -26px rgba(60,42,20,.5)">
          <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:20px">
            <h3 style="font-family:'Cinzel',serif;font-weight:700;font-size:15px;letter-spacing:0.14em;text-transform:uppercase;margin:0;color:#352b20">The Gramophonum</h3>
            <span style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.08em;color:#8a7757">33⅓ rpm</span>
          </div>
          <div style="position:relative;display:flex;flex-wrap:wrap;gap:clamp(18px,3vw,32px);align-items:center;padding:clamp(20px,3vw,30px);border-radius:4px;background:repeating-linear-gradient(90deg,#3a2f22 0 7px,#352a1e 7px 14px);box-shadow:inset 0 2px 10px rgba(0,0,0,.45),inset 0 0 0 2px rgba(200,164,92,.18)">
            <div style="position:relative;width:clamp(220px,30vw,272px);aspect-ratio:1;flex:none">
              <div style="position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 50% 50%,#2a2118 0 22%,#211a12 22%),repeating-radial-gradient(circle at 50% 50%,rgba(255,255,255,.05) 0 1px,rgba(0,0,0,0) 1px 4px);box-shadow:inset 0 0 30px rgba(0,0,0,.6),0 6px 16px rgba(0,0,0,.4)">
                <div data-disc style="display:none;position:absolute;inset:5%;border-radius:50%;background:radial-gradient(circle at 50% 50%,rgba(0,0,0,0) 0 26%,#0c0c0e 26%),repeating-radial-gradient(circle at 50% 50%,#0c0c0e 0 1px,#1a1a1e 1px 3px);box-shadow:0 8px 20px rgba(0,0,0,.5);animation:vinylSpin 1.9s linear infinite;animation-play-state:paused">
                  <div data-label style="position:absolute;inset:30%;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6px;box-shadow:inset 0 0 0 2px rgba(255,255,255,.18)">
                    <span data-label-title style="font-family:'Cinzel',serif;font-size:11px;font-weight:700;line-height:1.15;color:#f4ecda;letter-spacing:0.02em"></span>
                    <span data-label-artist style="font-family:ui-monospace,Menlo,monospace;font-size:8px;letter-spacing:0.06em;color:rgba(244,236,218,.75);margin-top:3px"></span>
                  </div>
                </div>
                <div data-empty-platter style="position:absolute;inset:0;display:grid;place-items:center;text-align:center">
                  <span style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(220,187,102,.7);max-width:60%">Place a relic from the crate</span>
                </div>
                <div style="position:absolute;top:50%;left:50%;width:9px;height:9px;border-radius:50%;transform:translate(-50%,-50%);background:#c8a45c;box-shadow:0 0 0 2px rgba(0,0,0,.4);z-index:3"></div>
              </div>
              <div aria-hidden="true" style="position:absolute;top:-4px;right:-2px;width:38px;height:38px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#d8b86a,#8f6f33);box-shadow:0 4px 10px -3px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.4);z-index:4">
                <div data-tonearm style="position:absolute;top:17px;left:17px;width:150px;height:7px;border-radius:4px;background:linear-gradient(180deg,#caa863,#8f6f33);transform-origin:3px 3px;transform:rotate(116deg);transition:transform .9s cubic-bezier(.34,.8,.3,1);box-shadow:0 3px 8px -3px rgba(0,0,0,.6)">
                  <div style="position:absolute;right:-6px;bottom:-5px;width:16px;height:15px;border-radius:3px;background:#7a5a2e;box-shadow:0 2px 5px rgba(0,0,0,.5)"></div>
                </div>
              </div>
            </div>
            <div style="flex:1;min-width:190px;display:flex;flex-direction:column;gap:16px">
              <div style="background:rgba(20,16,11,.55);border:1px solid rgba(200,164,92,.25);border-radius:3px;padding:14px 16px">
                <p data-status style="margin:0 0 4px;font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#dcbb66">Empty Platter</p>
                <p data-current-title style="margin:0;font-family:'Cinzel',serif;font-weight:700;font-size:18px;color:#f4ecda">No Relic Loaded</p>
                <p data-current-artist style="margin:2px 0 0;font-size:12.5px;color:rgba(244,236,218,.72)">Select from the crate below</p>
              </div>
              <div style="display:flex;align-items:center;gap:12px">
                <button data-play-btn style="width:52px;height:52px;border-radius:50%;border:none;cursor:pointer;background:radial-gradient(circle at 38% 32%,#dcbb66,#8f6f33);color:#2f2517;font-size:16px;display:grid;place-items:center;box-shadow:0 6px 14px -5px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.4)">▶</button>
                <button data-eject-btn style="height:40px;padding:0 16px;border-radius:3px;border:1.5px solid rgba(200,164,92,.5);background:transparent;color:#dcbb66;font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;cursor:pointer">Eject ⏏</button>
              </div>
            </div>
          </div>
          <p style="margin:22px 0 12px;font-family:'Cinzel',serif;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#7a6a52">The Crate — pick a relic</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(86px,1fr));gap:12px">
            ${albums.map((al, i) => `
            <button data-album-card data-album-idx="${i}" title="${al.title}" style="display:block;border:none;background:transparent;padding:0;cursor:pointer;text-align:left">
              <div data-album-inner style="position:relative;aspect-ratio:1;border-radius:2px;overflow:hidden;border:1px solid rgba(90,70,45,.2);box-shadow:inset 0 1px 0 rgba(255,255,255,.4);transition:transform .25s ease,box-shadow .25s ease">
                <img src="${al.cover}" alt="${al.title}" style="width:100%;height:100%;object-fit:cover;display:block" loading="lazy">
              </div>
              <p style="margin:7px 0 0;font-size:11.5px;font-weight:600;color:#46392a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${al.title}</p>
            </button>`).join('')}
          </div>
        </div>
        <!-- Sidebar -->
        <div style="display:flex;flex-direction:column;gap:24px">
          <div style="background:#f3ead8;border:1px solid rgba(90,70,45,.2);border-radius:3px;padding:24px;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 18px 36px -26px rgba(60,42,20,.5)">
            <h3 style="font-family:'Cinzel',serif;font-weight:700;font-size:15px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 16px;color:#352b20">Sacred Reels</h3>
            <div style="display:flex;flex-direction:column;gap:12px">
              ${movies.map(m => `<div style="display:flex;align-items:center;gap:12px"><span style="width:8px;height:8px;flex:none;border-radius:1px;background:#8f6f33;transform:rotate(45deg)"></span><span style="font-size:14px;color:#46392a;font-weight:600">${m}</span></div>`).join('')}
            </div>
          </div>
          <div style="background:#f3ead8;border:1px solid rgba(90,70,45,.2);border-radius:3px;padding:24px;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 18px 36px -26px rgba(60,42,20,.5)">
            <h3 style="font-family:'Cinzel',serif;font-weight:700;font-size:15px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 16px;color:#352b20">Philosophies</h3>
            <div style="display:flex;flex-direction:column;gap:14px">
              ${philosophies.map(p => `<div><p style="margin:0 0 2px;font-family:'Cinzel',serif;font-size:14px;font-weight:600;color:#352b20">${p.title}</p><p style="margin:0;font-size:13px;color:#7a6a52;line-height:1.5">${p.note}</p></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== GATHERING ========== -->
  <section id="gathering" data-section style="position:relative;padding:clamp(80px,12vh,150px) clamp(20px,5vw,48px) 0;background:#ece2cf;overflow:hidden">
    <div data-reveal style="max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1;padding-bottom:clamp(80px,12vh,140px)">
      <p style="font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.34em;text-transform:uppercase;color:#8f6f33;margin:0 0 12px">VI · The Gathering</p>
      <h2 style="font-family:'Cinzel',serif;font-weight:800;font-size:clamp(36px,6vw,72px);line-height:1.02;margin:0;color:#352b20;text-shadow:0 2px 0 rgba(255,252,244,.55),0 -1px 1px rgba(60,40,20,.25)">Meet at the Forum</h2>
      <p style="max-width:540px;margin:18px auto 38px;font-size:17px;color:#5e4f3a">Whether you are raising something new or restoring what stands — send word. The gates are open.</p>
      <a href="mailto:${personal.email}" style="display:inline-block;font-family:'Cinzel',serif;font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;color:#f4ecda;background:#8f6f33;padding:16px 34px;border-radius:2px;box-shadow:0 16px 30px -16px rgba(60,42,20,.7);transition:transform .25s ease">Send a Message</a>
      <div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:40px">
        ${contacts.map(c => `<a href="${c.href}" target="_blank" rel="noopener noreferrer" data-contact-card style="display:flex;flex-direction:column;align-items:flex-start;gap:3px;min-width:150px;text-decoration:none;background:#f3ead8;border:1px solid rgba(90,70,45,.2);border-radius:3px;padding:14px 18px;box-shadow:inset 0 1px 0 rgba(255,255,255,.55);transition:transform .25s ease"><span style="font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#8f6f33">${c.label}</span><span style="font-size:14px;font-weight:600;color:#46392a">${c.value}</span></a>`).join('')}
      </div>
    </div>
    <footer style="border-top:1px solid rgba(90,70,45,.2);padding:26px clamp(20px,5vw,48px);text-align:center;position:relative;z-index:1">
      <p style="margin:0;font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#7a6a52">Shlok Vaishnav · Built to Endure · MMXXVI</p>
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

render()
