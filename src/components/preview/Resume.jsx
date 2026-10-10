import { useEffect, useRef, useState } from 'react'
import { PAGE_HEIGHT, PAGE_WIDTH } from '../../data/design.js'
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

  return (
    <article
      ref={outerRef}
      className={`resume resume--${design.layout}`}
      style={{ ...cssVariables(design), minHeight: pages * PAGE_HEIGHT }}
    >
      <div ref={innerRef} className="resume__inner">
        {isSingle ? (
          <>
            <header className="cv-header">
              <Photo resume={resume} design={design} />
              <Identity personal={resume.personal} />
            </header>
            <div className="cv-main" />
          </>
        ) : (
          <>
            <aside className="cv-sidebar">
              <Photo resume={resume} design={design} />
            </aside>
            <div className="cv-main">
              <Identity personal={resume.personal} />
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
