import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <span className="section-label" style={{ color: 'rgba(201,170,255,0.4)', borderColor: 'transparent' }}>About</span>
            <h1 className="font-serif text-4xl md:text-6xl text-cream mt-3 max-w-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Built by one person.<br />
              <span style={{ color: '#c9aaff' }}>For real businesses.</span>
            </h1>
            <p className="mt-5 text-cream/50 text-base leading-relaxed max-w-xl">
              SYT&amp;Automate is me — Mateusz. Based in Poland. Working with small businesses
              in the UK, US, EU, and wherever else the internet reaches.
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
                Why I started this
              </h2>
              <p className="text-navy/60 leading-relaxed text-sm md:text-base">
                I spent years building automation systems and AI pipelines for a fast-growing EdTech company.
                I watched the same problem play out over and over: small businesses doing manually what machines
                could do in seconds, or spending $10,000 with an agency for something that should cost $2,000
                and take two weeks.
              </p>
              <p className="mt-4 text-navy/60 leading-relaxed text-sm md:text-base">
                SYT&amp;Automate is the answer to that. One person who understands design, development, and
                automation — who can build your entire digital setup without the overhead, delays, and
                miscommunication that come with larger agencies.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4" style={{ letterSpacing: '-0.02em' }}>
                What I actually build
              </h2>
              <p className="text-navy/60 leading-relaxed text-sm md:text-base">
                I work with the same tools the big agencies use — Next.js, Supabase, n8n, HubSpot, Claude API
                — but without the team of account managers, project managers, and handoff delays.
              </p>
              <p className="mt-4 text-navy/60 leading-relaxed text-sm md:text-base">
                You talk to me. I build it. Done. If I build it and you need it maintained, I maintain it.
                If something breaks at 11pm, you message me. That's the deal.
              </p>

              {/* Tech stack */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['Next.js', 'React', 'Supabase', 'n8n', 'HubSpot', 'Claude API', 'Framer', 'Stripe', 'Tailwind CSS', 'Resend'].map(t => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-navy/5 text-navy/55 border border-navy/10 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4" style={{ letterSpacing: '-0.02em' }}>
                What I'm not
              </h2>
              <ul className="space-y-2.5">
                {[
                  "I'm not a one-size-fits-all Wix reseller.",
                  "I'm not going to propose a $50,000 project when $3,500 will solve your problem.",
                  "I'm not going to disappear after launch.",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-navy/60">
                    <span className="shrink-0 mt-0.5 text-amber">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <div className="border border-violet/20 bg-violet-t rounded-2xl p-7">
                <p className="text-xs font-medium tracking-widest uppercase text-violet/50 mb-3">The honest bit</p>
                <p className="text-navy/70 leading-relaxed text-sm md:text-base">
                  This isn't a faceless agency. It's a person who cares about the work. I take on a limited number
                  of projects at a time so every client gets proper attention. If we're not the right fit for each
                  other, I'll tell you — and if I know someone better suited, I'll point you there.
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
                Book a free 30-min audit →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
