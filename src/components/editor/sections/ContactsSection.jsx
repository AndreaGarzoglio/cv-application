import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import EditorSection from '../EditorSection.jsx'
import PlatformMenu from '../PlatformMenu.jsx'
import ItemActions from '../../ui/ItemActions.jsx'
import { getPlatform } from '../../../data/platforms.js'
import { moveItem, removeItem, uid, updateItem } from '../../../utils/list.js'

function ContactRow({ contact, autoFocus, onChange, ...actions }) {
  const platform = getPlatform(contact.platform)
  const Icon = platform.icon

  return (
    <li className="item-row">
      <PlatformMenu
        className="item-row__menu"
        selected={contact.platform}
        onSelect={(id) => onChange({ platform: id })}
        renderTrigger={({ open, toggle }) => (
          <div className="item-row__line">
            <button
              type="button"
              className={`platform-trigger${open ? ' is-open' : ''}`}
              title={`${platform.label} – change platform`}
              onClick={toggle}
            >
              <Icon />
            </button>
            <input
              className="input"
              aria-label={platform.label}
              placeholder={platform.placeholder}
              value={contact.value}
              autoFocus={autoFocus}
              onChange={(e) => onChange({ value: e.target.value })}
            />
            <ItemActions {...actions} />
          </div>
        )}
      />
    </li>
  )
}

function ContactsSection({ contacts, onChange, sectionProps }) {
  const [lastAdded, setLastAdded] = useState(null)

  function add(platform) {
    const id = uid()
    setLastAdded(id)
    onChange([...contacts, { id, platform, value: '' }])
  }

  return (
    <EditorSection {...sectionProps}>
      {contacts.length > 0 && (
        <ul className="item-list">
          {contacts.map((contact, i) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              autoFocus={contact.id === lastAdded}
              isFirst={i === 0}
              isLast={i === contacts.length - 1}
              onChange={(patch) => onChange(updateItem(contacts, contact.id, patch))}
              onMove={(dir) => onChange(moveItem(contacts, contact.id, dir))}
              onRemove={() => onChange(removeItem(contacts, contact.id))}
            />
          ))}
        </ul>
      )}
      <PlatformMenu
        onSelect={add}
        renderTrigger={({ toggle }) => (
          <button type="button" className="btn btn--dashed" onClick={toggle}>
            <FaPlus size={11} /> Add contact
          </button>
        )}
      />
    </EditorSection>
  )
}

export default ContactsSection
