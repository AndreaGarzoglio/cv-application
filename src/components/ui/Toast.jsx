import { useEffect } from 'react'

function Toast({ toast, onDone }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(onDone, 3200)
    return () => clearTimeout(timer)
  }, [toast, onDone])

  if (!toast) return null
  return (
    <div key={toast.id} className={`toast toast--${toast.type}`} role="status">
      {toast.message}
    </div>
  )
}

export default Toast
