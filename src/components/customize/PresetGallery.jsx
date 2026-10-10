import { FaCheck } from 'react-icons/fa6'
import { BUILT_IN_PRESETS, matchesPreset } from '../../data/presets.js'

export function PresetThumb({ design }) {
  const c = design.colors
  return (
    <div
      className={`preset-thumb preset-thumb--${design.layout}`}
      style={{
        '--p-page': c.pageBg,
        '--p-side': c.sidebarBg,
        '--p-side-text': c.sidebarText,
        '--p-accent': c.accent,
        '--p-heading': c.heading,
        '--p-text': c.text,
      }}
    >
      <div className="preset-thumb__side">
        <span className="preset-thumb__avatar" />
        <i />
        <i />
        <i />
      </div>
      <div className="preset-thumb__main">
        <b />
        <em />
        <i />
        <i />
        <em />
        <i />
      </div>
    </div>
  )
}

function PresetGallery({ design, onApply }) {
  const active = BUILT_IN_PRESETS.find((p) => p.id === design.presetId)
  const modified = active && !matchesPreset(design, active)

  return (
    <>
      <div className="preset-grid">
        {BUILT_IN_PRESETS.map((preset) => {
          const isActive = preset.id === design.presetId
          return (
            <button
              key={preset.id}
              type="button"
              className={`preset-card${isActive ? ' is-active' : ''}`}
              onClick={() => onApply(preset)}
            >
              <PresetThumb design={preset.design} />
              <span className="preset-card__name">
                {isActive && <FaCheck size={10} />}
                {preset.name}
              </span>
            </button>
          )
        })}
      </div>
      {modified && (
        <p className="hint preset-modified">
          You customised <strong>{active.name}</strong>.{' '}
          <button type="button" className="link-btn" onClick={() => onApply(active)}>
            Reset to original
          </button>
        </p>
      )}
    </>
  )
}

export default PresetGallery
