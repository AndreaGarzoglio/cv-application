import { useState } from 'react'
import { FaChevronDown, FaEye, FaEyeSlash, FaPen } from 'react-icons/fa6'
import IconButton from '../ui/IconButton.jsx'
import '../../styles/EditorSection.css'

function EditorSection({
  icon: Icon,
  title,
  defaultTitle = title,
  onRename,
  hidden = false,
  onToggleHidden,
  defaultOpen = false,
  children,
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [renaming, setRenaming] = useState(false)

  return (
    <section className={`ed-section${open ? ' is-open' : ''}${hidden ? ' is-hidden' : ''}`}>
      <div className="ed-section__header">
        {renaming ? (
          <div className="ed-section__toggle">
            <span className="ed-section__icon">
              <Icon />
            </span>
            <input
              className="ed-section__rename"
              value={title}
              placeholder={defaultTitle}
              autoFocus
              aria-label="Section title"
              onChange={(e) => onRename(e.target.value)}
              onBlur={() => setRenaming(false)}
              onKeyDown={(e) => e.key === 'Enter' && setRenaming(false)}
            />
          </div>
        ) : (
          <button
            type="button"
            className="ed-section__toggle"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="ed-section__icon">
              <Icon />
            </span>
            <span className="ed-section__title">{title.trim() || defaultTitle}</span>
          </button>
        )}

        {onRename && (
          <IconButton title="Rename section" onClick={() => setRenaming(true)}>
            <FaPen size={12} />
          </IconButton>
        )}
        {onToggleHidden && (
          <IconButton
            title={hidden ? 'Show in resume' : 'Hide from resume'}
            onClick={onToggleHidden}
          >
            {hidden ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
          </IconButton>
        )}
        <IconButton
          className="ed-section__chevron"
          aria-label={open ? 'Collapse section' : 'Expand section'}
          onClick={() => setOpen((o) => !o)}
        >
          <FaChevronDown size={12} />
        </IconButton>
      </div>

      <div className="ed-section__body" inert={!open}>
        <div className="ed-section__content">
          <div className="ed-section__inner">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default EditorSection
