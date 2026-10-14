import RangeField from '../ui/RangeField.jsx'
import Segmented from '../ui/Segmented.jsx'
import SectionOrder from './SectionOrder.jsx'

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

function LayoutSettings({ design, bind, sectionTitles }) {
  return (
    <div className="field-stack">
      <Segmented
        label="Layout"
        className="shape-grid"
        optionClass="option-card layout-card"
        options={LAYOUTS}
        {...bind('layout')}
        renderOption={(layout) => (
          <>
            <span className={`layout-card__diagram layout-card__diagram--${layout.value}`}>
              <i />
              <b />
            </span>
            {layout.label}
          </>
        )}
      />
      <RangeField
        label="Sidebar width"
        min={24}
        max={45}
        unit="%"
        disabled={design.layout === 'single'}
        {...bind('sidebarWidth')}
      />
      <div>
        <p className="settings-label">Experience & education entries</p>
        <Segmented label="Entry layout" options={ENTRY_LAYOUTS} {...bind('entryLayout')} />
      </div>
      <SectionOrder titles={sectionTitles} layout={design.layout} {...bind('sections')} />
    </div>
  )
}

export default LayoutSettings
