import { FaFilePdf } from 'react-icons/fa6'
import '../styles/Topbar.css'

function Topbar({ onDownload }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__logo" aria-hidden="true">
          cv
        </span>
        <span className="topbar__name">CV Builder</span>
      </div>
      <div className="topbar__actions">
        <button
          type="button"
          className="btn btn--primary"
          title="Opens the print dialog: choose “Save as PDF”"
          onClick={onDownload}
        >
          <FaFilePdf /> Download PDF
        </button>
      </div>
    </header>
  )
}

export default Topbar
