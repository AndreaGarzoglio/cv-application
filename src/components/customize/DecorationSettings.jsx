import Segmented from '../ui/Segmented.jsx'
import Switch from '../ui/Switch.jsx'

const DECORATIONS = [
  { value: 'none', label: 'None' },
  { value: 'orbs', label: 'Glow' },
  { value: 'corner', label: 'Circles' },
  { value: 'dots', label: 'Dots' },
  { value: 'wave', label: 'Wave' },
  { value: 'diagonal', label: 'Diagonal' },
]

function DecorationSettings({ design, bind }) {
  const c = design.colors
  return (
    <div className="field-stack">
      <div>
        <p className="settings-label">Background shapes</p>
        <Segmented
          label="Background shapes"
          className="shape-grid"
          optionClass="option-card"
          options={DECORATIONS}
          {...bind('decoration')}
          renderOption={(decor) => (
            <>
              {/* A real page with the real decoration, zoomed down to a thumbnail. */}
              <span
                className="decor-thumb"
                style={{ '--cv-accent': c.accent, '--cv-accent-2': c.accent2, background: c.pageBg }}
              >
                {decor.value !== 'none' && <span className={`cv-decor cv-decor--${decor.value}`} />}
              </span>
              {decor.label}
            </>
          )}
        />
      </div>
      <Switch label="Gradient name" {...bind('nameGradient')} />
    </div>
  )
}

export default DecorationSettings
