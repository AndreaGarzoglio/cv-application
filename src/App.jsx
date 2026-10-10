import Topbar from './components/Topbar.jsx'
import Editor from './components/editor/Editor.jsx'
import Preview from './components/preview/Preview.jsx'
import Resume from './components/preview/Resume.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { createSampleResume, mergeResume } from './data/sampleResume.js'
import { DEFAULT_DESIGN, mergeDesign } from './data/design.js'
import './styles/App.css'

function App() {
  const [resume, setResume] = useLocalStorage('cv-builder:resume', createSampleResume, mergeResume)
  const [design] = useLocalStorage('cv-builder:design', DEFAULT_DESIGN, mergeDesign)

  const updateResume = (key, value) => setResume((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="app">
      <Topbar onDownload={() => window.print()} />
      <div className="workspace">
        <aside className="workspace__editor">
          <Editor resume={resume} onChange={updateResume} />
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
