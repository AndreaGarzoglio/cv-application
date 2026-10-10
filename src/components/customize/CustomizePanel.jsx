import { FaPalette, FaSwatchbook } from 'react-icons/fa6'
import EditorSection from '../editor/EditorSection.jsx'
import PresetGallery from './PresetGallery.jsx'
import ColorSettings from './ColorSettings.jsx'
import { applyPreset } from '../../data/presets.js'
import '../../styles/Customize.css'

function CustomizePanel({ design, setDesign }) {
  const onColors = (patch) => setDesign((d) => ({ ...d, colors: { ...d.colors, ...patch } }))

  return (
    <div className="editor">
      <EditorSection icon={FaSwatchbook} title="Presets" defaultOpen>
        <PresetGallery design={design} onApply={(preset) => setDesign((d) => applyPreset(d, preset))} />
      </EditorSection>
      <EditorSection icon={FaPalette} title="Colors" defaultOpen>
        <ColorSettings design={design} onColors={onColors} />
      </EditorSection>
    </div>
  )
}

export default CustomizePanel
