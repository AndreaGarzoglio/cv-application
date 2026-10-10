import RichText from './RichText.jsx'
import { formatRange } from '../../utils/date.js'
import LevelIndicator from './LevelIndicator.jsx'
import { LANGUAGE_LEVELS, SKILL_LEVELS } from '../../data/levels.js'
import { contactHref, displayValue, getPlatform } from '../../data/platforms.js'

export function ResumeSection({ title, icon: Icon, className = '', children }) {
  return (
    <section className={`cv-section ${className}`}>
      <h2 className="cv-section__title">
        <span>
          {Icon && <Icon className="cv-section__icon" aria-hidden="true" />}
          {title}
        </span>
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

export function SkillGroups({ categories, variant }) {
  const groups = categories
    .map((c) => ({ ...c, skills: c.skills.filter((s) => s.name.trim()) }))
    .filter((c) => c.skills.length > 0)
  if (groups.length === 0) return null

  return (
    <div className="cv-skill-groups">
      {groups.map((group) => (
        <div key={group.id} className="cv-skill-group">
          {group.name.trim() && <h3 className="cv-skill-group__name">{group.name}</h3>}
          {variant === 'tags' ? (
            <ul className="cv-tags">
              {group.skills.map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          ) : (
            <LevelList items={group.skills} variant={variant} labels={SKILL_LEVELS} />
          )}
        </div>
      ))}
    </div>
  )
}

export function InterestList({ interests, variant }) {
  const items = interests.filter((i) => i.name.trim())
  if (items.length === 0) return null

  if (variant === 'inline') {
    return <p className="cv-inline-list">{items.map((i) => i.name).join(' · ')}</p>
  }

  return (
    <ul className={variant === 'list' ? 'cv-bullets' : 'cv-tags'}>
      {items.map((interest) => (
        <li key={interest.id}>{interest.name}</li>
      ))}
    </ul>
  )
}

export function EntryList({ entries, design, getHeading }) {
  const items = entries.filter((e) => !e.hidden)
  if (items.length === 0) return null

  return (
    <div className={`cv-entries cv-entries--${design.entryLayout}`}>
      {items.map((entry) => {
        const { title, subtitle, extra } = getHeading(entry)
        const dates = formatRange(entry, design.dateFormat, design.resumeLanguage)
        return (
          <article key={entry.id} className="cv-entry">
            <header className="cv-entry__header">
              <div className="cv-entry__titles">
                {title && <h3 className="cv-entry__title">{title}</h3>}
                {subtitle && <p className="cv-entry__subtitle">{subtitle}</p>}
              </div>
              {(dates || entry.location) && (
                <div className="cv-entry__meta">
                  {dates && <span className="cv-entry__dates">{dates}</span>}
                  {entry.location && <span className="cv-entry__location">{entry.location}</span>}
                </div>
              )}
            </header>
            {extra}
            {entry.description?.trim() && <RichText text={entry.description} />}
          </article>
        )
      })}
    </div>
  )
}
