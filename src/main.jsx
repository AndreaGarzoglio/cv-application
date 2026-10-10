import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { GOOGLE_FONTS_URL } from './data/fonts.js'

// Load every resume font up front so switching fonts is instant.
const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href = GOOGLE_FONTS_URL
document.head.append(fontLink)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
