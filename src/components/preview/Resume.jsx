import { useEffect, useRef, useState } from 'react'
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
import '../../styles/Resume.css'


function cssVariables(design) {
  const c = design.colors
  return {
    '--cv-accent': c.accent,
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
    <img
      className={`cv-photo cv-photo--${design.photoShape}`}
      src={resume.personal.photo}
      alt={resume.personal.fullName}
    />
  )
}

function Identity({ personal }) {
  return (
    <div className="cv-identity">
      <h1 className="cv-name">{personal.fullName || 'Your Name'}</h1>
      {personal.jobTitle && <p className="cv-role">{personal.jobTitle}</p>}
    </div>
  )
}

// Fragment wrapper so falsy blocks render nothing.
function BlockSlot({ children }) {
  return children || null
}

function usePageCount() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const [pages, setPages] = useState(1)

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const outer = outerRef.current.getBoundingClientRect()
      const inner = innerRef.current.getBoundingClientRect()
      // Ratio-based so the result is independent of the preview zoom.
      const height = (inner.height / outer.width) * PAGE_WIDTH
      setPages(Math.max(1, Math.ceil((height - 1) / PAGE_HEIGHT)))
    })
    observer.observe(innerRef.current)
    return () => observer.disconnect()
  }, [])

  return { outerRef, innerRef, pages }
}

function Resume({ resume, design }) {
  const { outerRef, innerRef, pages } = usePageCount()
  const isSingle = design.layout === 'single'
  const isVisible = (key) => !resume.hiddenSections.includes(key)
  const titles = Object.fromEntries(
    Object.keys(resume.sectionTitles).map((key) => [key, sectionTitle(resume.sectionTitles, key)]),
  )
  const { sidebar, main } = design.sections

  const blocks = {
    contacts: () =>
      resume.contacts.some((c) => c.value.trim()) && (
        <ResumeSection title={titles.contacts}>
          <ContactList contacts={resume.contacts} showIcons={design.showContactIcons} />
        </ResumeSection>
      ),
    languages: () =>
      resume.languages.some((l) => l.name.trim()) && (
        <ResumeSection title={titles.languages}>
          <LanguageList languages={resume.languages} variant={design.languageStyle} />
        </ResumeSection>
      ),
    skills: () =>
      resume.skillCategories.some((c) => c.skills.some((s) => s.name.trim())) && (
        <ResumeSection title={titles.skills}>
          <SkillGroups categories={resume.skillCategories} variant={design.skillStyle} />
        </ResumeSection>
      ),
    interests: () =>
      resume.interests.length > 0 && (
        <ResumeSection title={titles.interests}>
          <InterestList interests={resume.interests} variant={design.interestStyle} />
        </ResumeSection>
      ),
    profile: () =>
      resume.profile.trim() && (
        <ResumeSection title={titles.profile}>
          <RichText text={resume.profile} />
        </ResumeSection>
      ),
    experience: () =>
      resume.experience.some((e) => !e.hidden) && (
        <ResumeSection title={titles.experience}>
          <EntryList
            entries={resume.experience}
            design={design}
            getHeading={(e) => ({ title: e.position, subtitle: e.company })}
          />
        </ResumeSection>
      ),
    education: () =>
      resume.education.some((e) => !e.hidden) && (
        <ResumeSection title={titles.education}>
          <EntryList
            entries={resume.education}
            design={design}
            getHeading={(e) => ({
              title: e.degree,
              subtitle: e.school,
              extra: e.grade.trim() && (
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
      style={{ ...cssVariables(design), '--cv-pages': pages, minHeight: pages * PAGE_HEIGHT }}
    >
      <div ref={innerRef} className="resume__inner">
        {isSingle ? (
          <>
            <header className="cv-header">
              <Photo resume={resume} design={design} />
              <div className="cv-header__text">
                <Identity personal={resume.personal} />
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
              <Identity personal={resume.personal} />
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
