import { uid } from '../utils/list.js'

export const DEFAULT_SECTION_TITLES = {
  contacts: 'Contact',
  languages: 'Languages',
  skills: 'Skills',
  interests: 'Interests',
  profile: 'Profile',
  experience: 'Professional Experience',
  education: 'Education',
}

export function createEmptyResume() {
  return {
    personal: { fullName: '', jobTitle: '', photo: '' },
    contacts: [],
    languages: [],
    skillCategories: [],
    interests: [],
    profile: '',
    experience: [],
    education: [],
    sectionTitles: { ...DEFAULT_SECTION_TITLES },
    hiddenSections: [],
  }
}

export function createSampleResume() {
  return {
    personal: {
      fullName: 'Alex Rivera',
      jobTitle: 'Frontend Developer',
      photo: '',
    },
    contacts: [
      { id: uid(), platform: 'email', value: 'alex.rivera@email.com' },
      { id: uid(), platform: 'phone', value: '+39 333 123 4567' },
      { id: uid(), platform: 'location', value: 'Milan, Italy' },
      { id: uid(), platform: 'linkedin', value: 'linkedin.com/in/alexrivera' },
      { id: uid(), platform: 'github', value: 'github.com/alexrivera' },
      { id: uid(), platform: 'discord', value: 'alex.dev' },
    ],
    languages: [
      { id: uid(), name: 'Italian', level: 5, note: '' },
      { id: uid(), name: 'English', level: 4, note: 'IELTS 7.5' },
      { id: uid(), name: 'Spanish', level: 2, note: '' },
    ],
    skillCategories: [
      {
        id: uid(),
        name: 'Frontend',
        skills: [
          { id: uid(), name: 'HTML & CSS', level: 5 },
          { id: uid(), name: 'JavaScript', level: 4 },
          { id: uid(), name: 'React', level: 4 },
        ],
      },
      {
        id: uid(),
        name: 'Tools',
        skills: [
          { id: uid(), name: 'Git', level: 4 },
          { id: uid(), name: 'Vite', level: 3 },
          { id: uid(), name: 'Figma', level: 3 },
        ],
      },
      {
        id: uid(),
        name: 'Drawing',
        skills: [
          { id: uid(), name: 'Procreate', level: 4 },
          { id: uid(), name: 'Photoshop', level: 3 },
        ],
      },
    ],
    interests: [
      { id: uid(), name: 'Digital illustration' },
      { id: uid(), name: 'Photography' },
      { id: uid(), name: 'Hiking' },
      { id: uid(), name: 'Chess' },
    ],
    profile:
      'Frontend developer with a designer’s eye. I enjoy turning ideas into fast, accessible interfaces and I care about the small details that make a product feel polished.',
    experience: [
      {
        id: uid(),
        position: 'Junior Frontend Developer',
        company: 'Acme Studio',
        location: 'Milan, Italy',
        startDate: '2024-03',
        endDate: '',
        current: true,
        description:
          '- Built reusable React components for the company design system\n- Improved Lighthouse performance score from 62 to 95\n- Collaborated with designers to ship three client websites',
        hidden: false,
      },
      {
        id: uid(),
        position: 'Web Design Intern',
        company: 'Pixel Factory',
        location: 'Turin, Italy',
        startDate: '2023-06',
        endDate: '2023-12',
        current: false,
        description:
          '- Designed landing pages and marketing assets in Figma\n- Converted mockups into responsive HTML and CSS',
        hidden: false,
      },
    ],
    education: [
      {
        id: uid(),
        degree: 'Full Stack JavaScript',
        school: 'The Odin Project',
        location: 'Online',
        startDate: '2025-01',
        endDate: '',
        current: true,
        grade: '',
        description: 'Project-based curriculum covering HTML, CSS, JavaScript, React and Node.js.',
        hidden: false,
      },
      {
        id: uid(),
        degree: 'BSc in Computer Science',
        school: 'University of Milan',
        location: 'Milan, Italy',
        startDate: '2020-09',
        endDate: '2023-07',
        current: false,
        grade: '108/110',
        description: 'Thesis on accessible web interfaces.',
        hidden: false,
      },
    ],
    sectionTitles: { ...DEFAULT_SECTION_TITLES },
    hiddenSections: [],
  }
}

const LIST_KEYS = ['contacts', 'languages', 'skillCategories', 'interests', 'experience', 'education']

// Fill in keys added in newer versions (or missing from an imported file)
// so old or partial data keeps working.
export function mergeResume(stored) {
  const base = createEmptyResume()
  const merged = {
    ...base,
    ...stored,
    personal: { ...base.personal, ...stored.personal },
    sectionTitles: { ...base.sectionTitles, ...stored.sectionTitles },
  }
  for (const key of [...LIST_KEYS, 'hiddenSections']) {
    if (!Array.isArray(merged[key])) merged[key] = []
  }
  if (typeof merged.profile !== 'string') merged.profile = ''
  return merged
}
