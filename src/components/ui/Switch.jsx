function Switch({ label, value, onChange }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
      <span className="switch__track" aria-hidden="true" />
      <span className="switch__label">{label}</span>
    </label>
  )
}

export default Switch
