import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PAGE_HEIGHT, PAGE_WIDTH } from '../../data/design.js'
import {
  ContactList,
  EntryList,
  InterestList,
  LanguageList,
  ResumeSection,
  SkillGroups,
} from './ResumeBlocks.jsx'
import RichText from './RichText.jsx'
import { getStrings } from '../../data/locales.js'
import { fontStack } from '../../data/fonts.js'
import { sectionTitle } from '../../data/sampleResume.js'
import { SECTION_ICONS } from '../../data/sectionIcons.js'
import '../../styles/Resume.css'

function cssVariables(design) {
  const c = design.colors
  return {
    '--cv-accent': c.accent,
    '--cv-accent-2': c.accent2,
    '--cv-page-bg': c.pageBg,
    '--cv-text': c.text,
    '--cv-heading': c.heading,
    '--cv-side-bg': c.sidebarBg,
    '--cv-side-text': c.sidebarText,
    '--cv-side-heading': c.sidebarHeading,
    '--cv-font-body': fontStack(design.bodyFont),
    '--cv-font-heading': fontStack(design.headingFont),
    '--cv-fs': `${design.fontSize}px`,
    '--cv-lh': design.lineHeight,
    '--cv-pad': `${design.pageMargin}px`,
    '--cv-gap': `${design.sectionGap}px`,
    '--cv-side-w': `${design.sidebarWidth}%`,
    '--cv-photo': `${design.photoSize}px`,
  }
}

function Photo({ resume, design }) {
  if (!design.showPhoto || !resume.personal.photo) return null
  return (
    <div
      className={`cv-photo cv-photo--${design.photoShape}${design.photoRing ? ' cv-photo--ring' : ''}`}
    >
      <img src={resume.personal.photo} alt={resume.personal.fullName} />
    </div>
  )
}

function Identity({ personal, gradient }) {
  return (
    <div className="cv-identity">
      <h1 className={`cv-name${gradient ? ' cv-name--gradient' : ''}`}>
        {personal.fullName || 'Your Name'}
      </h1>
      {personal.jobTitle && <p className="cv-role">{personal.jobTitle}</p>}
    </div>
  )
}

// Fragment wrapper so falsy blocks render nothing.
function BlockSlot({ children }) {
  return children || null
}

// Blocks that must not be cut by a page break. A block that would cross one
// (or sit in the top/bottom margin of a page) is pushed to the next page.
const UNITS = [
  '.cv-section__title',
  '.cv-entry__header',
  '.cv-entry__grade',
  '.cv-rich > p',
  '.cv-bullets > li',
  '.cv-levels__item',
  '.cv-skill-group__name',
  '.cv-tags',
  '.cv-contacts > li',
  '.cv-inline-list',
].join(',')

// Headings stay on the same page as at least the start of what follows:
// treat them as taller than they are when looking for a page break.
function keepWithNext(el, fontSize) {
  if (el.matches('.cv-section__title')) return fontSize * 6
  if (el.matches('.cv-entry__header, .cv-skill-group__name')) return fontSize * 3
  return 0
}

function usePagination(margin, fontSize) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const [pages, setPages] = useState(1)

  const paginate = useCallback(() => {
    const outer = outerRef.current
    const units = innerRef.current.querySelectorAll(UNITS)
    units.forEach((el) => (el.style.marginTop = ''))

    const box = outer.getBoundingClientRect()
    if (box.width === 0) return // preview hidden (mobile edit view)
    // Measure in page pixels, independent of the preview zoom.
    const scale = box.width / PAGE_WIDTH

    for (const el of units) {
      const rect = el.getBoundingClientRect()
      const top = (rect.top - box.top) / scale
      const bottom = (rect.bottom - box.top) / scale + keepWithNext(el, fontSize)
      const pageBreak = Math.floor((bottom + margin) / PAGE_HEIGHT) * PAGE_HEIGHT
      const tooTall = bottom - top > PAGE_HEIGHT - margin * 2
      if (pageBreak > 0 && !tooTall && top < pageBreak + margin && bottom > pageBreak - margin) {
        const current = parseFloat(getComputedStyle(el).marginTop) || 0
        el.style.marginTop = `${current + pageBreak + margin - top}px`
      }
    }
    return innerRef.current.getBoundingClientRect().height / scale
  }, [margin, fontSize])

  // Re-run after every render, before paint, so content never flickers.
  useLayoutEffect(() => {
    paginate()
  })

  // Page count, and late layout changes such as web fonts finishing loading.
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const height = paginate()
      if (height) setPages(Math.max(1, Math.ceil((height - 1) / PAGE_HEIGHT)))
    })
    observer.observe(innerRef.current)
    return () => observer.disconnect()
  }, [paginate])

  return { outerRef, innerRef, pages }
}

