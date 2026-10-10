// Language used for the generated resume text (dates, "Present", "Grade").
export const RESUME_LANGUAGES = {
  en: { label: 'English', present: 'Present', grade: 'Grade' },
  it: { label: 'Italiano', present: 'Presente', grade: 'Voto' },
  es: { label: 'Español', present: 'Actualidad', grade: 'Nota' },
  fr: { label: 'Français', present: 'Aujourd’hui', grade: 'Note' },
  de: { label: 'Deutsch', present: 'Heute', grade: 'Note' },
  pt: { label: 'Português', present: 'Atual', grade: 'Nota' },
}

export const getStrings = (lang) => RESUME_LANGUAGES[lang] ?? RESUME_LANGUAGES.en
