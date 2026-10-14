import RangeField from '../ui/RangeField.jsx'
import Segmented from '../ui/Segmented.jsx'
import Switch from '../ui/Switch.jsx'

const SHAPES = [
  { value: 'circle', label: 'Circle' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
  { value: 'hexagon', label: 'Hexagon' },
  { value: 'blob', label: 'Blob' },
  { value: 'arch', label: 'Arch' },
]

function PhotoSettings({ design, bind, hasPhoto }) {
  return (
    <div className="field-stack">
      <Switch label="Show photo" {...bind('showPhoto')} />
      <div className={design.showPhoto ? undefined : 'is-disabled'}>
        <p className="settings-label">Shape</p>
        <Segmented
          label="Photo shape"
          className="shape-grid"
          optionClass="option-card"
          options={SHAPES}
          {...bind('photoShape')}
          renderOption={(shape) => (
            <>
              <span className={`shape-preview cv-photo--${shape.value}`} />
              {shape.label}
            </>
          )}
        />
      </div>
      <Switch label="Gradient ring" {...bind('photoRing')} />
      <RangeField
        label="Size"
        min={72}
        max={180}
        step={4}
        unit="px"
        disabled={!design.showPhoto}
        {...bind('photoSize')}
      />
      {!hasPhoto && <p className="hint">Upload a photo in Content → Personal details.</p>}
    </div>
  )
}

export default PhotoSettings
