export const PAGE_WIDTH = 794 // A4 width at 96 DPI
export const PAGE_HEIGHT = 1123 // A4 height at 96 DPI

export const DEFAULT_DESIGN = {
  presetId: 'midnight',
  layout: 'left',
  sidebarWidth: 34,
  colors: {
    accent: '#38bdf8',
    pageBg: '#ffffff',
    text: '#334155',
    heading: '#0f172a',
    sidebarBg: '#0f1c2e',
    sidebarText: '#cbd5e1',
    sidebarHeading: '#ffffff',
  },
  bodyFont: 'Inter',
  headingFont: 'Inter',
  fontSize: 13,
  lineHeight: 1.5,
  pageMargin: 36,
  sectionGap: 24,
  headingStyle: 'underline',
  headingUppercase: true,
  showPhoto: true,
  photoShape: 'circle',
  photoSize: 128,
  skillStyle: 'dots',
  languageStyle: 'dots',
  interestStyle: 'tags',
  dateFormat: 'short',
  resumeLanguage: 'en',
  entryLayout: 'split',
  showContactIcons: true,
}

export function mergeDesign(stored) {
  return {
    ...DEFAULT_DESIGN,
    ...stored,
    colors: { ...DEFAULT_DESIGN.colors, ...stored.colors },
  }
}
