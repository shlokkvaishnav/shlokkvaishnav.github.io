// Escapes text for use in HTML text and in double-quoted attributes.
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "12 Oct 2026". Fixed format, so the same input always gives the same output.
export function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

// "Oct 2026"
export function formatMonth(iso) {
  const d = new Date(iso)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

// The number of months from `start` to `end` (both "YYYY-MM"), counted like LinkedIn counts them:
// Feb 2026 to Oct 2026 is 9 months. An open role (end is null) runs to the month of `now`.
export function monthsBetween(start, end, now) {
  const [sy, sm] = start.split('-').map(Number)
  const [ey, em] = end ? end.split('-').map(Number) : [new Date(now).getUTCFullYear(), new Date(now).getUTCMonth() + 1]
  return (ey - sy) * 12 + (em - sm) + 1
}

// 14 -> "1 yr 2 mos", 12 -> "1 yr", 6 -> "6 mos", 1 -> "1 mo"
export function formatDuration(months) {
  const years = Math.floor(months / 12)
  const rest = months % 12
  const part = (n, one, many) => `${n} ${n === 1 ? one : many}`
  return [years ? part(years, 'yr', 'yrs') : '', rest ? part(rest, 'mo', 'mos') : ''].filter(Boolean).join(' ')
}
