import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import AIQualifier from '../components/AIQualifier'
import { useLanguage } from '../context/LanguageContext'
import en from '../translations/en'
import pl from '../translations/pl'

function useT() {
  const { lang } = useLanguage()
  return lang === 'pl' ? pl.home : en.home
}

function boldify(text) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

/* ─── Reveal wrapper ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Section wrapper ─────────────────────────────────── */
function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {children}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
function Hero() {
  const t = useT()
  return (
    <section className="relative min-h-screen bg-navy overflow-hidden flex flex-col justify-center pt-24 pb-16">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(109,63,209,0.18) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 left-1/5 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,123,58,0.12) 0%, transparent 70%)' }} />

      {/* Floating social proof badges */}
      <div className="absolute top-32 right-8 md:right-16 float-a hidden sm:block">
        <div className="bg-amber/10 border border-amber/25 backdrop-blur-sm text-cream text-xs
          font-hand font-medium px-4 py-2 rounded-full whitespace-nowrap shadow-lg">
          {t.badge1}
        </div>
      </div>
      <div className="absolute bottom-32 right-12 md:right-24 float-b hidden sm:block">
        <div className="bg-green/10 border border-green/25 backdrop-blur-sm text-cream text-xs
          font-hand font-medium px-4 py-2 rounded-full whitespace-nowrap shadow-lg">
          {t.badge2}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 w-full">
        <div className="hero-item inline-flex items-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
          </span>
          <span className="text-sm font-medium text-cream/60">{t.nowTaking}</span>
        </div>

        <p className="hero-item text-sm font-medium text-cream/50 mb-4">
          {t.greeting}
        </p>

        <h1 className="hero-item font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-cream max-w-3xl"
          style={{ letterSpacing: '-0.02em' }}>
          {t.h1a}<br />
          <span style={{ color: '#c9aaff' }}>{t.h1b}</span><br />
          {t.h1c}
        </h1>

        <p className="hero-item mt-6 text-base md:text-lg text-cream/55 max-w-xl leading-relaxed">
          {t.heroSub}
        </p>

        <div className="hero-item mt-8 flex flex-wrap gap-3 items-center">
          <Link to="/contact" className="btn-primary text-base px-6 py-3.5">
            {t.ctaPrimary}
          </Link>
          <Link to="/work" className="inline-flex items-center gap-2 text-sm font-medium text-cream/60 hover:text-cream transition-colors px-2 py-1">
            {t.ctaSecondary}
          </Link>
        </div>

        <p className="hero-item mt-4 text-xs text-cream/35">
          {t.heroNote}
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-bounce">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-cream/30">
          <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}

const SERVICE_ICONS = [
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 21h8M12 18v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13 3L4 14h8l-1 7 9-11h-8l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
]

