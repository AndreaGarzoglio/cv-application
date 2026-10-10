import {
  FaCamera,
  FaFont,
  FaHeading,
  FaListCheck,
  FaPalette,
  FaRulerCombined,
  FaSwatchbook,
  FaTableColumns,
} from 'react-icons/fa6'
import EditorSection from '../editor/EditorSection.jsx'
import PresetGallery from './PresetGallery.jsx'
import ColorSettings from './ColorSettings.jsx'
import LayoutSettings from './LayoutSettings.jsx'
import TypographySettings from './TypographySettings.jsx'
import HeadingSettings from './HeadingSettings.jsx'
import PhotoSettings from './PhotoSettings.jsx'
import DisplaySettings from './DisplaySettings.jsx'
import RangeField from '../ui/RangeField.jsx'
import { applyPreset } from '../../data/presets.js'
import '../../styles/Customize.css'

function CustomizePanel({ design, setDesign, customPresets, setCustomPresets, resume }) {
  const set = (patch) => setDesign((d) => ({ ...d, ...patch }))
  const onColors = (patch) => setDesign((d) => ({ ...d, colors: { ...d.colors, ...patch } }))

  return (
    <div className="editor">
      <EditorSection icon={FaSwatchbook} title="Presets" defaultOpen>
        <PresetGallery
          design={design}
          onApply={(preset) => setDesign((d) => applyPreset(d, preset))}
          customPresets={customPresets}
          setCustomPresets={setCustomPresets}
        />
      </EditorSection>
      <EditorSection icon={FaTableColumns} title="Layout">
        <LayoutSettings design={design} set={set} sectionTitles={resume.sectionTitles} />
      </EditorSection>
      <EditorSection icon={FaPalette} title="Colors">
        <ColorSettings design={design} onColors={onColors} />
      </EditorSection>
      <EditorSection icon={FaFont} title="Typography">
        <TypographySettings design={design} set={set} />
      </EditorSection>
      <EditorSection icon={FaRulerCombined} title="Spacing">
        <div className="field-stack">
          <RangeField
            label="Page margins"
            min={16}
            max={64}
            step={2}
            unit="px"
            value={design.pageMargin}
            onChange={(pageMargin) => set({ pageMargin })}
          />
          <RangeField
            label="Space between sections"
            min={10}
            max={44}
            step={1}
            unit="px"
            value={design.sectionGap}
            onChange={(sectionGap) => set({ sectionGap })}
          />
        </div>
      </EditorSection>
      <EditorSection icon={FaHeading} title="Section headings">
        <HeadingSettings design={design} set={set} />
      </EditorSection>
      <EditorSection icon={FaCamera} title="Photo">
        <PhotoSettings design={design} set={set} hasPhoto={Boolean(resume.personal.photo)} />
      </EditorSection>
      <EditorSection icon={FaListCheck} title="Details & dates">
        <DisplaySettings design={design} set={set} />
      </EditorSection>
    </div>
  )
}

export default CustomizePanel
