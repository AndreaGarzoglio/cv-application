import { useState } from 'react'
import { FaPlus, FaXmark } from 'react-icons/fa6'
import EditorSection from '../EditorSection.jsx'
import { removeItem, uid } from '../../../utils/list.js'

function InterestsSection({ interests, onChange, sectionProps }) {
  const [draft, setDraft] = useState('')

  function add(e) {
    e.preventDefault()
    const names = draft
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean)
    if (names.length === 0) return
    onChange([...interests, ...names.map((name) => ({ id: uid(), name }))])
    setDraft('')
  }

  return (
    <EditorSection {...sectionProps}>
      {interests.length > 0 && (
        <ul className="chip-list">
          {interests.map((interest) => (
            <li key={interest.id} className="chip">
              {interest.name}
              <button
                type="button"
                aria-label={`Remove ${interest.name}`}
                onClick={() => onChange(removeItem(interests, interest.id))}
              >
                <FaXmark size={11} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <form className="item-row__line" onSubmit={add}>
        <input
          className="input"
          aria-label="New interest"
          placeholder="Type an interest and press Enter"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className="btn" disabled={!draft.trim()}>
          <FaPlus size={11} /> Add
        </button>
      </form>
      <p className="hint">Tip: separate multiple interests with commas.</p>
    </EditorSection>
  )
}

export default InterestsSection
