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

export default function WorkPage() {
  const { lang } = useLanguage()
  const t = lang === 'pl' ? pl.work : en.work

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

      {/* Case studies */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-5 md:px-8 space-y-20">
          {t.caseStudies.map(({ label, title, problem, what, tech, results, image, imageAlt }, i) => (
            <Reveal key={i}>
              <div className="border border-navy/10 rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="h-56 md:h-72 overflow-hidden">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-7 md:p-10">
                  {/* Label */}
                  <span className="inline-block text-xs font-medium tracking-widest uppercase text-violet bg-violet-t px-3 py-1 rounded-full mb-4">
                    {label}
                  </span>

                  <h2 className="font-serif text-2xl md:text-3xl text-navy mb-5" style={{ letterSpacing: '-0.02em' }}>
                    {title}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-2">{t.theProblem}</p>
                        <p className="text-sm text-navy/60 leading-relaxed">{problem}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-2">{t.whatWeBuilt}</p>
                        <p className="text-sm text-navy/60 leading-relaxed">{what}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-1">{t.tech}</p>
                        <p className="text-sm text-navy/45">{tech}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-4">{t.results}</p>
                      <ul className="space-y-3">
                        {results.map(r => (
                          <li key={r} className="flex items-start gap-3">
                            <span className="shrink-0 mt-0.5 text-violet text-base leading-none">→</span>
                            <span className="text-sm text-navy/70 leading-relaxed">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <p className="text-sm text-navy/35 italic text-center pb-4">
              {t.moreSoon}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-cream mb-3" style={{ letterSpacing: '-0.02em' }}>
              {t.ctaH2}
            </h2>
            <Link to="/contact" className="btn-primary mt-3">
              {t.ctaBtn}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
