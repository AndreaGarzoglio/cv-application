import { useState } from 'react'

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

function normalize(hex) {
  if (hex.length === 4) return '#' + [...hex.slice(1)].map((c) => c + c).join('')
  return hex.toLowerCase()
}

function ColorField({ label, value, onChange }) {
  const [draft, setDraft] = useState(value)
  const [synced, setSynced] = useState(value)
  // Keep the text box in sync when the color changes from outside (e.g. presets).
  if (value !== synced) {
    setSynced(value)
    setDraft(value)
  }

  function handleText(e) {
    let next = e.target.value.trim()
    if (next && !next.startsWith('#')) next = `#${next}`
    setDraft(next)
    if (HEX.test(next)) onChange(normalize(next))
  }

  return (
    <div className="color-field">
      <label className="color-field__swatch" style={{ background: value }}>
        <input
          type="color"
          value={value}
          aria-label={label}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      <div className="color-field__text">
        <span className="color-field__label">{label}</span>
        <input
          className="color-field__hex"
          value={draft}
          spellCheck={false}
          aria-label={`${label} hex value`}
          onChange={handleText}
          onBlur={() => setDraft(value)}
        />
      </div>
    </div>
  )
}

export default ColorField
