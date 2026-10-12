// Optional extras for the project list: a text filter, topic filters, and "/" to search.
// The page works without this file.
(() => {
  const list = document.querySelector('.projects')
  const box = document.getElementById('q')
  const bar = document.querySelector('.filters')
  if (!list || !box || !bar) return

  bar.hidden = false
  const items = [...list.querySelectorAll('.project')]
  const tags = [...list.querySelectorAll('.tag')]
  let topic = ''

  const apply = () => {
    const text = box.value.trim().toLowerCase()
    for (const li of items) {
      const textOk = !text || li.dataset.search.includes(text)
      const topicOk = !topic || li.dataset.topics.split(' ').includes(topic)
      li.hidden = !(textOk && topicOk)
    }
  }
  const pick = (tag) => {
    topic = topic === tag.dataset.topic ? '' : tag.dataset.topic
    for (const t of tags) t.classList.toggle('on', t.dataset.topic === topic)
    apply()
  }

  for (const tag of tags) {
    tag.setAttribute('role', 'button')
    tag.tabIndex = 0
    tag.addEventListener('click', () => pick(tag))
    tag.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        pick(tag)
      }
    })
  }
  box.addEventListener('input', apply)
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? '')
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
      e.preventDefault()
      box.focus()
    }
  })
})()
