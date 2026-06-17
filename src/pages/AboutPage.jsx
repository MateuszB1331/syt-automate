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

export default function AboutPage() {
  const { lang } = useLanguage()
  const t = lang === 'pl' ? pl.about : en.about

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

      {/* Content */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl space-y-14">

            <Reveal>
              <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4" style={{ letterSpacing: '-0.02em' }}>
                {t.whyTitle}
              </h2>
              <p className="text-navy/60 leading-relaxed text-sm md:text-base">
                {t.whyPara1}
              </p>
              <p className="mt-4 text-navy/60 leading-relaxed text-sm md:text-base">
                {t.whyPara2}
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4" style={{ letterSpacing: '-0.02em' }}>
                {t.whatTitle}
              </h2>
              <p className="text-navy/60 leading-relaxed text-sm md:text-base">
                {t.whatPara1}
              </p>
              <p className="mt-4 text-navy/60 leading-relaxed text-sm md:text-base">
                {t.whatPara2}
              </p>

              {/* Tech stack */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['Next.js', 'React', 'Supabase', 'n8n', 'HubSpot', 'Claude API', 'Framer', 'Stripe', 'Tailwind CSS', 'Resend'].map(tech => (
                  <span key={tech} className="text-xs px-3 py-1.5 rounded-full bg-navy/5 text-navy/55 border border-navy/10 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4" style={{ letterSpacing: '-0.02em' }}>
                {t.notTitle}
              </h2>
              <ul className="space-y-2.5">
                {t.notItems.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-navy/60">
                    <span className="shrink-0 mt-0.5 text-amber">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <div className="border border-violet/20 bg-violet-t rounded-2xl p-7">
                <p className="text-xs font-medium tracking-widest uppercase text-violet/50 mb-3">{t.honestLabel}</p>
                <p className="text-navy/70 leading-relaxed text-sm md:text-base">
                  {t.honestBody}
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream-t">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="text-center">
              <Link to="/contact" className="btn-primary text-base px-7 py-3.5">
                {t.ctaBtn}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
