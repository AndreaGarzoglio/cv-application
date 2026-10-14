import { useEffect, useRef, useState } from 'react'

// Open state for a popup menu that closes on outside click or Escape.
export function useMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handlePointer = (e) => !ref.current.contains(e.target) && setOpen(false)
    const handleKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return { open, setOpen, ref }
}
