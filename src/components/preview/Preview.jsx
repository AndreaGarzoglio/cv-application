import { useEffect, useRef, useState } from 'react'
import { FaExpand, FaMagnifyingGlassMinus, FaMagnifyingGlassPlus } from 'react-icons/fa6'
import { PAGE_WIDTH } from '../../data/design.js'
import '../../styles/Preview.css'

const GUTTER = 48
const MOBILE_GUTTER = 12
const MIN_ZOOM = 0.3
const MAX_ZOOM = 2

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

function Preview({ children }) {
  const scrollRef = useRef(null)
  const [available, setAvailable] = useState(PAGE_WIDTH)
  const [zoom, setZoom] = useState(null) // null = fit to width

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width))
    observer.observe(scrollRef.current)
    return () => observer.disconnect()
  }, [])

  const gutter = available < 600 ? MOBILE_GUTTER : GUTTER
  const fitScale = clamp((available - gutter * 2) / PAGE_WIDTH, 0.1, 1.2)
  const scale = zoom ?? fitScale
  const stepZoom = (delta) =>
    setZoom(clamp(Math.round((scale + delta) * 10) / 10, MIN_ZOOM, MAX_ZOOM))

  return (
    <div className="preview">
      <div className="preview__scroll" ref={scrollRef}>
        <div className="preview__stage" style={{ zoom: scale }}>
          {children}
        </div>
      </div>

      <div className="preview__toolbar">
        <button
          type="button"
          className="icon-btn"
          title="Zoom out"
          disabled={scale <= MIN_ZOOM}
          onClick={() => stepZoom(-0.1)}
        >
          <FaMagnifyingGlassMinus size={13} />
        </button>
        <span className="preview__zoom-value">{Math.round(scale * 100)}%</span>
        <button
          type="button"
          className="icon-btn"
          title="Zoom in"
          disabled={scale >= MAX_ZOOM}
          onClick={() => stepZoom(0.1)}
        >
          <FaMagnifyingGlassPlus size={13} />
        </button>
        <span className="preview__divider" />
        <button
          type="button"
          className={`icon-btn${zoom === null ? ' is-active' : ''}`}
          title="Fit to width"
          onClick={() => setZoom(null)}
        >
          <FaExpand size={13} />
        </button>
      </div>
    </div>
  )
}

export default Preview
