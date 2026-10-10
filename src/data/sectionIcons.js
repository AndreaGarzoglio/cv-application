import {
  FaAddressBook,
  FaBriefcase,
  FaGraduationCap,
  FaHeart,
  FaIdBadge,
  FaLanguage,
  FaLayerGroup,
} from 'react-icons/fa6'

// One icon per resume section, shared by the editor and the resume.
export const SECTION_ICONS = {
  contacts: FaAddressBook,
  languages: FaLanguage,
  skills: FaLayerGroup,
  interests: FaHeart,
  profile: FaIdBadge,
  experience: FaBriefcase,
  education: FaGraduationCap,
}
