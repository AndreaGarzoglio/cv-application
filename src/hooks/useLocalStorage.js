import { useEffect, useState } from 'react'

function readStorage(key, fallback, merge) {
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) {
      const stored = JSON.parse(raw)
      return merge ? merge(stored) : stored
    }
  } catch {
    // Corrupted or unavailable storage: fall back to defaults.
  }
  return typeof fallback === 'function' ? fallback() : fallback
}

export function useLocalStorage(key, fallback, merge) {
  const [value, setValue] = useState(() => readStorage(key, fallback, merge))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Quota exceeded or storage disabled: keep working in memory.
    }
  }, [key, value])

  return [value, setValue]
}
