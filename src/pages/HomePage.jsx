import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

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
          ✦ Café system live in 5 days
        </div>
      </div>
      <div className="absolute bottom-32 right-12 md:right-24 float-b hidden sm:block">
        <div className="bg-green/10 border border-green/25 backdrop-blur-sm text-cream text-xs
          font-hand font-medium px-4 py-2 rounded-full whitespace-nowrap shadow-lg">
          ✓ Automation saving 4h/week
        </div>
      </div>

      {/* Floating "new clients" badge */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 w-full">
        <div className="hero-item inline-flex items-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
          </span>
          <span className="text-sm font-medium text-cream/60">Now taking new clients</span>
        </div>

        {/* Label */}
        <p className="hero-item text-sm font-medium text-cream/50 mb-4">
          Hey there, small business owner 👋
        </p>

        {/* H1 */}
        <h1 className="hero-item font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-cream max-w-3xl"
          style={{ letterSpacing: '-0.02em' }}>
          One partner.<br />
          <span style={{ color: '#c9aaff' }}>Website, automations</span><br />
          &amp; custom apps.
        </h1>

        {/* Subheadline */}
        <p className="hero-item mt-6 text-base md:text-lg text-cream/55 max-w-xl leading-relaxed">
          Stop juggling three different agencies. Get everything built and maintained
          by one person who actually understands your business. No jargon, no bloated retainers.
        </p>

        {/* CTAs */}
        <div className="hero-item mt-8 flex flex-wrap gap-3 items-center">
          <Link to="/contact" className="btn-primary text-base px-6 py-3.5">
            Get a free digital audit
          </Link>
          <Link to="/work" className="inline-flex items-center gap-2 text-sm font-medium text-cream/60 hover:text-cream transition-colors px-2 py-1">
            See our work ↗
          </Link>
        </div>

        {/* Note */}
        <p className="hero-item mt-4 text-xs text-cream/35">
          ↑ 30-min call, zero obligation — promise
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-bounce">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-cream/30">
          <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   SERVICES
══════════════════════════════════════════════════════ */
const SERVICES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 21h8M12 18v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Website',
    body: 'Fast, beautiful, built to convert. Not just to exist on the internet.',
    price: 'from $1,500',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 3L4 14h8l-1 7 9-11h-8l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Automations',
    body: 'Stop doing manually what n8n and AI can do in 90 seconds.',
    price: 'from $1,500',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Custom app',
    body: 'Built for your exact operations. Like the system we built for an 11-location café chain.',
    price: 'from $3,500',
  },
]

