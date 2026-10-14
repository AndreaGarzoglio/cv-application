import { FaPlus } from 'react-icons/fa6'
import EditorSection from '../EditorSection.jsx'
import ItemActions from '../../ui/ItemActions.jsx'
import LevelPicker from '../../ui/LevelPicker.jsx'
import { LANGUAGE_LEVELS } from '../../../data/levels.js'
import { rowProps, uid } from '../../../utils/list.js'

function LanguagesSection({ languages, onChange, sectionProps }) {
  const add = () => onChange([...languages, { id: uid(), name: '', level: 3, note: '' }])

  return (
    <EditorSection {...sectionProps}>
      {languages.length > 0 && (
        <ul className="item-list">
          {languages.map((language, i) => {
            const { onChange: set, ...actions } = rowProps(languages, i, onChange)
            return (
              <li key={language.id} className="item-row mini-card">
                <div className="item-row__line">
                  <input
                    className="input"
                    aria-label="Language"
                    placeholder="Language"
                    value={language.name}
                    autoFocus={!language.name}
                    onChange={(e) => set({ name: e.target.value })}
                  />
                  <input
                    className="input"
                    aria-label="Certificate or note"
                    placeholder="Certificate (optional)"
                    value={language.note}
                    onChange={(e) => set({ note: e.target.value })}
                  />
                </div>
                <div className="item-row__line">
                  <LevelPicker
                    labels={LANGUAGE_LEVELS}
                    value={language.level}
                    onChange={(level) => set({ level })}
                  />
                  <ItemActions {...actions} />
                </div>
              </li>
            )
          })}
        </ul>
      )}
      <button type="button" className="btn btn--dashed" onClick={add}>
        <FaPlus size={11} /> Add language
      </button>
    </EditorSection>
  )
}

export default LanguagesSection
