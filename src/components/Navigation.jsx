import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'

const NAV_LINKS = [
  { to: '/work',      label: 'Work'      },
  { to: '/services',  label: 'Services'  },
  { to: '/templates', label: 'Templates' },
  { to: '/about',     label: 'About'     },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

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

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCTA}
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium
              px-4 py-2 bg-violet text-white rounded-full
              hover:bg-violet-d transition-all duration-200 active:scale-95"
          >
            Book a free audit →
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
          <button
            onClick={handleCTA}
            className="mt-4 w-full py-3 bg-violet text-white text-sm font-medium rounded-full"
          >
            Book a free audit →
          </button>
        </div>
      )}
    </header>
  )
}
