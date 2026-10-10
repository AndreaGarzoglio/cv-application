import { useId } from 'react'
import '../../styles/Field.css'

function Field({ label, as: Tag = 'input', className = '', hint, ...props }) {
  const id = useId()
  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <Tag id={id} className="input" {...props} />
      {hint && <small className="field__hint">{hint}</small>}
    </div>
  )
}

export default Field
