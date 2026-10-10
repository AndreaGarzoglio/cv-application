import { levelLabel } from '../../data/levels.js'

function LevelIndicator({ level, variant, labels }) {
  if (!level || variant === 'none' || variant === 'tags') return null

  if (variant === 'text') {
    return <span className="cv-level cv-level--text">{levelLabel(labels, level)}</span>
  }

  if (variant === 'bar') {
    return (
      <span className="cv-level cv-level--bar" title={levelLabel(labels, level)}>
        <span style={{ width: `${level * 20}%` }} />
      </span>
    )
  }

  return (
    <span className={`cv-level cv-level--${variant}`} title={levelLabel(labels, level)}>
      {labels.map((label, i) => (
        <span key={label} className={i < level ? 'is-on' : undefined} />
      ))}
    </span>
  )
}

export default LevelIndicator
