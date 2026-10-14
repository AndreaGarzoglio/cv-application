import { FaPlus } from 'react-icons/fa6'
import EditorSection from '../EditorSection.jsx'
import ItemActions from '../../ui/ItemActions.jsx'
import LevelPicker from '../../ui/LevelPicker.jsx'
import { SKILL_LEVELS } from '../../../data/levels.js'
import { rowProps, uid } from '../../../utils/list.js'

function SkillCategory({ category, onChange, ...actions }) {
  const { skills } = category
  const setSkills = (next) => onChange({ skills: next })
  const addSkill = () => setSkills([...skills, { id: uid(), name: '', level: 3 }])

  return (
    <li className="item-row mini-card skill-category">
      <div className="item-row__line">
        <input
          className="input skill-category__name"
          aria-label="Category name"
          placeholder="Category (e.g. Drawing)"
          value={category.name}
          autoFocus={!category.name && skills.length === 0}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <ItemActions {...actions} />
      </div>

      {skills.length > 0 && (
        <ul className="item-list skill-list">
          {skills.map((skill, i) => {
            const { onChange: set, ...actions } = rowProps(skills, i, setSkills)
            return (
              <li key={skill.id} className="item-row item-row__line">
                <input
                  className="input"
                  aria-label="Skill"
                  placeholder="Skill (e.g. Procreate)"
                  value={skill.name}
                  autoFocus={!skill.name}
                  onChange={(e) => set({ name: e.target.value })}
                />
                <LevelPicker
                  compact
                  labels={SKILL_LEVELS}
                  value={skill.level}
                  onChange={(level) => set({ level })}
                />
                <ItemActions {...actions} />
              </li>
            )
          })}
        </ul>
      )}

      <button type="button" className="btn btn--ghost btn--sm skill-category__add" onClick={addSkill}>
        <FaPlus size={10} /> Add skill
      </button>
    </li>
  )
}

function SkillsSection({ categories, onChange, sectionProps }) {
  const add = () => onChange([...categories, { id: uid(), name: '', skills: [] }])

  return (
    <EditorSection {...sectionProps}>
      {categories.length > 0 && (
        <ul className="item-list">
          {categories.map((category, i) => (
            <SkillCategory
              key={category.id}
              category={category}
              {...rowProps(categories, i, onChange)}
            />
          ))}
        </ul>
      )}
      <button type="button" className="btn btn--dashed" onClick={add}>
        <FaPlus size={11} /> Add category
      </button>
    </EditorSection>
  )
}

export default SkillsSection
