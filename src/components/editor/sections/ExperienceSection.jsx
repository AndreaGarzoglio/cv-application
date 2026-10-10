import { FaBriefcase } from 'react-icons/fa6'
import EntriesSection from '../EntriesSection.jsx'
import DateRangeFields from '../DateRangeFields.jsx'
import Field from '../../ui/Field.jsx'

const createEntry = () => ({
  position: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
})

const summary = (entry) => ({
  title: entry.position || 'Untitled position',
  subtitle: entry.company,
})

function renderFields(entry, set) {
  return (
    <>
      <Field
        label="Job title"
        placeholder="e.g. Concept Artist & Game Writer"
        value={entry.position}
        autoFocus={!entry.position}
        onChange={(e) => set({ position: e.target.value })}
      />
      <div className="field-row">
        <Field
          label="Company"
          placeholder="e.g. Mad Burger Studio"
          value={entry.company}
          onChange={(e) => set({ company: e.target.value })}
        />
        <Field
          label="Location"
          placeholder="e.g. Genoa, Italy"
          value={entry.location}
          onChange={(e) => set({ location: e.target.value })}
        />
      </div>
      <DateRangeFields entry={entry} onChange={set} currentLabel="I currently work here" />
      <Field
        as="textarea"
        label="Description"
        rows={5}
        placeholder={'- What you achieved\n- Tools you used\n- Impact, with numbers if possible'}
        value={entry.description}
        onChange={(e) => set({ description: e.target.value })}
        hint={'Start a line with "- " for a bullet point, **text** for bold.'}
      />
    </>
  )
}

function ExperienceSection({ experience, onChange, sectionProps }) {
  return (
    <EntriesSection
      icon={FaBriefcase}
      entries={experience}
      onChange={onChange}
      sectionProps={sectionProps}
      createEntry={createEntry}
      summary={summary}
      renderFields={renderFields}
      addLabel="Add experience"
    />
  )
}

export default ExperienceSection
