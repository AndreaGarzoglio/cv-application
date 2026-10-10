import ColorField from '../ui/ColorField.jsx'

const ACCENTS = [
  '#38bdf8', '#0891b2', '#10b981', '#65a30d', '#eab308', '#ea580c',
  '#e11d48', '#db2777', '#7c3aed', '#4f46e5', '#71717a', '#111827',
]

function ColorSettings({ design, onColors }) {
  const c = design.colors
  const hasSidebar = design.layout !== 'single'

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
        <ColorField label="Custom accent" value={c.accent} onChange={(accent) => onColors({ accent })} />
      </div>

      <div>
        <p className="settings-label">Page</p>
        <div className="color-grid">
          <ColorField label="Background" value={c.pageBg} onChange={(pageBg) => onColors({ pageBg })} />
          <ColorField label="Text" value={c.text} onChange={(text) => onColors({ text })} />
          <ColorField label="Headings" value={c.heading} onChange={(heading) => onColors({ heading })} />
        </div>
      </div>

      <div className={hasSidebar ? undefined : 'is-disabled'}>
        <p className="settings-label">
          Sidebar {!hasSidebar && <span>(used by two-column layouts)</span>}
        </p>
        <div className="color-grid">
          <ColorField label="Background" value={c.sidebarBg} onChange={(sidebarBg) => onColors({ sidebarBg })} />
          <ColorField label="Text" value={c.sidebarText} onChange={(sidebarText) => onColors({ sidebarText })} />
          <ColorField
            label="Headings"
            value={c.sidebarHeading}
            onChange={(sidebarHeading) => onColors({ sidebarHeading })}
          />
        </div>
      </div>
    </div>
  )
}

export default ColorSettings
