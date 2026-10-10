import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp } from 'react-icons/fa6'
import { sectionTitle } from '../../data/sampleResume.js'

const COLUMNS = [
  { id: 'sidebar', label: 'Sidebar' },
  { id: 'main', label: 'Main' },
]

function move(list, index, dir) {
  const next = [...list]
  ;[next[index], next[index + dir]] = [next[index + dir], next[index]]
  return next
}

function SectionOrder({ sections, titles, layout, onChange }) {
  function reorder(column, index, dir) {
    onChange({ ...sections, [column]: move(sections[column], index, dir) })
  }

  function switchColumn(column, key) {
    const other = column === 'sidebar' ? 'main' : 'sidebar'
    onChange({
      [column]: sections[column].filter((k) => k !== key),
      [other]: [...sections[other], key],
    })
  }

  return (
    <div>
      <p className="settings-label">Section order</p>
      <div className={`section-order section-order--${layout}`}>
        {COLUMNS.map((column) => (
          <div key={column.id} className="section-order__column">
            <p className="section-order__title">{column.label}</p>
            <ul>
              {sections[column.id].map((key, i, list) => (
                <li key={key} className="section-order__item">
                  <span>{sectionTitle(titles, key)}</span>
                  <button
                    type="button"
                    className="icon-btn"
                    title="Move up"
                    disabled={i === 0}
                    onClick={() => reorder(column.id, i, -1)}
                  >
                    <FaArrowUp size={10} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    title="Move down"
                    disabled={i === list.length - 1}
                    onClick={() => reorder(column.id, i, 1)}
                  >
                    <FaArrowDown size={10} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    title={`Move to ${column.id === 'sidebar' ? 'main' : 'sidebar'} column`}
                    onClick={() => switchColumn(column.id, key)}
                  >
                    {column.id === 'sidebar' ? <FaArrowRight size={10} /> : <FaArrowLeft size={10} />}
                  </button>
                </li>
              ))}
              {sections[column.id].length === 0 && <li className="section-order__empty">Empty</li>}
            </ul>
          </div>
        ))}
      </div>
      {layout === 'single' && (
        <p className="hint">
          One-column layout shows main sections first, then sidebar sections. Contacts always sit in
          the header.
        </p>
      )}
    </div>
  )
}

export default SectionOrder
