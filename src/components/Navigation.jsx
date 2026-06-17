import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useLanguage } from '../context/LanguageContext'
import en from '../translations/en'
import pl from '../translations/pl'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { lang, setLang } = useLanguage()
  const t = lang === 'pl' ? pl : en

  const NAV_LINKS = [
    { to: '/work',      label: t.nav.work      },
    { to: '/services',  label: t.nav.services  },
    { to: '/templates', label: t.nav.templates },
    { to: '/about',     label: t.nav.about     },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [])

  const onLight = scrolled || menuOpen

  const handleCTA = () => {
    navigate('/contact')
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${onLight
          ? 'bg-cream/95 backdrop-blur-md border-b border-navy/10'
          : 'bg-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Logo dark={onLight ? false : true} />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-violet' :
                  onLight ? 'text-navy/60 hover:text-navy' : 'text-cream/70 hover:text-cream'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + Lang toggle + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Language toggle — desktop */}
          <div className={`hidden md:flex items-center rounded-full p-0.5 text-xs font-semibold
            ${onLight ? 'bg-navy/8' : 'bg-white/10'}`}>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                lang === 'en'
                  ? 'bg-violet text-white'
                  : onLight ? 'text-navy/50 hover:text-navy' : 'text-cream/50 hover:text-cream'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('pl')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                lang === 'pl'
                  ? 'bg-violet text-white'
                  : onLight ? 'text-navy/50 hover:text-navy' : 'text-cream/50 hover:text-cream'
              }`}
            >
              PL
            </button>
          </div>

          <button
            onClick={handleCTA}
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium
              px-4 py-2 bg-violet text-white rounded-full
              hover:bg-violet-d transition-all duration-200 active:scale-95"
          >
            {t.nav.cta}
          </button>

          <button
            onClick={() => setMenuOpen(o => !o)}
            className={`md:hidden p-2 ${onLight ? 'text-navy' : 'text-cream'}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M3 10h14M3 15h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-navy/10 px-5 py-5 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-medium text-navy/70 hover:text-navy border-b border-navy/5 last:border-0"
            >
              {label}
            </Link>
          ))}
          {/* Language toggle — mobile */}
          <div className="flex items-center gap-2 pt-3 pb-1">
            <span className="text-xs text-navy/40 font-medium">Language:</span>
            <div className="flex items-center bg-navy/8 rounded-full p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                  lang === 'en' ? 'bg-violet text-white' : 'text-navy/50'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('pl')}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                  lang === 'pl' ? 'bg-violet text-white' : 'text-navy/50'
                }`}
              >
                PL
              </button>
            </div>
          </div>

          <button
            onClick={handleCTA}
            className="mt-4 w-full py-3 bg-violet text-white text-sm font-medium rounded-full"
          >
            {t.nav.cta}
          </button>
        </div>
      )}
    </header>
  )
}
