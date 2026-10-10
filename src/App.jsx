import { useState } from 'react'
import { FaPenToSquare, FaPalette } from 'react-icons/fa6'
import Topbar from './components/Topbar.jsx'
import Editor from './components/editor/Editor.jsx'
import CustomizePanel from './components/customize/CustomizePanel.jsx'
import Preview from './components/preview/Preview.jsx'
import Resume from './components/preview/Resume.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { createSampleResume, mergeResume } from './data/sampleResume.js'
import { DEFAULT_DESIGN, mergeDesign } from './data/design.js'
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

  const updateResume = (key, value) => setResume((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="app">
      <Topbar onDownload={() => window.print()} />
      <div className="workspace">
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
    </div>
  )
}

export default App
