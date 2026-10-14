import PersonalSection from './sections/PersonalSection.jsx'
import ContactsSection from './sections/ContactsSection.jsx'
import LanguagesSection from './sections/LanguagesSection.jsx'
import SkillsSection from './sections/SkillsSection.jsx'
import InterestsSection from './sections/InterestsSection.jsx'
import ProfileSection from './sections/ProfileSection.jsx'
import ExperienceSection from './sections/ExperienceSection.jsx'
import EducationSection from './sections/EducationSection.jsx'
import { DEFAULT_SECTION_TITLES } from '../../data/sampleResume.js'
import { SECTION_ICONS } from '../../data/sectionIcons.js'
import '../../styles/Editor.css'

function Editor({ resume, onChange }) {
  const sectionProps = (key) => ({
    icon: SECTION_ICONS[key],
    title: resume.sectionTitles[key],
    defaultTitle: DEFAULT_SECTION_TITLES[key],
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

  // Wires a section to its resume field and to its title and visibility controls.
  const bind = (field, key = field) => ({
    onChange: (value) => onChange(field, value),
    sectionProps: sectionProps(key),
  })

  return (
    <div className="editor">
      <h2 className="editor__group-label">Info</h2>
      <PersonalSection personal={resume.personal} onChange={(v) => onChange('personal', v)} />
      <ContactsSection contacts={resume.contacts} {...bind('contacts')} />
      <LanguagesSection languages={resume.languages} {...bind('languages')} />
      <SkillsSection categories={resume.skillCategories} {...bind('skillCategories', 'skills')} />
      <InterestsSection interests={resume.interests} {...bind('interests')} />

      <h2 className="editor__group-label">Main</h2>
      <ProfileSection profile={resume.profile} {...bind('profile')} />
      <ExperienceSection entries={resume.experience} {...bind('experience')} />
      <EducationSection entries={resume.education} {...bind('education')} />
    </div>
  )
}

export default Editor
