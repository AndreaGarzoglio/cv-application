import Switch from '../ui/Switch.jsx'

const DECORATIONS = [
  { value: 'none', label: 'None' },
  { value: 'orbs', label: 'Glow' },
  { value: 'corner', label: 'Circles' },
  { value: 'dots', label: 'Dots' },
  { value: 'wave', label: 'Wave' },
  { value: 'diagonal', label: 'Diagonal' },
]

function DecorationSettings({ design, set }) {
  const c = design.colors
  return (
    <div className="field-stack">
      <div>
        <p className="settings-label">Background shapes</p>
        <div className="shape-grid" role="radiogroup" aria-label="Background shapes">
          {DECORATIONS.map((decor) => (
            <button
              key={decor.value}
              type="button"
              role="radio"
              aria-checked={design.decoration === decor.value}
              className={`option-card${design.decoration === decor.value ? ' is-active' : ''}`}
              onClick={() => set({ decoration: decor.value })}
            >
              {/* A real page with the real decoration, zoomed down to a thumbnail. */}
              <span
                className="decor-thumb"
                style={{ '--cv-accent': c.accent, '--cv-accent-2': c.accent2, background: c.pageBg }}
              >
                {decor.value !== 'none' && <span className={`cv-decor cv-decor--${decor.value}`} />}
              </span>
              {decor.label}
            </button>
          ))}
        </div>
      </div>
      <Switch
        label="Gradient name"
        checked={design.nameGradient}
        onChange={(nameGradient) => set({ nameGradient })}
      />
    </div>
  )
}

export default DecorationSettings
