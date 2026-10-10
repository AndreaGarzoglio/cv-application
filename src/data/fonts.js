export const FONTS = [
  { name: 'Inter', category: 'sans', weights: '400;500;600;700' },
  { name: 'Poppins', category: 'sans', weights: '400;500;600;700' },
  { name: 'Montserrat', category: 'sans', weights: '400;500;600;700' },
  { name: 'DM Sans', category: 'sans', weights: '400;500;600;700' },
  { name: 'IBM Plex Sans', category: 'sans', weights: '400;500;600;700' },
  { name: 'Work Sans', category: 'sans', weights: '400;500;600;700' },
  { name: 'Nunito', category: 'sans', weights: '400;500;600;700' },
  { name: 'Raleway', category: 'sans', weights: '400;500;600;700' },
  { name: 'Lato', category: 'sans', weights: '400;700' },
  { name: 'Open Sans', category: 'sans', weights: '400;500;600;700' },
  { name: 'Roboto', category: 'sans', weights: '400;500;700' },
  { name: 'Source Sans 3', category: 'sans', weights: '400;500;600;700' },
  { name: 'Space Grotesk', category: 'sans', weights: '400;500;600;700' },
  { name: 'Playfair Display', category: 'serif', weights: '400;500;600;700' },
  { name: 'DM Serif Display', category: 'serif', weights: null },
  { name: 'Merriweather', category: 'serif', weights: '400;700' },
  { name: 'Lora', category: 'serif', weights: '400;500;600;700' },
  { name: 'Libre Baskerville', category: 'serif', weights: '400;700' },
  { name: 'EB Garamond', category: 'serif', weights: '400;500;600;700' },
  { name: 'Source Serif 4', category: 'serif', weights: '400;500;600;700' },
  { name: 'Roboto Slab', category: 'serif', weights: '400;500;600;700' },
  { name: 'JetBrains Mono', category: 'mono', weights: '400;500;600;700' },
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
