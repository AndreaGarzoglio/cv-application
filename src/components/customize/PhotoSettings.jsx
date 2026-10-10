import RangeField from '../ui/RangeField.jsx'
import Switch from '../ui/Switch.jsx'

const SHAPES = [
  { value: 'circle', label: 'Circle' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
  { value: 'hexagon', label: 'Hexagon' },
  { value: 'blob', label: 'Blob' },
  { value: 'arch', label: 'Arch' },
]

function PhotoSettings({ design, set, hasPhoto }) {
  return (
    <div className="field-stack">
      <Switch label="Show photo" checked={design.showPhoto} onChange={(showPhoto) => set({ showPhoto })} />
      <div className={design.showPhoto ? undefined : 'is-disabled'}>
        <p className="settings-label">Shape</p>
        <div className="shape-grid" role="radiogroup" aria-label="Photo shape">
          {SHAPES.map((shape) => (
            <button
              key={shape.value}
              type="button"
              role="radio"
              aria-checked={design.photoShape === shape.value}
              className={`option-card${design.photoShape === shape.value ? ' is-active' : ''}`}
              onClick={() => set({ photoShape: shape.value })}
            >
              <span className={`shape-preview cv-photo--${shape.value}`} />
              {shape.label}
            </button>
          ))}
        </div>
      </div>
      <Switch
        label="Gradient ring"
        checked={design.photoRing}
        onChange={(photoRing) => set({ photoRing })}
      />
      <RangeField
        label="Size"
        min={72}
        max={180}
        step={4}
        unit="px"
        value={design.photoSize}
        disabled={!design.showPhoto}
        onChange={(photoSize) => set({ photoSize })}
      />
      {!hasPhoto && <p className="hint">Upload a photo in Content → Personal details.</p>}
    </div>
  )
}

export default PhotoSettings
