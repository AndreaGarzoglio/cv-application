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

export function sectionTitle(titles, key) {
  return titles[key]?.trim() || DEFAULT_SECTION_TITLES[key]
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

// Example content, taken from andreagarzoglio.github.io/Website.
// Dates with only a year ("2021") are shown as the year alone.
export function createSampleResume() {
  return {
    personal: {
      fullName: 'Andrea Garzoglio',
      jobTitle: 'Programmer, Illustrator & Media Designer',
      photo: '/sample-portrait.webp',
    },
    contacts: [
      { id: uid(), platform: 'gmail', value: 'andrea.garzoglio@gmail.com' },
      { id: uid(), platform: 'location', value: 'Genoa, Italy' },
      { id: uid(), platform: 'birthday', value: '27/04/2000' },
      { id: uid(), platform: 'license', value: 'Type B' },
      { id: uid(), platform: 'website', value: 'andreagarzoglio.github.io/Website' },
      { id: uid(), platform: 'linkedin', value: 'linkedin.com/in/andrea-garzoglio-522668265' },
      { id: uid(), platform: 'github', value: 'github.com/AndreaGarzoglio' },
      { id: uid(), platform: 'artstation', value: 'artstation.com/garuzo' },
      { id: uid(), platform: 'instagram', value: '@garuzo_msr' },
      { id: uid(), platform: 'discord', value: 'discord.com/users/307178729912795149' },
    ],
    languages: [
      { id: uid(), name: 'Italian', level: 5, note: '' },
      { id: uid(), name: 'English', level: 4, note: '' },
    ],
    skillCategories: [
      {
        id: uid(),
        name: 'Art & design',
        skills: [
          { id: uid(), name: 'Photoshop', level: 5 },
          { id: uid(), name: 'Procreate', level: 4 },
          { id: uid(), name: 'Illustrator', level: 3 },
          { id: uid(), name: 'Blender', level: 2 },
          { id: uid(), name: 'ZBrush', level: 1 },
          { id: uid(), name: 'UI/UX design', level: 3 },
        ],
      },
      {
        id: uid(),
        name: 'Games',
        skills: [
          { id: uid(), name: 'Concept art', level: 5 },
          { id: uid(), name: 'Worldbuilding', level: 4 },
          { id: uid(), name: 'Unreal Engine', level: 3 },
          { id: uid(), name: 'Unity & C#', level: 3 },
        ],
      },
      {
        id: uid(),
        name: 'Code',
        skills: [
          { id: uid(), name: 'HTML & CSS', level: 4 },
          { id: uid(), name: 'JavaScript', level: 3 },
          { id: uid(), name: 'Git & GitHub', level: 3 },
          { id: uid(), name: 'Back end', level: 1 },
        ],
      },
      {
        id: uid(),
        name: 'Marketing',
        skills: [
          { id: uid(), name: 'Social media content', level: 4 },
          { id: uid(), name: 'Brand identity & logos', level: 3 },
          { id: uid(), name: 'Copywriting', level: 3 },
        ],
      },
    ],
    interests: [
      { id: uid(), name: 'Video games' },
      { id: uid(), name: 'Dungeons & Dragons' },
      { id: uid(), name: 'Anime & TV shows' },
      { id: uid(), name: 'Music' },
      { id: uid(), name: 'Building PCs' },
    ],
    profile:
      'Programmer, illustrator and media designer from Genoa. Ten years of drawing, sharpened into concept art at **Event Horizon School**, five years on an indie game team, a game-marketing internship and now two years of building software. Open to junior front-end, UI/UX, game concept art and media design roles, remote or in Genoa.',
    experience: [
      {
        id: uid(),
        position: 'Concept Artist & Game Writer',
        company: 'Mad Burger Studio · YMDIR',
        location: 'Milan, Italy',
        startDate: '2021',
        endDate: '',
        current: true,
        description:
          '- Concept art for characters and creatures\n- Story, lore and worldbuilding\n- Logos, UI and UX design\n- Day-to-day work in **Unreal Engine** with the dev team',
        hidden: false,
      },
      {
        id: uid(),
        position: 'Freelance Illustrator',
        company: 'Self-employed',
        location: 'Genoa, Italy',
        startDate: '2020',
        endDate: '',
        current: true,
        description:
          'Commissioned illustration for many clients: learning to **read a brief** and to hear what a client means, not just what they wrote.',
        hidden: false,
      },
      {
        id: uid(),
        position: 'Artist & Media Designer',
        company: 'Undo Studios SA · paid internship',
        location: 'Milan, Italy',
        startDate: '2024-06',
        endDate: '2024-12',
        current: false,
        description:
          '- Character illustrations for the cast of the game Nemixar\n- Social posts, announcements and campaign visuals',
        hidden: false,
      },
    ],
    education: [
      {
        id: uid(),
        degree: 'Full Stack Developer course',
        school: 'The Odin Project',
        location: 'Genoa, Italy',
        startDate: '2025-06',
        endDate: '',
        current: true,
        grade: '',
        description:
          '- Project-based curriculum: everything I build is on GitHub\n- Front end in JavaScript, HTML and CSS',
        hidden: false,
      },
      {
        id: uid(),
        degree: 'Certificate of Specialization: Concept Artist',
        school: 'Event Horizon School',
        location: 'Milan, Italy',
        startDate: '2020-10',
        endDate: '2023-12',
        current: false,
        grade: '27/30',
        description:
          '- Video-game projects worked on as a team\n- Procreate, Photoshop, Illustrator, Blender, ZBrush, Unity, Unreal Engine',
        hidden: false,
      },
      {
        id: uid(),
        degree: 'Linguistic and Cultural Mediation',
        school: 'University of Milan',
        location: 'Milan, Italy',
        startDate: '2018-09',
        endDate: '2020-10',
        current: false,
        grade: '',
        description: 'Japanese, Japanese culture and sociology of communication.',
        hidden: false,
      },
      {
        id: uid(),
        degree: 'Manga Drawing Technique course',
        school: 'Manga European Academy',
        location: 'Lajatico, Italy',
        startDate: '2017',
        endDate: '2020',
        current: false,
        grade: '',
        description: '',
        hidden: false,
      },
      {
        id: uid(),
        degree: 'Scientific High School Diploma',
        school: 'Liceo Scientifico Vittorino Bernini',
        location: 'Italy',
        startDate: '2013',
        endDate: '2018',
        current: false,
        grade: '81/100',
        description: '',
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
