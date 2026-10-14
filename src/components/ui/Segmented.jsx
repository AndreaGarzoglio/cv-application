// A radio group of buttons. Defaults to the segmented control look; the class
// names and option content can be swapped to render a grid of option cards.
function Segmented({
  label,
  options,
  value,
  onChange,
  className = 'segmented',
  optionClass = 'segmented__option',
  renderOption = (option) => option.label,
}) {
  return (
    <div className={className} role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          className={`${optionClass}${value === option.value ? ' is-active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {renderOption(option)}
        </button>
      ))}
    </div>
  )
}

export default Segmented
