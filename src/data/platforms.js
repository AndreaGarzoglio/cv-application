import {
  FaArtstation,
  FaBehance,
  FaBluesky,
  FaCakeCandles,
  FaCar,
  FaCodepen,
  FaDev,
  FaDiscord,
  FaDribbble,
  FaEnvelope,
  FaFacebook,
  FaFigma,
  FaFlag,
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaInstagram,
  FaItchIo,
  FaKaggle,
  FaLink,
  FaLinkedin,
  FaLocationDot,
  FaMastodon,
  FaMedium,
  FaPatreon,
  FaPhone,
  FaPinterest,
  FaReddit,
  FaSkype,
  FaSlack,
  FaSoundcloud,
  FaSpotify,
  FaStackOverflow,
  FaSteam,
  FaTelegram,
  FaThreads,
  FaTiktok,
  FaTwitch,
  FaVimeo,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import { SiDeviantart, SiGmail, SiKofi, SiLeetcode, SiProtonmail } from 'react-icons/si'

const mailto = (v) => `mailto:${v.trim()}`
const tel = (v) => `tel:${v.replace(/[^\d+]/g, '')}`

// Turns "github.com/me", "@me" or "me" into a full URL.
const profile = (base) => (value) => {
  const v = value.trim()
  if (/^https?:\/\//i.test(v)) return v
  if (v.includes('.') || v.includes('/')) return `https://${v}`
  return base ? `${base}${v.replace(/^@/, '')}` : null
}

export const PLATFORM_GROUPS = [
  {
    name: 'Personal',
    platforms: {
      location: { label: 'Location', icon: FaLocationDot, placeholder: 'City, Country' },
      birthday: { label: 'Date of birth', icon: FaCakeCandles, placeholder: '01/01/2000' },
      nationality: { label: 'Nationality', icon: FaFlag, placeholder: 'Italian' },
      license: { label: 'Driving license', icon: FaCar, placeholder: 'B' },
    },
  },
  {
    name: 'Contact',
    platforms: {
      email: { label: 'Email', icon: FaEnvelope, placeholder: 'name@email.com', href: mailto },
      gmail: { label: 'Gmail', icon: SiGmail, placeholder: 'name@gmail.com', href: mailto },
      proton: { label: 'Proton Mail', icon: SiProtonmail, placeholder: 'name@proton.me', href: mailto },
      phone: { label: 'Phone', icon: FaPhone, placeholder: '+39 333 123 4567', href: tel },
      whatsapp: {
        label: 'WhatsApp',
        icon: FaWhatsapp,
        placeholder: '+39 333 123 4567',
        href: (v) => `https://wa.me/${v.replace(/\D/g, '')}`,
      },
      telegram: { label: 'Telegram', icon: FaTelegram, placeholder: '@username', href: profile('https://t.me/') },
      discord: { label: 'Discord', icon: FaDiscord, placeholder: 'username or profile link', href: profile() },
      skype: { label: 'Skype', icon: FaSkype, placeholder: 'live:username' },
      slack: { label: 'Slack', icon: FaSlack, placeholder: 'workspace.slack.com' },
    },
  },
  {
    name: 'Professional',
    platforms: {
      website: { label: 'Website', icon: FaGlobe, placeholder: 'yoursite.com', href: profile() },
      linkedin: { label: 'LinkedIn', icon: FaLinkedin, placeholder: 'linkedin.com/in/you', href: profile('https://linkedin.com/in/') },
      github: { label: 'GitHub', icon: FaGithub, placeholder: 'github.com/you', href: profile('https://github.com/') },
      gitlab: { label: 'GitLab', icon: FaGitlab, placeholder: 'gitlab.com/you', href: profile('https://gitlab.com/') },
      stackoverflow: { label: 'Stack Overflow', icon: FaStackOverflow, placeholder: 'stackoverflow.com/users/…', href: profile() },
      leetcode: { label: 'LeetCode', icon: SiLeetcode, placeholder: 'leetcode.com/u/you', href: profile('https://leetcode.com/u/') },
      kaggle: { label: 'Kaggle', icon: FaKaggle, placeholder: 'kaggle.com/you', href: profile('https://kaggle.com/') },
      codepen: { label: 'CodePen', icon: FaCodepen, placeholder: 'codepen.io/you', href: profile('https://codepen.io/') },
      devto: { label: 'DEV', icon: FaDev, placeholder: 'dev.to/you', href: profile('https://dev.to/') },
      medium: { label: 'Medium', icon: FaMedium, placeholder: 'medium.com/@you', href: profile('https://medium.com/@') },
    },
  },
  {
    name: 'Creative',
    platforms: {
      behance: { label: 'Behance', icon: FaBehance, placeholder: 'behance.net/you', href: profile('https://behance.net/') },
      dribbble: { label: 'Dribbble', icon: FaDribbble, placeholder: 'dribbble.com/you', href: profile('https://dribbble.com/') },
      artstation: { label: 'ArtStation', icon: FaArtstation, placeholder: 'artstation.com/you', href: profile('https://artstation.com/') },
      deviantart: { label: 'DeviantArt', icon: SiDeviantart, placeholder: 'deviantart.com/you', href: profile('https://deviantart.com/') },
      figma: { label: 'Figma', icon: FaFigma, placeholder: 'figma.com/@you', href: profile('https://figma.com/@') },
      pinterest: { label: 'Pinterest', icon: FaPinterest, placeholder: 'pinterest.com/you', href: profile('https://pinterest.com/') },
      vimeo: { label: 'Vimeo', icon: FaVimeo, placeholder: 'vimeo.com/you', href: profile('https://vimeo.com/') },
      soundcloud: { label: 'SoundCloud', icon: FaSoundcloud, placeholder: 'soundcloud.com/you', href: profile('https://soundcloud.com/') },
      spotify: { label: 'Spotify', icon: FaSpotify, placeholder: 'open.spotify.com/artist/…', href: profile() },
      kofi: { label: 'Ko-fi', icon: SiKofi, placeholder: 'ko-fi.com/you', href: profile('https://ko-fi.com/') },
      patreon: { label: 'Patreon', icon: FaPatreon, placeholder: 'patreon.com/you', href: profile('https://patreon.com/') },
    },
  },
  {
    name: 'Social',
    platforms: {
      x: { label: 'X / Twitter', icon: FaXTwitter, placeholder: '@username', href: profile('https://x.com/') },
      instagram: { label: 'Instagram', icon: FaInstagram, placeholder: '@username', href: profile('https://instagram.com/') },
      facebook: { label: 'Facebook', icon: FaFacebook, placeholder: 'facebook.com/you', href: profile('https://facebook.com/') },
      threads: { label: 'Threads', icon: FaThreads, placeholder: '@username', href: profile('https://threads.net/@') },
      bluesky: { label: 'Bluesky', icon: FaBluesky, placeholder: 'you.bsky.social', href: profile('https://bsky.app/profile/') },
      mastodon: { label: 'Mastodon', icon: FaMastodon, placeholder: 'mastodon.social/@you', href: profile() },
      reddit: { label: 'Reddit', icon: FaReddit, placeholder: 'u/username', href: (v) => `https://reddit.com/${v.trim().replace(/^\/?/, '')}` },
      youtube: { label: 'YouTube', icon: FaYoutube, placeholder: 'youtube.com/@you', href: profile('https://youtube.com/@') },
      tiktok: { label: 'TikTok', icon: FaTiktok, placeholder: '@username', href: profile('https://tiktok.com/@') },
      twitch: { label: 'Twitch', icon: FaTwitch, placeholder: 'twitch.tv/you', href: profile('https://twitch.tv/') },
    },
  },
  {
    name: 'Gaming & other',
    platforms: {
      steam: { label: 'Steam', icon: FaSteam, placeholder: 'steamcommunity.com/id/you', href: profile('https://steamcommunity.com/id/') },
      itchio: { label: 'itch.io', icon: FaItchIo, placeholder: 'you.itch.io', href: profile() },
      custom: { label: 'Custom link', icon: FaLink, placeholder: 'Any text or URL', href: (v) => (/^https?:\/\//i.test(v.trim()) ? v.trim() : null) },
    },
  },
]

export const PLATFORMS = Object.assign({}, ...PLATFORM_GROUPS.map((g) => g.platforms))

export function getPlatform(id) {
  return PLATFORMS[id] ?? PLATFORMS.custom
}

export function contactHref(contact) {
  const value = contact.value.trim()
  if (!value) return null
  return getPlatform(contact.platform).href?.(value) ?? null
}

export function displayValue(value) {
  return value.trim().replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/$/, '')
}
