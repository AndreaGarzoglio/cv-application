import { useState } from 'react'
import { FaChevronDown, FaPlus } from 'react-icons/fa6'
import EditorSection from './EditorSection.jsx'
import ItemActions from '../ui/ItemActions.jsx'
import { formatRange } from '../../utils/date.js'
import { duplicateItem, moveItem, removeItem, uid, updateItem } from '../../utils/list.js'

function EntryCard({ entry, summary, renderFields, defaultOpen, onChange, ...actions }) {
  const [open, setOpen] = useState(defaultOpen)
  const { title, subtitle } = summary(entry)
  const dates = formatRange(entry, 'short', 'en')

  return (
    <li className={`entry-card item-row${open ? ' is-open' : ''}${entry.hidden ? ' is-hidden' : ''}`}>
      <div className="entry-card__header">
        <button
          type="button"
          className="entry-card__toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="entry-card__title">{title}</span>
          <span className="entry-card__meta">{[subtitle, dates].filter(Boolean).join(' · ')}</span>
        </button>
        <ItemActions
          {...actions}
          hidden={entry.hidden}
          onToggleHidden={() => onChange({ hidden: !entry.hidden })}
        />
        <button
          type="button"
          className="icon-btn entry-card__chevron"
          aria-label={open ? 'Collapse' : 'Expand'}
          onClick={() => setOpen((o) => !o)}
        >
          <FaChevronDown size={11} />
        </button>
      </div>
      <div className="entry-card__body" inert={!open}>
        <div className="entry-card__content">
          <div className="field-stack entry-card__fields">{renderFields(entry, onChange)}</div>
        </div>
      </div>
    </li>
  )
}

function EntriesSection({ entries, onChange, sectionProps, createEntry, summary, renderFields, addLabel }) {
  const [lastAdded, setLastAdded] = useState(null)

  function add() {
    const entry = { id: uid(), hidden: false, ...createEntry() }
    setLastAdded(entry.id)
    onChange([...entries, entry])
  }

  return (
    <EditorSection {...sectionProps}>
      {entries.length > 0 && (
        <ul className="item-list">
          {entries.map((entry, i) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              summary={summary}
              renderFields={renderFields}
              defaultOpen={entry.id === lastAdded}
              isFirst={i === 0}
              isLast={i === entries.length - 1}
              onChange={(patch) => onChange(updateItem(entries, entry.id, patch))}
              onMove={(dir) => onChange(moveItem(entries, entry.id, dir))}
              onRemove={() => onChange(removeItem(entries, entry.id))}
              onDuplicate={() => onChange(duplicateItem(entries, entry.id))}
            />
          ))}
        </ul>
      )}
      <button type="button" className="btn btn--dashed" onClick={add}>
        <FaPlus size={11} /> {addLabel}
      </button>
    </EditorSection>
  )
}

export default EntriesSection
