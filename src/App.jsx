import GeneralInfo from './components/GeneralInfo.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import './styles/App.css'

function App() {
  return (
    <main className="cv">
      <h1>CV Application</h1>
      <GeneralInfo />
      <Education />
      <Experience />
    </main>
  )
}

export default App
