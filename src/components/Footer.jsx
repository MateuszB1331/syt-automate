import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useLanguage } from '../context/LanguageContext'
import en from '../translations/en'
import pl from '../translations/pl'

export default function Footer() {
  const { lang } = useLanguage()
  const t = (lang === 'pl' ? pl : en).footer
  const nav = (lang === 'pl' ? pl : en).nav

  const NAV = [
    { to: '/work',      label: nav.work      },
    { to: '/services',  label: nav.services  },
    { to: '/templates', label: nav.templates },
    { to: '/about',     label: nav.about     },
    { to: '/contact',   label: t.contact     },
  ]

  return (
    <footer className="bg-navy text-cream">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid sm:grid-cols-2 md:grid-cols-3 gap-10 border-b border-white/10">

        {/* Brand */}
        <div>
          <Logo dark={true} />
          <p className="mt-4 text-sm text-cream/50 leading-relaxed max-w-xs">
            {t.tagline}
          </p>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-sm text-cream/40 hover:text-cream/80 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4 6.5v5M4 4.5v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M8 11.5V9a1.5 1.5 0 0 1 3 0v2.5M8 6.5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.linkedin}
          </a>
        </div>

        {/* Nav */}
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-cream/30 mb-4">{t.pages}</p>
          <nav className="flex flex-col gap-2.5">
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-cream/50 hover:text-cream transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-cream/30 mb-4">{t.contact}</p>
          <a
            href="mailto:kontakt@sytautomate.com"
            className="text-sm text-violet-l hover:text-white transition-colors block mb-5"
          >
            kontakt@sytautomate.com
          </a>
          <p className="text-xs text-cream/30 leading-relaxed">
            {t.location[0]}<br/>
            {t.location[1]}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 mt-5 px-4 py-2.5 bg-violet text-white
              text-sm font-medium rounded-full hover:bg-violet-d transition-colors"
          >
            {t.bookAudit}
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-cream/25">
          {t.copyright}
        </p>
        <p className="text-xs text-cream/20">
          {t.trusted}
        </p>
      </div>
    </footer>
  )
}
