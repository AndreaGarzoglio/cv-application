import { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { PLATFORM_GROUPS } from '../../data/platforms.js'
import { useMenu } from '../../hooks/useMenu.js'
import '../../styles/PlatformMenu.css'

function PlatformPicker({ selected, onSelect }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const groups = PLATFORM_GROUPS.map((group) => ({
    name: group.name,
    entries: Object.entries(group.platforms).filter(([, p]) => p.label.toLowerCase().includes(q)),
  })).filter((group) => group.entries.length > 0)

  return (
    <div className="platform-picker">
      <label className="platform-picker__search">
        <FaMagnifyingGlass size={12} />
        <input
          autoFocus
          placeholder="Search platforms…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="platform-picker__list">
        {groups.map((group) => (
          <div key={group.name}>
            <p className="platform-picker__group">{group.name}</p>
            <div className="platform-picker__grid">
              {group.entries.map(([id, platform]) => {
                const Icon = platform.icon
                return (
                  <button
                    key={id}
                    type="button"
                    className={`platform-tile${id === selected ? ' is-selected' : ''}`}
                    onClick={() => onSelect(id)}
                  >
                    <Icon />
                    <span>{platform.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        {groups.length === 0 && <p className="platform-picker__empty">No platforms found.</p>}
      </div>
    </div>
  )
}

function PlatformMenu({ selected, onSelect, renderTrigger }) {
  const { open, setOpen, ref } = useMenu()

  return (
    <div ref={ref}>
      {renderTrigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <PlatformPicker
          selected={selected}
          onSelect={(id) => {
            onSelect(id)
            setOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default PlatformMenu
