import Field from '../ui/Field.jsx'
import Switch from '../ui/Switch.jsx'

const isYearOnly = (value) => /^\d{4}$/.test(value)

function DateRangeFields({ entry, onChange, currentLabel }) {
  return (
    <>
      <div className="field-row">
        <Field
          label="Start date"
          type="month"
          value={entry.startDate}
          onChange={(e) => onChange({ startDate: e.target.value })}
        />
        <Field
          label="End date"
          type="month"
          value={entry.current ? '' : entry.endDate}
          disabled={entry.current}
          onChange={(e) => onChange({ endDate: e.target.value })}
        />
      </div>
      {[entry.startDate, entry.current ? '' : entry.endDate].some(isYearOnly) && (
        <p className="hint">Saved with the year only. Pick a month to be more precise.</p>
      )}
      <Switch
        label={currentLabel}
        value={entry.current}
        onChange={(current) => onChange({ current })}
      />
    </>
  )
}

export default DateRangeFields
