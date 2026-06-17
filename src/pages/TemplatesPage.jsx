import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'
import en from '../translations/en'
import pl from '../translations/pl'

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function TemplatesPage() {
  const { lang } = useLanguage()
  const t = lang === 'pl' ? pl.templates : en.templates

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <span className="section-label" style={{ color: 'rgba(201,170,255,0.4)', borderColor: 'transparent' }}>{t.heroLabel}</span>
            <h1 className="font-serif text-4xl md:text-6xl text-cream mt-3 max-w-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
              {t.heroH1a}<br />
              <span style={{ color: '#c9aaff' }}>{t.heroH1b}</span>
            </h1>
            <p className="mt-5 text-cream/50 text-base leading-relaxed max-w-xl">
              {t.heroSub}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-lg mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-violet-t flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-violet">
                  <path d="M13 3L4 14h8l-1 7 9-11h-8l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-violet">{t.comingSoon}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-navy mt-3 mb-4" style={{ letterSpacing: '-0.02em' }}>
                {t.h2}
              </h2>
              <p className="text-navy/55 text-base leading-relaxed mb-8">
                {t.body}
              </p>
              <Link to="/contact" className="btn-primary">
                {t.cta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
