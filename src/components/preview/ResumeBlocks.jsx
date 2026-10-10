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
