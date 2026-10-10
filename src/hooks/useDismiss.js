import { useEffect } from 'react'

// Calls onDismiss on outside click or Escape while `active` is true.
export function useDismiss(ref, onDismiss, active = true) {
  useEffect(() => {
    if (!active) return
    const handlePointer = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onDismiss()
    }
    const handleKey = (e) => e.key === 'Escape' && onDismiss()
    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [ref, onDismiss, active])
}
