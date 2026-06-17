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

function Section({ className = '', children }) {
  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">{children}</div>
    </section>
  )
}

/* ─── Service block ─────────────────────────────────── */
function ServiceBlock({ tag, title, body, builtWith, includes, price, deliver, whatsIncluded, builtWithLabel, reverse = false }) {
  return (
    <div className="py-16 md:py-20 border-b border-navy/10 last:border-0">
      <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-start ${reverse ? 'direction-rtl' : ''}`}>
        <Reveal>
          <span className="section-label">{tag}</span>
          <h2 className="font-serif text-2xl md:text-3xl text-navy mt-2 leading-snug" style={{ letterSpacing: '-0.02em' }}>
            {title}
          </h2>
          <p className="mt-4 text-sm text-navy/60 leading-relaxed">{body}</p>
          <p className="mt-5 text-xs font-medium tracking-widest uppercase text-navy/35">{builtWithLabel}</p>
          <p className="mt-1 text-sm text-navy/55">{builtWith}</p>
          <div className="mt-5 pt-5 border-t border-navy/10 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-amber">{price}</span>
            <span className="text-navy/20">·</span>
            <span className="text-sm text-navy/45">{deliver}</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-cream-t border border-navy/10 rounded-2xl p-6">
            <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-4">{whatsIncluded}</p>
            <ul className="space-y-3">
              {includes.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy/65">
                  <svg className="shrink-0 mt-0.5 text-violet" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const { lang } = useLanguage()
  const t = lang === 'pl' ? pl.services : en.services

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
              {t.heroH1b}<span style={{ color: '#c9aaff' }}>{t.heroH1em}</span>
            </h1>
            <p className="mt-5 text-cream/50 text-base leading-relaxed max-w-xl">
              {t.heroSub}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services detail */}
      <Section className="bg-cream">
        {t.blocks.map((block, i) => (
          <ServiceBlock
            key={block.tag}
            {...block}
            whatsIncluded={t.whatsIncluded}
            builtWithLabel={t.builtWith}
            reverse={i % 2 === 1}
          />
        ))}
      </Section>

      {/* FAQ */}
      <section className="py-16 bg-cream-t">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <span className="section-label">{t.faqLabel}</span>
            <h2 className="font-serif text-2xl md:text-3xl text-navy mt-2 mb-8" style={{ letterSpacing: '-0.02em' }}>
              {t.faqH2}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="max-w-2xl">
              <div className="border-t border-navy/10 py-6">
                <h3 className="font-medium text-navy mb-3">{t.faqQ}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">
                  {t.faqA}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream-t">
        <div className="max-w-6xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl text-navy mb-3" style={{ letterSpacing: '-0.02em' }}>
              {t.ctaH2}
            </h2>
            <p className="text-sm text-navy/55 mb-6">
              {t.ctaSub}
            </p>
            <Link to="/contact" className="btn-primary">
              {t.ctaBtn}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
