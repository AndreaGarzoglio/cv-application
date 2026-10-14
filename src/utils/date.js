import { getStrings } from '../data/locales.js'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// value is "YYYY-MM" (from <input type="month">) or "YYYY".
export function formatMonth(value, format, lang) {
  if (!value) return ''
  const [year, month] = value.split('-').map(Number)
  if (!year) return ''
  if (format === 'year' || !month) return String(year)
  if (format === 'numeric') return `${String(month).padStart(2, '0')}/${year}`
  return capitalize(formatter(lang, format).format(new Date(year, month - 1, 1)))
}

// Creating an Intl formatter is slow, and every entry formats two dates per render.
const formatters = new Map()
function formatter(lang, format) {
  const key = `${lang}|${format}`
  if (!formatters.has(key)) {
    const month = format === 'long' ? 'long' : 'short'
    formatters.set(key, new Intl.DateTimeFormat(lang, { month, year: 'numeric' }))
  }
  return formatters.get(key)
}

export function formatRange({ startDate, endDate, current }, format, lang) {
  const start = formatMonth(startDate, format, lang)
  const end = current ? getStrings(lang).present : formatMonth(endDate, format, lang)
  if (start && end) return start === end ? start : `${start} – ${end}`
  return start || end
}
