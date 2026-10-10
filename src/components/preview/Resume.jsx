import { useEffect, useRef, useState } from 'react'
import { PAGE_HEIGHT, PAGE_WIDTH } from '../../data/design.js'
import { ContactList, ResumeSection } from './ResumeBlocks.jsx'
import '../../styles/Resume.css'

const fontStack = (font) => `'${font}', system-ui, sans-serif`

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

const SIDEBAR_SECTIONS = ['contacts']
const MAIN_SECTIONS = []

function Resume({ resume, design }) {
  const { outerRef, innerRef, pages } = usePageCount()
  const isSingle = design.layout === 'single'
  const isVisible = (key) => !resume.hiddenSections.includes(key)
  const titles = resume.sectionTitles

  const blocks = {
    contacts: () =>
      resume.contacts.some((c) => c.value.trim()) && (
        <ResumeSection title={titles.contacts}>
          <ContactList contacts={resume.contacts} showIcons={design.showContactIcons} />
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
              {renderBlocks(MAIN_SECTIONS)}
              {renderBlocks(SIDEBAR_SECTIONS.filter((key) => key !== 'contacts'))}
            </div>
          </>
        ) : (
          <>
            <aside className="cv-sidebar">
              <Photo resume={resume} design={design} />
              {renderBlocks(SIDEBAR_SECTIONS)}
            </aside>
            <div className="cv-main">
              <Identity personal={resume.personal} />
              {renderBlocks(MAIN_SECTIONS)}
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
