import { FaGraduationCap } from 'react-icons/fa6'
import EntriesSection from '../EntriesSection.jsx'
import DateRangeFields from '../DateRangeFields.jsx'
import Field from '../../ui/Field.jsx'

const createEntry = () => ({
  degree: '',
  school: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  grade: '',
  description: '',
})

const summary = (entry) => ({
  title: entry.degree || 'Untitled course',
  subtitle: entry.school,
})

function renderFields(entry, set) {
  return (
    <>
      <Field
        label="Course / degree"
        placeholder="e.g. BSc in Computer Science"
        value={entry.degree}
        autoFocus={!entry.degree}
        onChange={(e) => set({ degree: e.target.value })}
      />
      <div className="field-row">
        <Field
          label="School"
          placeholder="e.g. University of Milan"
          value={entry.school}
          onChange={(e) => set({ school: e.target.value })}
        />
        <Field
          label="Location"
          placeholder="e.g. Milan, Italy"
          value={entry.location}
          onChange={(e) => set({ location: e.target.value })}
        />
      </div>
      <DateRangeFields entry={entry} onChange={set} currentLabel="I currently study here" />
      <Field
        label="Grade"
        placeholder="e.g. 108/110, GPA 3.8"
        value={entry.grade}
        onChange={(e) => set({ grade: e.target.value })}
      />
      <Field
        as="textarea"
        label="Details"
        rows={4}
        placeholder={'Thesis, relevant courses, honours…'}
        value={entry.description}
        onChange={(e) => set({ description: e.target.value })}
        hint={'Start a line with "- " for a bullet point, **text** for bold.'}
      />
    </>
  )
}

function EducationSection({ education, onChange, sectionProps }) {
  return (
    <EntriesSection
      icon={FaGraduationCap}
      entries={education}
      onChange={onChange}
      sectionProps={sectionProps}
      createEntry={createEntry}
      summary={summary}
      renderFields={renderFields}
      addLabel="Add education"
    />
  )
}

export default EducationSection