/* ══════════════════════════════════════════════════════
   SERVICES
══════════════════════════════════════════════════════ */
function Services() {
  const t = useT()
  return (
    <Section className="bg-cream">
      <Reveal>
        <span className="section-label">{t.servicesLabel}</span>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5 mt-2">
        {t.services.map(({ title, body }, i) => (
          <Reveal key={title} delay={i * 80}>
            <div className="card group h-full flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-violet-t flex items-center justify-center text-violet mb-5">
                {SERVICE_ICONS[i]}
              </div>
              <h3 className="font-serif text-xl text-navy mb-2">{title}</h3>
              <p className="text-sm text-navy/60 leading-relaxed flex-1">{body}</p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center hover:opacity-75 transition-opacity"
                style={{ fontSize: '13px', color: '#6d3fd1', fontWeight: 500 }}
              >
                {t.letsTalk}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════
   CASE STUDY
══════════════════════════════════════════════════════ */
function CaseStudy() {
  const t = useT()
  return (
    <Section className="bg-navy relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        <Reveal>
          <span className="section-label" style={{ color: 'rgba(201,170,255,0.5)', borderColor: 'transparent' }}>
            {t.caseLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-cream mt-2 leading-snug" style={{ letterSpacing: '-0.02em' }}>
            {t.caseH2a}<br />
            <span style={{ color: '#c9aaff' }}>{t.caseH2b}</span>
          </h2>
          <p className="mt-5 text-cream/55 text-sm leading-relaxed">
            {t.casePara1}
          </p>
          <p className="mt-3 text-cream/55 text-sm leading-relaxed font-medium">
            {t.casePara2}
          </p>
          <ul className="mt-3 space-y-1.5">
            {t.caseList.map(item => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-cream/60">
                <span className="mt-1 shrink-0 text-violet-l">→</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="bg-cream/5 border border-white/10 rounded-2xl p-7">
            <p className="text-xs font-medium tracking-widest uppercase text-cream/30 mb-5">{t.caseResults}</p>
            {t.caseStats.map(({ stat, desc }) => (
              <div key={stat} className="flex items-start gap-3 mb-5 last:mb-0">
                <span className="shrink-0 text-violet-l text-base leading-none mt-0.5">→</span>
                <div>
                  <span className="font-serif text-xl text-cream">{stat} </span>
                  <span className="text-sm text-cream/50">{desc}</span>
                </div>
              </div>
            ))}
            <Link
              to="/work"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-violet-l hover:text-white transition-colors"
            >
              {t.caseMoreWork}
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════════════════ */
function HowItWorks() {
  const t = useT()
  return (
    <Section className="bg-cream-t">
      <div className="max-w-2xl">
        <Reveal>
          <span className="section-label">{t.processLabel}</span>
          <h2 className="font-serif text-3xl md:text-4xl text-navy mt-2" style={{ letterSpacing: '-0.02em' }}>
            {t.processH2}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.steps.map(({ n, title, body }, i) => (
          <Reveal key={n} delay={i * 80}>
            <div className="relative">
              <span className="font-serif text-5xl text-navy/8 select-none">{n}</span>
              <div className="-mt-4">
                <h3 className="font-serif text-lg text-navy mb-2">{title}</h3>
                <p className="text-sm text-navy/55 leading-relaxed">{body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════
   PRICING
══════════════════════════════════════════════════════ */
function Pricing() {
  const t = useT()
  return (
    <Section className="bg-cream">
      <Reveal>
        <span className="section-label">{t.pricingLabel}</span>
        <h2 className="font-serif text-3xl md:text-4xl text-navy mt-2" style={{ letterSpacing: '-0.02em' }}>
          {t.pricingH2a}<br />{t.pricingH2b}
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-8 max-w-2xl">
          <p className="text-navy/60 text-base leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
            {t.pricingPara1}
          </p>
          <p className="mt-4 text-navy/60 text-base leading-relaxed">
            {t.pricingPara2}
          </p>

          <div className="mt-6 space-y-2">
            {t.pricingLines.map(line => (
              <p key={line} className="font-semibold text-navy text-base flex items-center gap-2">
                <span className="text-violet">→</span>
                {line}
              </p>
            ))}
          </div>

          <p className="mt-6 text-navy/60 text-base leading-relaxed">
            {t.pricingPara3}
          </p>

          <div className="mt-8 flex flex-col items-start gap-3">
            <Link to="/contact" className="btn-primary">
              {t.pricingCta}
            </Link>
            <p className="text-sm text-navy/45 italic">
              {t.pricingNote}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════ */
function Testimonials() {
  const t = useT()
  return (
    <Section className="bg-cream">
      <Reveal>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6d3fd1', marginBottom: '12px' }}>
          {t.testimonialsLabel}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl" style={{ letterSpacing: '-0.02em', color: '#1a1228' }}>
          {t.testimonialsH2a}<em>{t.testimonialsH2em}</em>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5 mt-8">
        {t.testimonials.map(({ quote, name, role, initial }, i) => (
          <Reveal key={i} delay={i * 100}>
            <div style={{
              background: 'rgba(255,255,255,0.72)',
              border: '1px solid rgba(180,160,220,0.25)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              padding: '28px',
            }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {[0,1,2,3,4].map(j => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Large opening quote */}
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '52px', lineHeight: '0.6', color: '#d4bfff', marginBottom: '10px' }}>
                &ldquo;
              </div>

              {/* Quote text */}
              <p style={{ fontStyle: 'italic', fontSize: '15px', color: '#1a1228', lineHeight: '1.75', marginBottom: '22px' }}>
                {boldify(quote)}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c97b3a, #e8a87c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '13px', fontWeight: 700, flexShrink: 0,
                }}>
                  {initial}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#1a1228', margin: 0 }}>{name}</p>
                  <p style={{ fontSize: '12px', color: '#7a6e85', margin: '2px 0 0 0' }}>{role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════
   TEMPLATES TEASER
══════════════════════════════════════════════════════ */
function TemplatesTeaser() {
  const t = useT()
  return (
    <Section className="bg-cream">
      <div className="border border-navy/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <Reveal>
            <span className="section-label">{t.teaserLabel}</span>
            <h2 className="font-serif text-2xl md:text-3xl text-navy mt-2" style={{ letterSpacing: '-0.02em' }}>
              {t.teaserH2}
            </h2>
            <p className="text-sm text-navy/55 leading-relaxed mt-3 max-w-md">
              {t.teaserBody}
            </p>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <Link to="/templates" className="btn-secondary shrink-0">
            {t.teaserCta}
          </Link>
        </Reveal>
      </div>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════
   FINAL CTA
══════════════════════════════════════════════════════ */
function FinalCTA() {
  const t = useT()
  return (
    <section className="bg-navy py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-5xl text-cream max-w-2xl mx-auto leading-tight" style={{ letterSpacing: '-0.02em' }}>
            {t.finalH2a}<br />
            <span style={{ color: '#c9aaff' }}>{t.finalH2b}</span>
          </h2>
          <p className="mt-5 text-cream/50 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            {t.finalSub}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary text-base px-7 py-3.5">
              {t.finalCta1}
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 text-cream/50 hover:text-cream text-sm font-medium px-3 py-1 transition-colors">
              {t.finalCta2}
            </Link>
          </div>
          <p className="mt-4 text-xs text-cream/30">
            {t.finalNote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════════════ */
function AnchorCopy() {
  const t = useT()
  return (
    <div className="bg-cream">
      <p style={{
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: '14px',
        color: '#7a6e85',
        margin: '0 auto',
        maxWidth: '400px',
        padding: '0 20px 24px',
      }}>
        {t.anchorCopy[0]}<br />
        {t.anchorCopy[1]}
      </p>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />

      {/* Anchor copy */}
      <AnchorCopy />

      {/* AI Qualifier — Change 4 */}
      <section className="bg-cream">
        <AIQualifier />
      </section>

      <CaseStudy />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <TemplatesTeaser />
      <FinalCTA />
    </>
  )
}
