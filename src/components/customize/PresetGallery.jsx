import { useState } from 'react'
import { FaCheck, FaFloppyDisk, FaTrash } from 'react-icons/fa6'
import { BUILT_IN_PRESETS, matchesPreset, pickPresetDesign } from '../../data/presets.js'
import { uid } from '../../utils/list.js'

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

function PresetCard({ preset, isActive, onApply, onDelete }) {
  return (
    <div className={`preset-card${isActive ? ' is-active' : ''}`}>
      <button type="button" className="preset-card__button" onClick={() => onApply(preset)}>
        <PresetThumb design={preset.design} />
        <span className="preset-card__name">
          {isActive && <FaCheck size={10} />}
          <span>{preset.name}</span>
        </span>
      </button>
      {onDelete && (
        <button
          type="button"
          className="preset-card__delete"
          title={`Delete “${preset.name}”`}
          onClick={() => onDelete(preset.id)}
        >
          <FaTrash size={10} />
        </button>
      )}
    </div>
  )
}

function PresetGallery({ design, onApply, customPresets, setCustomPresets }) {
  const [name, setName] = useState('')
  const all = [...BUILT_IN_PRESETS, ...customPresets]
  const active = all.find((p) => p.id === design.presetId)
  const modified = active && !matchesPreset(design, active)

  function save(e) {
    e.preventDefault()
    const preset = {
      id: `custom-${uid()}`,
      name: name.trim() || `My preset ${customPresets.length + 1}`,
      design: pickPresetDesign(design),
    }
    setCustomPresets([...customPresets, preset])
    onApply(preset)
    setName('')
  }

  function update() {
    setCustomPresets(
      customPresets.map((p) => (p.id === active.id ? { ...p, design: pickPresetDesign(design) } : p)),
    )
  }

  return (
    <div className="field-stack">
      <div className="preset-grid">
        {BUILT_IN_PRESETS.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            isActive={preset.id === design.presetId}
            onApply={onApply}
          />
        ))}
      </div>

      {modified && (
        <p className="hint preset-modified">
          You customised <strong>{active.name}</strong>.{' '}
          {active.id.startsWith('custom-') && (
            <>
              <button type="button" className="link-btn" onClick={update}>
                Save changes
              </button>{' '}
              or{' '}
            </>
          )}
          <button type="button" className="link-btn" onClick={() => onApply(active)}>
            reset to original
          </button>
        </p>
      )}

      <div>
        <p className="settings-label">My presets</p>
        {customPresets.length > 0 ? (
          <div className="preset-grid">
            {customPresets.map((preset) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                isActive={preset.id === design.presetId}
                onApply={onApply}
                onDelete={(id) => setCustomPresets(customPresets.filter((p) => p.id !== id))}
              />
            ))}
          </div>
        ) : (
          <p className="hint">Tweak any preset, then save it here to reuse it later.</p>
        )}
      </div>

      <form className="item-row__line" onSubmit={save}>
        <input
          className="input"
          aria-label="Preset name"
          placeholder="Name your current design"
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn">
          <FaFloppyDisk size={12} /> Save
        </button>
      </form>
    </div>
  )
}

export default PresetGallery
