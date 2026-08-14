import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import { useTheme } from './hooks/useTheme.js'

function App() {
  // Initialize theme as early as possible so the whole app renders themed.
  useTheme()

  useEffect(() => {
    document.title = 'Merera Taddesa | MERN Stack Developer'
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App
