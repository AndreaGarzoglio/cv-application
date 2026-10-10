import { getStrings } from '../data/locales.js'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// value is "YYYY-MM" (from <input type="month">) or "YYYY".
export function formatMonth(value, format, lang) {
  if (!value) return ''
  const [year, month] = value.split('-').map(Number)
  if (!year) return ''
  if (format === 'year' || !month) return String(year)
  if (format === 'numeric') return `${String(month).padStart(2, '0')}/${year}`
  const date = new Date(year, month - 1, 1)
  const text = new Intl.DateTimeFormat(lang, {
    month: format === 'long' ? 'long' : 'short',
    year: 'numeric',
  }).format(date)
  return capitalize(text)
}

export function formatRange({ startDate, endDate, current }, format, lang) {
  const start = formatMonth(startDate, format, lang)
  const end = current ? getStrings(lang).present : formatMonth(endDate, format, lang)
  if (start && end) return start === end ? start : `${start} – ${end}`
  return start || end
}
