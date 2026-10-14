// Weights loaded from Google Fonts; families not listed here load 400 to 700.
const WEIGHTS = {
  Lato: '400;700',
  Roboto: '400;500;700',
  'DM Serif Display': null,
  Merriweather: '400;700',
  'Libre Baskerville': '400;700',
}

const group = (category, names) =>
  names.map((name) => ({
    name,
    category,
    weights: name in WEIGHTS ? WEIGHTS[name] : '400;500;600;700',
  }))

// In font picker order.
export const FONTS = [
  ...group('sans', [
    'Inter', 'Poppins', 'Montserrat', 'DM Sans', 'IBM Plex Sans', 'Work Sans', 'Nunito',
    'Raleway', 'Lato', 'Open Sans', 'Roboto', 'Source Sans 3', 'Space Grotesk',
  ]),
  ...group('serif', [
    'Playfair Display', 'DM Serif Display', 'Merriweather', 'Lora', 'Libre Baskerville',
    'EB Garamond', 'Source Serif 4', 'Roboto Slab',
  ]),
  ...group('mono', ['JetBrains Mono']),
]

const FALLBACK = { sans: 'system-ui, sans-serif', serif: 'Georgia, serif', mono: 'ui-monospace, monospace' }

export function fontStack(name) {
  const font = FONTS.find((f) => f.name === name)
  return `'${name}', ${FALLBACK[font?.category ?? 'sans']}`
}

export const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?' +
  FONTS.map(
    (f) => `family=${f.name.replaceAll(' ', '+')}${f.weights ? `:wght@${f.weights}` : ''}`,
  ).join('&') +
  '&display=swap'
