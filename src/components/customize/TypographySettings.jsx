import Field from '../ui/Field.jsx'
import RangeField from '../ui/RangeField.jsx'
import { FONTS, fontStack } from '../../data/fonts.js'

const GROUPS = [
  { id: 'sans', label: 'Sans serif' },
  { id: 'serif', label: 'Serif' },
  { id: 'mono', label: 'Monospace' },
]

function FontSelect({ label, value, onChange }) {
  return (
    <Field
      as="select"
      label={label}
      value={value}
      style={{ fontFamily: fontStack(value) }}
      onChange={(e) => onChange(e.target.value)}
    >
      {GROUPS.map((group) => (
        <optgroup key={group.id} label={group.label}>
          {FONTS.filter((f) => f.category === group.id).map((font) => (
            <option key={font.name} value={font.name} style={{ fontFamily: fontStack(font.name) }}>
              {font.name}
            </option>
          ))}
        </optgroup>
      ))}
    </Field>
  )
}

function TypographySettings({ bind }) {
  return (
    <div className="field-stack">
      <div className="field-row">
        <FontSelect label="Headings font" {...bind('headingFont')} />
        <FontSelect label="Body font" {...bind('bodyFont')} />
      </div>
      <RangeField label="Font size" min={10} max={16} step={0.5} unit="px" {...bind('fontSize')} />
      <RangeField label="Line height" min={1.2} max={1.9} step={0.05} {...bind('lineHeight')} />
    </div>
  )
}

export default TypographySettings
