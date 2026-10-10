import { useRef } from 'react'
import { FaCamera, FaTrash, FaUser } from 'react-icons/fa6'
import EditorSection from '../EditorSection.jsx'
import Field from '../../ui/Field.jsx'
import { readImageAsDataUrl } from '../../../utils/image.js'

function PersonalSection({ personal, onChange }) {
  const fileInput = useRef(null)
  const set = (patch) => onChange({ ...personal, ...patch })

  async function handlePhoto(e) {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return
    try {
      set({ photo: await readImageAsDataUrl(file) })
    } catch {
      alert('Could not read this image. Try a JPG or PNG file.')
    }
  }

  return (
    <EditorSection icon={FaUser} title="Personal details" defaultOpen>
      <div className="personal">
        <div className="photo-picker">
          <button
            type="button"
            className="photo-picker__preview"
            onClick={() => fileInput.current.click()}
            title={personal.photo ? 'Change photo' : 'Upload photo'}
          >
            {personal.photo ? (
              <img src={personal.photo} alt="Profile" />
            ) : (
              <FaCamera size={22} />
            )}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhoto}
          />
          {personal.photo && (
            <button
              type="button"
              className="btn btn--ghost btn--sm btn--danger"
              onClick={() => set({ photo: '' })}
            >
              <FaTrash size={11} /> Remove
            </button>
          )}
        </div>
        <div className="field-stack personal__fields">
          <Field
            label="Full name"
            placeholder="e.g. Andrea Garzoglio"
            value={personal.fullName}
            onChange={(e) => set({ fullName: e.target.value })}
          />
          <Field
            label="Job title"
            placeholder="e.g. Concept Artist"
            value={personal.jobTitle}
            onChange={(e) => set({ jobTitle: e.target.value })}
          />
        </div>
      </div>
    </EditorSection>
  )
}

export default PersonalSection
