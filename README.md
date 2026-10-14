# CV Builder

A modern, dark-themed resume builder made with React and Vite. It started as the
[CV Application](https://www.theodinproject.com/lessons/node-path-react-new-cv-application)
assignment from The Odin Project and grew into a full builder inspired by FlowCV.

Edit your content on the left and watch an A4 preview update live on the right.

**Live demo:** [cv-application-neon-three.vercel.app](https://cv-application-neon-three.vercel.app/) (hosted on Vercel)

## Features

**Content**

- Personal details: name, job title and photo (resized in the browser)
- Contacts picked from a searchable pool of 40+ platforms (email, phone,
  LinkedIn, GitHub, Discord, Behance, ArtStation…) with icons and smart links
- Languages with five fluency levels and an optional certificate
- Skills grouped in custom categories, each skill with its own level
- Interests as quick chips
- Profile summary, professional experience and education with dates,
  "currently here" toggle, location, grade and descriptions
- Descriptions support `- ` bullet points and `**bold**`
- Rename, hide, reorder, duplicate and collapse sections and entries

**Customization**

- 12 built-in presets, all editable, plus your own saved presets. The default,
  Twilight, is a dark theme with muted indigo-violet and magenta accents
- Sidebar left / sidebar right / one-column layouts with adjustable sidebar width
- Section order, including moving sections between columns
- Full color control: two accents blended into gradients, page and sidebar colors
- 22 Google Fonts for headings and body, font size and line height
- Page margins and section spacing
- Eight section-heading styles, optional section icons, uppercase toggle
- Photo shape (circle, rounded, square, hexagon, blob, arch), size and gradient ring
- Background shapes (glow, circles, dots, wave, diagonal) and gradient name
- Level style for skills and languages (dots, segments, bar, text, tags)
- Entry layout (dates right, stacked, timeline)
- Date format and resume language (English, Italiano, Español, Français,
  Deutsch, Português)

**Everything else**

- Download as PDF through the browser's print dialog, at true A4 size
- Real pagination: blocks never get cut by a page break and every page keeps
  its top margin, in the preview and in the PDF
- Zoom controls
- Autosave to `localStorage`, JSON import/export, example data and reset
- Responsive: on mobile you switch between editor and preview

## Exporting a PDF

Click **Download PDF** and choose **Save as PDF** as the destination in the
print dialog. Margins and backgrounds are handled by the app; leave the
paper size on A4.

## Project structure

```
src/
  components/
    editor/      content editor (sections, entries, platform picker)
    customize/   design panel (presets, layout, colors, typography…)
    preview/     A4 preview and resume renderer
    ui/          small reusable inputs
  data/          sample resume, presets, fonts, platforms, levels, locales
  hooks/         useLocalStorage, useMenu
  utils/         list helpers, dates, files, image resizing
  styles/        one stylesheet per area, plus print.css
```
