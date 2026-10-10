export const LANGUAGE_LEVELS = ['Beginner', 'Elementary', 'Intermediate', 'Fluent', 'Native']
export const SKILL_LEVELS = ['Novice', 'Beginner', 'Skilled', 'Experienced', 'Expert']

export const levelLabel = (labels, level) => (level > 0 ? labels[level - 1] : '')
