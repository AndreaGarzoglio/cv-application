import { levelLabel } from '../../data/levels.js'

// Five clickable segments. Clicking the current level clears it.
function LevelPicker({ value, onChange, labels, compact = false }) {
  return (
    <div className={`level-picker${compact ? ' level-picker--compact' : ''}`}>
      <div className="level-picker__track" role="radiogroup" aria-label="Level">
        {labels.map((label, i) => {
          const level = i + 1
          return (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={value === level}
              aria-label={label}
              title={label}
              className={`level-picker__step${level <= value ? ' is-on' : ''}`}
              onClick={() => onChange(value === level ? 0 : level)}
            />
          )
        })}
      </div>
      {!compact && (
        <span className="level-picker__label">{levelLabel(labels, value) || 'No level'}</span>
      )}
    </div>
  )
}

export default LevelPicker