function Services() {
  return (
    <Section className="bg-cream">
      <Reveal>
        <span className="section-label">What we build</span>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5 mt-2">
        {SERVICES.map(({ icon, title, body, price }, i) => (
          <Reveal key={title} delay={i * 80}>
            <div className="card group h-full flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-violet-t flex items-center justify-center text-violet mb-5">
                {icon}
              </div>
              <h3 className="font-serif text-xl text-navy mb-2">{title}</h3>
              <p className="text-sm text-navy/60 leading-relaxed flex-1">{body}</p>
              <p className="mt-5 text-sm font-medium text-amber">{price}</p>
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
  return (
    <Section className="bg-navy relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left */}
        <Reveal>
          <span className="section-label" style={{ color: 'rgba(201,170,255,0.5)', borderColor: 'transparent' }}>
            Real work, real results
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-cream mt-2 leading-snug" style={{ letterSpacing: '-0.02em' }}>
            Built for a café chain.<br />
            <span style={{ color: '#c9aaff' }}>Works for yours too.</span>
          </h2>
          <p className="mt-5 text-cream/55 text-sm leading-relaxed">
            A family-run café group with 11 locations was managing inventory, staff schedules,
            and daily reports manually across spreadsheets and WhatsApp groups. Every manager
            spent hours every week doing things a system could handle in seconds.
          </p>
          <p className="mt-3 text-cream/55 text-sm leading-relaxed font-medium">
            We built them a custom web app that:
          </p>
          <ul className="mt-3 space-y-1.5">
            {[
              'Tracks inventory across all 11 locations in real time',
              'Generates daily reports automatically, no human input needed',
              'Manages staff scheduling with conflict detection',
              'Sends alerts when stock falls below threshold',
            ].map(item => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-cream/60">
                <span className="mt-1 shrink-0 text-violet-l">→</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right — results */}
        <Reveal delay={120}>
          <div className="bg-cream/5 border border-white/10 rounded-2xl p-7">
            <p className="text-xs font-medium tracking-widest uppercase text-cream/30 mb-5">Results</p>
            {[
              { stat: '6h saved', desc: 'per location, per week' },
              { stat: 'Zero', desc: 'missed restocks since launch' },
              { stat: '3 weeks', desc: 'to roll out across all 11 locations' },
            ].map(({ stat, desc }) => (
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
              See more work ↗
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
const STEPS = [
  {
    n: '01',
    title: 'Free digital audit',
    body: '30-minute call. We map out what you have, what you need, and where the biggest quick wins are. No commitment.',
  },
  {
    n: '02',
    title: 'Proposal in 48h',
    body: "You get a clear one-page proposal: what we'll build, what it costs, how long it takes. No 40-page documents.",
  },
  {
    n: '03',
    title: 'We build it',
    body: "Most projects delivered in 1–2 weeks. You're updated at every stage. No disappearing for a month.",
  },
  {
    n: '04',
    title: 'We maintain it',
    body: 'Optional monthly retainer to keep everything running, updated, and improving. From $199/month.',
  },
]

function HowItWorks() {
  return (
    <Section className="bg-cream-t">
      <div className="max-w-2xl">
        <Reveal>
          <span className="section-label">The process</span>
          <h2 className="font-serif text-3xl md:text-4xl text-navy mt-2" style={{ letterSpacing: '-0.02em' }}>
            Simple. Fast. No surprises.
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map(({ n, title, body }, i) => (
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
const PACKAGES = [
  {
    name: 'Starter',
    price: '$1,500',
    tagline: 'Your business online, done right.',
    includes: [
      '5-page website (Framer or Next.js)',
      'Mobile-responsive design',
      'Contact form → email notification',
      'Basic CMS for content updates',
      '1 month of support included',
    ],
    addon: 'Maintenance from $199/month',
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$3,500',
    tagline: 'Website + automations that work while you sleep.',
    includes: [
      'Everything in Starter',
      'Up to 10 pages',
      '2 custom automations (e.g. booking → CRM)',
      'Integration with 1 tool (Calendly, Stripe…)',
      '2 months of support included',
    ],
    addon: 'Maintenance from $450/month',
    cta: 'Get started',
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Custom System',
    price: 'from $6,000',
    tagline: 'Built exactly for your business operations.',
    includes: [
      'Everything in Growth',
      'Custom web app (inventory, scheduling…)',
      'Unlimited pages',
      'Full automation suite',
      '3 months of support included',
    ],
    addon: 'Maintenance from $800/month',
    cta: 'Get started',
    highlight: false,
  },
]

function Pricing() {
  return (
    <Section className="bg-cream">
      <Reveal>
        <span className="section-label">Pricing</span>
        <h2 className="font-serif text-3xl md:text-4xl text-navy mt-2" style={{ letterSpacing: '-0.02em' }}>
          Clear packages. No surprises.
        </h2>
      </Reveal>

      <div className="mt-10 grid md:grid-cols-3 gap-5 items-start">
        {PACKAGES.map(({ name, price, tagline, includes, addon, cta, highlight, badge }, i) => (
          <Reveal key={name} delay={i * 80}>
            <div className={`relative rounded-2xl p-7 flex flex-col h-full border transition-all
              ${highlight
                ? 'bg-navy text-cream border-violet shadow-xl shadow-violet/15'
                : 'bg-cream-t text-navy border-navy/10'}`}>

              {badge && (
                <span className="absolute -top-3 left-7 text-xs font-medium bg-violet text-white px-3 py-1 rounded-full">
                  {badge}
                </span>
              )}

              <div className="mb-5">
                <p className={`text-xs font-medium tracking-widest uppercase mb-2 ${highlight ? 'text-cream/40' : 'text-navy/40'}`}>
                  {name}
                </p>
                <p className={`font-serif text-3xl ${highlight ? 'text-cream' : 'text-navy'}`}>{price}</p>
                <p className={`text-sm mt-1 ${highlight ? 'text-cream/55' : 'text-navy/55'}`}>{tagline}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {includes.map(item => (
                  <li key={item} className={`flex items-start gap-2.5 text-sm ${highlight ? 'text-cream/70' : 'text-navy/65'}`}>
                    <svg className={`shrink-0 mt-0.5 ${highlight ? 'text-violet-l' : 'text-violet'}`} width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className={`text-xs mb-5 ${highlight ? 'text-cream/35' : 'text-navy/35'}`}>{addon}</p>

              <Link
                to="/contact"
                className={`w-full text-center py-3 rounded-full text-sm font-medium transition-all
                  ${highlight
                    ? 'bg-violet text-white hover:bg-violet-d'
                    : 'border border-navy/20 text-navy hover:border-violet hover:text-violet'}`}
              >
                {cta}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-8 text-center">
          <p className="text-sm text-navy/55 mb-3">
            Not sure which one you need? Book a free audit and we'll tell you honestly.
          </p>
          <Link to="/contact" className="btn-primary">
            Book a free audit →
          </Link>
        </div>
      </Reveal>
    </Section>
  )
}

/* ══════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote: "They built something in a week that I'd been trying to get another agency to start for 3 months.",
    name: '[Client name]',
    role: 'Owner, [Business name]',
  },
  {
    quote: "I finally stopped dreading Monday mornings. The automated reports just... appear.",
    name: '[Client name]',
    role: 'Manager, [Business name]',
  },
]

function Testimonials() {
  return (
    <Section className="bg-cream-t">
      <Reveal>
        <span className="section-label">What clients say</span>
      </Reveal>
      <div className="grid sm:grid-cols-2 gap-5 mt-4">
        {TESTIMONIALS.map(({ quote, name, role }, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="bg-cream border border-navy/10 rounded-2xl p-7">
              <p className="font-serif text-lg text-navy leading-snug mb-5">
                &ldquo;{quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium text-navy">{name}</p>
                <p className="text-xs text-navy/45 mt-0.5">{role}</p>
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
  return (
    <Section className="bg-cream">
      <div className="border border-navy/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <Reveal>
            <span className="section-label">Also available</span>
            <h2 className="font-serif text-2xl md:text-3xl text-navy mt-2" style={{ letterSpacing: '-0.02em' }}>
              n8n automation templates
            </h2>
            <p className="text-sm text-navy/55 leading-relaxed mt-3 max-w-md">
              Don't need a full project? Grab one of our ready-made n8n workflow templates —
              pre-built, documented, and ready to plug into your setup.
            </p>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <Link to="/templates" className="btn-secondary shrink-0">
            Browse templates →
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
  return (
    <section className="bg-navy py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-5xl text-cream max-w-2xl mx-auto leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Ready to stop doing<br />
            <span style={{ color: '#c9aaff' }}>everything manually?</span>
          </h2>
          <p className="mt-5 text-cream/50 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Book a free 30-minute digital audit. We'll look at your current setup, spot what's costing
            you time and money, and tell you exactly what we'd build — and what it would cost.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary text-base px-7 py-3.5">
              Book a free audit
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 text-cream/50 hover:text-cream text-sm font-medium px-3 py-1 transition-colors">
              Send us a message
            </Link>
          </div>
          <p className="mt-4 text-xs text-cream/30">
            No sales pitch. Just honest advice. If we're not the right fit, we'll tell you.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudy />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <TemplatesTeaser />
      <FinalCTA />
    </>
  )
}
