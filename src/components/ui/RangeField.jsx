import { useId } from 'react'

function RangeField({ label, value, min, max, step = 1, unit = '', disabled, onChange }) {
  const id = useId()
  const fill = ((value - min) / (max - min)) * 100

  return (
    <div className={`range-field${disabled ? ' is-disabled' : ''}`}>
      <div className="range-field__head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>
          {value}
          {unit}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        style={{ '--fill': `${fill}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

export default RangeField
