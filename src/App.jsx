import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import WorkPage from './pages/WorkPage'
import TemplatesPage from './pages/TemplatesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-navy overflow-x-hidden">
      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/services"   element={<ServicesPage />} />
          <Route path="/work"       element={<WorkPage />} />
          <Route path="/templates"  element={<TemplatesPage />} />
          <Route path="/about"      element={<AboutPage />} />
          <Route path="/contact"    element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
