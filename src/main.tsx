import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import TallyPrivacy from './pages/TallyPrivacy.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tally-privacy" element={<TallyPrivacy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