function Resume({ resume, design }) {
  const { outerRef, innerRef, pages } = usePagination(design.pageMargin, design.fontSize)
  const isSingle = design.layout === 'single'
  const isVisible = (key) => !resume.hiddenSections.includes(key)
  const titles = Object.fromEntries(
    Object.keys(resume.sectionTitles).map((key) => [key, sectionTitle(resume.sectionTitles, key)]),
  )
  const { sidebar, main } = design.sections
  const icon = (key) => (design.showSectionIcons ? SECTION_ICONS[key] : null)

  const blocks = {
    contacts: () =>
      resume.contacts.some((c) => c.value.trim()) && (
        <ResumeSection icon={icon('contacts')} title={titles.contacts}>
          <ContactList contacts={resume.contacts} showIcons={design.showContactIcons} />
        </ResumeSection>
      ),
    languages: () =>
      resume.languages.some((l) => l.name.trim()) && (
        <ResumeSection icon={icon('languages')} title={titles.languages}>
          <LanguageList languages={resume.languages} variant={design.languageStyle} />
        </ResumeSection>
      ),
    skills: () =>
      resume.skillCategories.some((c) => c.skills.some((s) => s.name.trim())) && (
        <ResumeSection icon={icon('skills')} title={titles.skills}>
          <SkillGroups categories={resume.skillCategories} variant={design.skillStyle} />
        </ResumeSection>
      ),
    interests: () =>
      resume.interests.length > 0 && (
        <ResumeSection icon={icon('interests')} title={titles.interests}>
          <InterestList interests={resume.interests} variant={design.interestStyle} />
        </ResumeSection>
      ),
    profile: () =>
      resume.profile.trim() && (
        <ResumeSection icon={icon('profile')} title={titles.profile}>
          <RichText text={resume.profile} />
        </ResumeSection>
      ),
    experience: () =>
      resume.experience.some((e) => !e.hidden) && (
        <ResumeSection icon={icon('experience')} title={titles.experience}>
          <EntryList
            entries={resume.experience}
            design={design}
            getHeading={(e) => ({ title: e.position, subtitle: e.company })}
          />
        </ResumeSection>
      ),
    education: () =>
      resume.education.some((e) => !e.hidden) && (
        <ResumeSection icon={icon('education')} title={titles.education}>
          <EntryList
            entries={resume.education}
            design={design}
            getHeading={(e) => ({
              title: e.degree,
              subtitle: e.school,
              extra: e.grade?.trim() && (
                <p className="cv-entry__grade">
                  {getStrings(design.resumeLanguage).grade}: <strong>{e.grade}</strong>
                </p>
              ),
            })}
          />
        </ResumeSection>
      ),
  }

  const renderBlocks = (keys) =>
    keys.filter(isVisible).map((key) => <BlockSlot key={key}>{blocks[key]()}</BlockSlot>)

  return (
    <article
      ref={outerRef}
      className={`resume resume--${design.layout} cv-h--${design.headingStyle}${
        design.headingUppercase ? ' cv-h--upper' : ''
      }`}
      style={{ ...cssVariables(design), minHeight: pages * PAGE_HEIGHT }}
    >
      {design.decoration !== 'none' && (
        <div className={`cv-decor cv-decor--${design.decoration}`} aria-hidden="true" />
      )}
      <div ref={innerRef} className="resume__inner">
        {isSingle ? (
          <>
            <header className="cv-header">
              <Photo resume={resume} design={design} />
              <div className="cv-header__text">
                <Identity personal={resume.personal} gradient={design.nameGradient} />
                {isVisible('contacts') && (
                  <ContactList
                    contacts={resume.contacts}
                    showIcons={design.showContactIcons}
                    inline
                  />
                )}
              </div>
            </header>
            <div className="cv-main">
              {renderBlocks([...main, ...sidebar].filter((key) => key !== 'contacts'))}
            </div>
          </>
        ) : (
          <>
            <aside className="cv-sidebar">
              <Photo resume={resume} design={design} />
              {renderBlocks(sidebar)}
            </aside>
            <div className="cv-main">
              <Identity personal={resume.personal} gradient={design.nameGradient} />
              {renderBlocks(main)}
            </div>
          </>
        )}
      </div>

      {Array.from({ length: pages - 1 }, (_, i) => (
        <div key={i} className="resume__page-break" style={{ top: (i + 1) * PAGE_HEIGHT }}>
          <span>Page {i + 2}</span>
        </div>
      ))}
    </article>
  )
}

export default Resume
