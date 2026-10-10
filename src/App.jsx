import Topbar from './components/Topbar.jsx'
import GeneralInfo from './components/GeneralInfo.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <Topbar onDownload={() => window.print()} />
      <div className="workspace">
        <aside className="workspace__editor">
          <GeneralInfo />
          <Education />
          <Experience />
        </aside>
        <main className="workspace__preview">
          <div className="preview-placeholder">Preview</div>
        </main>
      </div>
    </div>
  )
}

export default App
