import Field from '../ui/Field.jsx'
import Segmented from '../ui/Segmented.jsx'
import Switch from '../ui/Switch.jsx'
import { RESUME_LANGUAGES } from '../../data/locales.js'
import { formatMonth } from '../../utils/date.js'

const LEVEL_STYLES = [
  { value: 'dots', label: 'Dots' },
  { value: 'segments', label: 'Segments' },
  { value: 'bar', label: 'Bar' },
  { value: 'text', label: 'Text label' },
  { value: 'none', label: 'Name only' },
]

const SKILL_STYLES = [...LEVEL_STYLES.slice(0, 4), { value: 'tags', label: 'Tags' }, LEVEL_STYLES[4]]

const INTEREST_STYLES = [
  { value: 'tags', label: 'Tags' },
  { value: 'list', label: 'List' },
  { value: 'inline', label: 'Inline' },
]

const DATE_FORMATS = ['short', 'long', 'numeric', 'year']

function Select({ label, value, options, onChange }) {
  return (
    <Field as="select" label={label} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Field>
  )
}

function DisplaySettings({ design, set }) {
  return (
    <div className="field-stack">
      <div className="field-row">
        <Select
          label="Skills"
          value={design.skillStyle}
          options={SKILL_STYLES}
          onChange={(skillStyle) => set({ skillStyle })}
        />
        <Select
          label="Languages"
          value={design.languageStyle}
          options={LEVEL_STYLES}
          onChange={(languageStyle) => set({ languageStyle })}
        />
      </div>
      <div>
        <p className="settings-label">Interests</p>
        <Segmented
          label="Interests style"
          options={INTEREST_STYLES}
          value={design.interestStyle}
          onChange={(interestStyle) => set({ interestStyle })}
        />
      </div>
      <Switch
        label="Show contact icons"
        checked={design.showContactIcons}
        onChange={(showContactIcons) => set({ showContactIcons })}
      />
      <div>
        <p className="settings-label">Date format</p>
        <Segmented
          label="Date format"
          options={DATE_FORMATS.map((format) => ({
            value: format,
            label: formatMonth('2024-03', format, design.resumeLanguage),
          }))}
          value={design.dateFormat}
          onChange={(dateFormat) => set({ dateFormat })}
        />
      </div>
      <Select
        label="Resume language (dates, “Present”, “Grade”)"
        value={design.resumeLanguage}
        options={Object.entries(RESUME_LANGUAGES).map(([value, l]) => ({ value, label: l.label }))}
        onChange={(resumeLanguage) => set({ resumeLanguage })}
      />
    </div>
  )
}

export default DisplaySettings
