import { useCallback, useRef, useState } from 'react'
import {
  FaChevronDown,
  FaEraser,
  FaFileExport,
  FaFileImport,
  FaFilePdf,
  FaWandMagicSparkles,
} from 'react-icons/fa6'
import { useDismiss } from '../hooks/useDismiss.js'
import '../styles/Topbar.css'

function DataMenu({ onExport, onImport, onLoadSample, onClear }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const fileInput = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, close, open)

  function run(action) {
    setOpen(false)
    action()
  }

  function pickFile() {
    setOpen(false)
    fileInput.current.click()
  }

  return (
    <div className="menu" ref={ref}>
      <button
        type="button"
        className="btn"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        Data <FaChevronDown size={10} className={`menu__chevron${open ? ' is-open' : ''}`} />
      </button>
      {open && (
        <div className="menu__list" role="menu">
          <button type="button" role="menuitem" onClick={() => run(onExport)}>
            <FaFileExport /> Export as JSON
          </button>
          <button type="button" role="menuitem" onClick={pickFile}>
            <FaFileImport /> Import JSON
          </button>
          <hr />
          <button type="button" role="menuitem" onClick={() => run(onLoadSample)}>
            <FaWandMagicSparkles /> Load example
          </button>
          <button type="button" role="menuitem" className="is-danger" onClick={() => run(onClear)}>
            <FaEraser /> Clear everything
          </button>
        </div>
      )}
      <input
        ref={fileInput}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={(e) => {
          const file = e.target.files[0]
          e.target.value = ''
          if (file) onImport(file)
        }}
      />
    </div>
  )
}

function Topbar({ onDownload, ...dataActions }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__logo" aria-hidden="true">
          cv
        </span>
        <span className="topbar__name">CV Builder</span>
      </div>
      <div className="topbar__actions">
        <DataMenu {...dataActions} />
        <button
          type="button"
          className="btn btn--primary"
          title="Opens the print dialog: choose “Save as PDF”"
          onClick={onDownload}
        >
          <FaFilePdf /> <span className="topbar__label">Download PDF</span>
        </button>
      </div>
    </header>
  )
}

export default Topbar
