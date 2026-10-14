import EntriesSection from '../EntriesSection.jsx'
import DateRangeFields from '../DateRangeFields.jsx'
import Field from '../../ui/Field.jsx'

const createEntry = () => ({ degree: '', school: '', grade: '' })

const summary = (entry) => ({
  title: entry.degree || 'Untitled course',
  subtitle: entry.school,
})

function renderFields(entry, set, bind) {
  return (
    <>
      <Field
        label="Course / degree"
        placeholder="e.g. Full Stack Developer course"
        autoFocus={!entry.degree}
        {...bind('degree')}
      />
      <div className="field-row">
        <Field label="School" placeholder="e.g. The Odin Project" {...bind('school')} />
        <Field label="Location" placeholder="e.g. Milan, Italy" {...bind('location')} />
      </div>
      <DateRangeFields entry={entry} onChange={set} currentLabel="I currently study here" />
      <Field label="Grade" placeholder="e.g. 27/30, 81/100" {...bind('grade')} />
      <Field
        as="textarea"
        label="Details"
        rows={4}
        placeholder={'Thesis, relevant courses, honours…'}
        hint={'Start a line with "- " for a bullet point, **text** for bold.'}
        {...bind('description')}
      />
    </>
  )
}

function EducationSection(props) {
  const config = { createEntry, summary, renderFields, addLabel: 'Add education' }
  return <EntriesSection {...props} {...config} />
}

export default EducationSection
