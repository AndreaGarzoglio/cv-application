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

function TypographySettings({ design, set }) {
  return (
    <div className="field-stack">
      <div className="field-row">
        <FontSelect
          label="Headings font"
          value={design.headingFont}
          onChange={(headingFont) => set({ headingFont })}
        />
        <FontSelect label="Body font" value={design.bodyFont} onChange={(bodyFont) => set({ bodyFont })} />
      </div>
      <RangeField
        label="Font size"
        min={10}
        max={16}
        step={0.5}
        unit="px"
        value={design.fontSize}
        onChange={(fontSize) => set({ fontSize })}
      />
      <RangeField
        label="Line height"
        min={1.2}
        max={1.9}
        step={0.05}
        value={design.lineHeight}
        onChange={(lineHeight) => set({ lineHeight })}
      />
    </div>
  )
}

export default TypographySettings
