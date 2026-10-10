import PersonalSection from './sections/PersonalSection.jsx'
import ContactsSection from './sections/ContactsSection.jsx'
import LanguagesSection from './sections/LanguagesSection.jsx'
import SkillsSection from './sections/SkillsSection.jsx'
import InterestsSection from './sections/InterestsSection.jsx'
import ProfileSection from './sections/ProfileSection.jsx'
import ExperienceSection from './sections/ExperienceSection.jsx'
import EducationSection from './sections/EducationSection.jsx'
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

      <h2 className="editor__group-label">Main</h2>
      <ProfileSection
        profile={resume.profile}
        onChange={(v) => onChange('profile', v)}
        sectionProps={sectionProps('profile')}
      />
      <ExperienceSection
        experience={resume.experience}
        onChange={(v) => onChange('experience', v)}
        sectionProps={sectionProps('experience')}
      />
      <EducationSection
        education={resume.education}
        onChange={(v) => onChange('education', v)}
        sectionProps={sectionProps('education')}
      />
    </div>
  )
}

export default Editor
