import Field from '../ui/Field.jsx'
import Switch from '../ui/Switch.jsx'

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
      <Switch
        label={currentLabel}
        checked={entry.current}
        onChange={(current) => onChange({ current })}
      />
    </>
  )
}

export default DateRangeFields
