import EntriesSection from '../EntriesSection.jsx'
import DateRangeFields from '../DateRangeFields.jsx'
import Field from '../../ui/Field.jsx'

const createEntry = () => ({ position: '', company: '' })

const summary = (entry) => ({
  title: entry.position || 'Untitled position',
  subtitle: entry.company,
})

function renderFields(entry, set, bind) {
  return (
    <>
      <Field
        label="Job title"
        placeholder="e.g. Concept Artist & Game Writer"
        autoFocus={!entry.position}
        {...bind('position')}
      />
      <div className="field-row">
        <Field label="Company" placeholder="e.g. Mad Burger Studio" {...bind('company')} />
        <Field label="Location" placeholder="e.g. Genoa, Italy" {...bind('location')} />
      </div>
      <DateRangeFields entry={entry} onChange={set} currentLabel="I currently work here" />
      <Field
        as="textarea"
        label="Description"
        rows={5}
        placeholder={'- What you achieved\n- Tools you used\n- Impact, with numbers if possible'}
        hint={'Start a line with "- " for a bullet point, **text** for bold.'}
        {...bind('description')}
      />
    </>
  )
}

function ExperienceSection(props) {
  const config = { createEntry, summary, renderFields, addLabel: 'Add experience' }
  return <EntriesSection {...props} {...config} />
}

export default ExperienceSection
