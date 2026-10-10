import EditorSection from '../EditorSection.jsx'
import Field from '../../ui/Field.jsx'

function ProfileSection({ profile, onChange, sectionProps }) {
  return (
    <EditorSection {...sectionProps}>
      <Field
        as="textarea"
        label="About you"
        rows={6}
        placeholder="A short summary of who you are, what you do and what you're looking for."
        value={profile}
        onChange={(e) => onChange(e.target.value)}
        hint={`${profile.length} characters · use **text** for bold and "- " for bullet points`}
      />
    </EditorSection>
  )
}

export default ProfileSection
