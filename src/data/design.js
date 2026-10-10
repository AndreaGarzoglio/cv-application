import { BUILT_IN_PRESETS } from './presets.js'

export const PAGE_WIDTH = 794 // A4 width at 96 DPI
export const PAGE_HEIGHT = 1123 // A4 height at 96 DPI

const defaultPreset = BUILT_IN_PRESETS[0]

export const DEFAULT_DESIGN = {
  ...structuredClone(defaultPreset.design),
  presetId: defaultPreset.id,
  showPhoto: true,
  dateFormat: 'short',
  resumeLanguage: 'en',
  sections: {
    sidebar: ['contacts', 'languages', 'skills', 'interests'],
    main: ['profile', 'experience', 'education'],
  },
}

export function mergeDesign(stored) {
  return {
    ...DEFAULT_DESIGN,
    ...stored,
    colors: { ...DEFAULT_DESIGN.colors, ...stored.colors },
    sections: { ...DEFAULT_DESIGN.sections, ...stored.sections },
  }
}
