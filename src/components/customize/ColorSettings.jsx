import ColorField from '../ui/ColorField.jsx'

const ACCENTS = [
  '#38bdf8', '#0891b2', '#10b981', '#65a30d', '#eab308', '#ea580c',
  '#e11d48', '#db2777', '#7c3aed', '#4f46e5', '#71717a', '#111827',
]

function ColorSettings({ design, onColors }) {
  const c = design.colors
  const hasSidebar = design.layout !== 'single'
  const field = (key, label) => (
    <ColorField label={label} value={c[key]} onChange={(value) => onColors({ [key]: value })} />
  )

  return (
    <div className="field-stack">
      <div>
        <p className="settings-label">Accent</p>
        <div className="swatch-row">
          {ACCENTS.map((color) => (
            <button
              key={color}
              type="button"
              className={`swatch${c.accent === color ? ' is-active' : ''}`}
              style={{ background: color }}
              aria-label={`Accent ${color}`}
              onClick={() => onColors({ accent: color })}
            />
          ))}
        </div>
        <div className="color-grid">
          {field('accent', 'Accent')}
          {field('accent2', 'Second accent')}
        </div>
        <p className="hint">
          Gradients blend the two accents.{' '}
          {c.accent2 !== c.accent && (
            <button type="button" className="link-btn" onClick={() => onColors({ accent2: c.accent })}>
              Use one color only
            </button>
          )}
        </p>
      </div>

      <div>
        <p className="settings-label">Page</p>
        <div className="color-grid">
          {field('pageBg', 'Background')}
          {field('text', 'Text')}
          {field('heading', 'Headings')}
        </div>
      </div>

      <div className={hasSidebar ? undefined : 'is-disabled'}>
        <p className="settings-label">
          Sidebar {!hasSidebar && <span>(used by two-column layouts)</span>}
        </p>
        <div className="color-grid">
          {field('sidebarBg', 'Background')}
          {field('sidebarText', 'Text')}
          {field('sidebarHeading', 'Headings')}
        </div>
      </div>
    </div>
  )
}

export default ColorSettings
