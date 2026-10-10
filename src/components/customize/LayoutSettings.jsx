import RangeField from '../ui/RangeField.jsx'
import Segmented from '../ui/Segmented.jsx'

const LAYOUTS = [
  { value: 'left', label: 'Sidebar left' },
  { value: 'right', label: 'Sidebar right' },
  { value: 'single', label: 'One column' },
]

const ENTRY_LAYOUTS = [
  { value: 'split', label: 'Dates right' },
  { value: 'stacked', label: 'Stacked' },
  { value: 'timeline', label: 'Timeline' },
]

function LayoutSettings({ design, set }) {
  return (
    <div className="field-stack">
      <div className="layout-grid">
        {LAYOUTS.map((layout) => (
          <button
            key={layout.value}
            type="button"
            className={`layout-card${design.layout === layout.value ? ' is-active' : ''}`}
            onClick={() => set({ layout: layout.value })}
          >
            <span className={`layout-card__diagram layout-card__diagram--${layout.value}`}>
              <i />
              <b />
            </span>
            {layout.label}
          </button>
        ))}
      </div>
      <RangeField
        label="Sidebar width"
        min={24}
        max={45}
        unit="%"
        value={design.sidebarWidth}
        disabled={design.layout === 'single'}
        onChange={(sidebarWidth) => set({ sidebarWidth })}
      />
      <div>
        <p className="settings-label">Experience & education entries</p>
        <Segmented
          label="Entry layout"
          options={ENTRY_LAYOUTS}
          value={design.entryLayout}
          onChange={(entryLayout) => set({ entryLayout })}
        />
      </div>
    </div>
  )
}

export default LayoutSettings
