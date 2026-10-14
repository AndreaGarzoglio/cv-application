import { useCallback, useState } from 'react'
import { flushSync } from 'react-dom'
import { FaEye, FaPenToSquare, FaPalette } from 'react-icons/fa6'
import Topbar from './components/Topbar.jsx'
import Editor from './components/editor/Editor.jsx'
import CustomizePanel from './components/customize/CustomizePanel.jsx'
import Preview from './components/preview/Preview.jsx'
import Resume from './components/preview/Resume.jsx'
import Toast from './components/ui/Toast.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { createEmptyResume, createSampleResume, mergeResume } from './data/sampleResume.js'
import { DEFAULT_DESIGN, mergeDesign } from './data/design.js'
import { downloadJson, readJsonFile, slugify } from './utils/file.js'
import './styles/App.css'

const TABS = [
  { id: 'content', label: 'Content', icon: FaPenToSquare },
  { id: 'customize', label: 'Customize', icon: FaPalette },
]

function App() {
  const [resume, setResume] = useLocalStorage('cv-builder:resume', createSampleResume, mergeResume)
  const [design, setDesign] = useLocalStorage('cv-builder:design', DEFAULT_DESIGN, mergeDesign)
  const [customPresets, setCustomPresets] = useLocalStorage('cv-builder:presets', [])
  const [tab, setTab] = useState('content')
  const [mobileView, setMobileView] = useState('edit')
  const [toast, setToast] = useState(null)
  const notify = (message, type = 'success') => setToast({ id: Date.now(), message, type })
  const clearToast = useCallback(() => setToast(null), [])

  const updateResume = (key, value) => setResume((prev) => ({ ...prev, [key]: value }))

  async function downloadPdf() {
    // The browser suggests the document title as the PDF file name.
    const previousTitle = document.title
    const name = resume.personal.fullName.trim()
    document.title = name ? `${name} - Resume` : 'Resume'
    window.addEventListener('afterprint', () => (document.title = previousTitle), { once: true })
    await document.fonts.ready
    // The resume must be laid out (not hidden by the mobile editor view) so
    // page breaks are computed before printing.
    flushSync(() => setMobileView('preview'))
    window.print()
  }

  const dataActions = {
    onExport() {
      downloadJson(
        { app: 'cv-builder', version: 1, resume, design },
        `${slugify(resume.personal.fullName)}-cv.json`,
      )
      notify('Resume exported')
    },
    async onImport(file) {
      try {
        const data = await readJsonFile(file)
        if (!data || typeof data.resume !== 'object') throw new Error('Not a CV Builder file')
        setResume(mergeResume(data.resume))
        if (data.design && typeof data.design === 'object') setDesign(mergeDesign(data.design))
        notify('Resume imported')
      } catch {
        notify('That file is not a valid CV Builder export', 'error')
      }
    },
    onLoadSample() {
      if (!confirm('Replace your current content and design with the example resume?')) return
      setResume(createSampleResume())
      setDesign(structuredClone(DEFAULT_DESIGN))
      notify('Example loaded')
    },
    onClear() {
      if (!confirm('Delete all your resume content? This cannot be undone.')) return
      setResume(createEmptyResume())
      notify('Content cleared')
    },
  }

  return (
    <div className="app">
      <Topbar onDownload={downloadPdf} {...dataActions} />
      <Toast toast={toast} onDone={clearToast} />
      <div className={`workspace workspace--${mobileView}`}>
        <aside className="workspace__editor">
          <nav className="panel-tabs" role="tablist">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                className={`panel-tabs__tab${tab === id ? ' is-active' : ''}`}
                onClick={() => setTab(id)}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
            <span
              className="panel-tabs__indicator"
              style={{ transform: `translateX(${TABS.findIndex((t) => t.id === tab) * 100}%)` }}
            />
          </nav>
          <div className="workspace__panel" key={tab}>
            {tab === 'content' ? (
              <Editor resume={resume} onChange={updateResume} />
            ) : (
              <CustomizePanel
                design={design}
                setDesign={setDesign}
                customPresets={customPresets}
                setCustomPresets={setCustomPresets}
                resume={resume}
              />
            )}
          </div>
        </aside>
        <main className="workspace__preview">
          <Preview>
            <Resume resume={resume} design={design} />
          </Preview>
        </main>
      </div>

      <nav className="mobile-nav">
        <button
          type="button"
          className={mobileView === 'edit' ? 'is-active' : undefined}
          onClick={() => setMobileView('edit')}
        >
          <FaPenToSquare /> Edit
        </button>
        <button
          type="button"
          className={mobileView === 'preview' ? 'is-active' : undefined}
          onClick={() => setMobileView('preview')}
        >
          <FaEye /> Preview
        </button>
      </nav>
    </div>
  )
}

export default App
