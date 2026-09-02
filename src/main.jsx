import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from 'oks-ui'

import './index.css'
import 'oks-ui/styles.css'
import './styles/theme.css'

import App from './App.jsx'

const stored = (() => {
  try {
    return localStorage.getItem('elosh-theme')
  } catch {
    return null
  }
})()
if (stored === 'dark') document.documentElement.setAttribute('data-theme', 'dark')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastProvider position="top-right">
        <App />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
