import RangeField from '../ui/RangeField.jsx'
import Segmented from '../ui/Segmented.jsx'
import Switch from '../ui/Switch.jsx'

const SHAPES = [
  { value: 'circle', label: 'Circle' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
]

function PhotoSettings({ design, set, hasPhoto }) {
  return (
    <div className="field-stack">
      <Switch label="Show photo" checked={design.showPhoto} onChange={(showPhoto) => set({ showPhoto })} />
      <div className={design.showPhoto ? undefined : 'is-disabled'}>
        <p className="settings-label">Shape</p>
        <Segmented
          label="Photo shape"
          options={SHAPES}
          value={design.photoShape}
          onChange={(photoShape) => set({ photoShape })}
        />
      </div>
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
