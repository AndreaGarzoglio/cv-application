import PersonalSection from './sections/PersonalSection.jsx'
import ContactsSection from './sections/ContactsSection.jsx'
import LanguagesSection from './sections/LanguagesSection.jsx'
import SkillsSection from './sections/SkillsSection.jsx'
import InterestsSection from './sections/InterestsSection.jsx'
import '../../styles/Editor.css'

function Editor({ resume, onChange }) {
  const sectionProps = (key) => ({
    title: resume.sectionTitles[key],
    onRename: (title) => onChange('sectionTitles', { ...resume.sectionTitles, [key]: title }),
    hidden: resume.hiddenSections.includes(key),
    onToggleHidden: () =>
      onChange(
        'hiddenSections',
        resume.hiddenSections.includes(key)
          ? resume.hiddenSections.filter((k) => k !== key)
          : [...resume.hiddenSections, key],
      ),
  })

  return (
    <div className="editor">
      <h2 className="editor__group-label">Info</h2>
      <PersonalSection personal={resume.personal} onChange={(v) => onChange('personal', v)} />
      <ContactsSection
        contacts={resume.contacts}
        onChange={(v) => onChange('contacts', v)}
        sectionProps={sectionProps('contacts')}
      />
      <LanguagesSection
        languages={resume.languages}
        onChange={(v) => onChange('languages', v)}
        sectionProps={sectionProps('languages')}
      />
      <SkillsSection
        categories={resume.skillCategories}
        onChange={(v) => onChange('skillCategories', v)}
        sectionProps={sectionProps('skills')}
      />
      <InterestsSection
        interests={resume.interests}
        onChange={(v) => onChange('interests', v)}
        sectionProps={sectionProps('interests')}
      />
    </div>
  )
}

export default Editor
