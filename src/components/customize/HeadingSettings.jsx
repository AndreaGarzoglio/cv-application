import Switch from '../ui/Switch.jsx'

const STYLES = [
  { value: 'underline', label: 'Underline' },
  { value: 'short', label: 'Short bar' },
  { value: 'dot', label: 'Dot' },
  { value: 'line', label: 'Line' },
  { value: 'bar', label: 'Side bar' },
  { value: 'filled', label: 'Filled' },
  { value: 'accent', label: 'Accent' },
  { value: 'plain', label: 'Plain' },
]

function HeadingSettings({ bind }) {
  const { value, onChange } = bind('headingStyle')
  return (
    <div className="field-stack">
      <div className="heading-grid">
        {STYLES.map((style) => (
          <button
            key={style.value}
            type="button"
            className={`heading-card cv-h--${style.value}${value === style.value ? ' is-active' : ''}`}
            onClick={() => onChange(style.value)}
          >
            <span className="cv-section__title">
              <span>{style.label}</span>
            </span>
          </button>
        ))}
      </div>
      <Switch label="Section icons" {...bind('showSectionIcons')} />
      <Switch label="Uppercase headings" {...bind('headingUppercase')} />
    </div>
  )
}

export default HeadingSettings
