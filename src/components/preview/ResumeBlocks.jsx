import LevelIndicator from './LevelIndicator.jsx'
import { LANGUAGE_LEVELS } from '../../data/levels.js'
import { contactHref, displayValue, getPlatform } from '../../data/platforms.js'

export function ResumeSection({ title, className = '', children }) {
  return (
    <section className={`cv-section ${className}`}>
      <h2 className="cv-section__title">
        <span>{title}</span>
      </h2>
      {children}
    </section>
  )
}

export function ContactList({ contacts, showIcons, inline = false }) {
  const items = contacts.filter((c) => c.value.trim())
  if (items.length === 0) return null

  return (
    <ul className={`cv-contacts${inline ? ' cv-contacts--inline' : ''}`}>
      {items.map((contact) => {
        const platform = getPlatform(contact.platform)
        const Icon = platform.icon
        const href = contactHref(contact)
        const content = (
          <>
            {showIcons && <Icon className="cv-contacts__icon" aria-label={platform.label} />}
            <span>{displayValue(contact.value)}</span>
          </>
        )
        return (
          <li key={contact.id}>
            {href ? (
              <a href={href} target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function LevelList({ items, variant, labels, renderNote }) {
  return (
    <ul className={`cv-levels cv-levels--${variant}`}>
      {items.map((item) => (
        <li key={item.id} className="cv-levels__item">
          <span className="cv-levels__head">
            <span className="cv-levels__name">{item.name}</span>
            {renderNote?.(item)}
          </span>
          <LevelIndicator level={item.level} variant={variant} labels={labels} />
        </li>
      ))}
    </ul>
  )
}

export function LanguageList({ languages, variant }) {
  const items = languages.filter((l) => l.name.trim())
  if (items.length === 0) return null
  return (
    <LevelList
      items={items}
      variant={variant}
      labels={LANGUAGE_LEVELS}
      renderNote={(l) => l.note.trim() && <span className="cv-levels__note">{l.note}</span>}
    />
  )
}
