import PersonalSection from './sections/PersonalSection.jsx'
import '../../styles/Editor.css'

function Editor({ resume, onChange }) {
  return (
    <div className="editor">
      <PersonalSection personal={resume.personal} onChange={(v) => onChange('personal', v)} />
    </div>
  )
}

export default Editor
