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

const CASE_STUDIES = [
  {
    label: 'Custom App · Automation',
    title: 'Inventory & operations system for an 11-location café chain',
    problem: '11 café locations. Each one tracking inventory on paper or in WhatsApp groups. Managers spending 45–60 minutes every morning on manual stock counts and report writing. No visibility across locations. Restocks missed regularly.',
    what: 'A custom web app — accessible from any device — that lets each location manager log inventory in under 5 minutes. The system aggregates data across all locations, auto-generates daily reports, sends low-stock alerts to suppliers, and gives the owner a real-time dashboard of all 11 cafés.',
    tech: 'Next.js, Supabase, n8n, Resend',
    results: [
      'Daily reporting time cut from 60 min to 5 min per location',
      'Zero missed restocks in the months since launch',
      'Owner sees live data across all locations from one screen',
      'Rolled out across all 11 locations in 3 weeks',
    ],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop&auto=format',
    imageAlt: 'Café interior with coffee and technology',
  },
  {
    label: 'Automation · HubSpot · n8n',
    title: 'Automated lead pipeline for an online SaaS platform',
    problem: 'New leads coming in from multiple sources — ads, organic, referrals. Each one required manual review, a welcome email, CRM entry, and follow-up scheduling. At 50+ leads per week, hours were being lost and leads were falling through the cracks.',
    what: 'An n8n workflow that catches every lead from any source, qualifies them instantly using AI (fit score based on their responses), sends a personalised email within 90 seconds, creates a deal in HubSpot with the correct pipeline stage and owner, and triggers an automated follow-up sequence.',
    tech: 'n8n, HubSpot, Claude API, Resend',
    results: [
      'Response time: from hours → under 2 minutes',
      '4+ hours saved per week',
      'Zero leads falling through the cracks',
      '"It feels like we hired an SDR, but we didn\'t." — founder',
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format',
    imageAlt: 'Dashboard analytics on laptop',
  },
]

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <span className="section-label" style={{ color: 'rgba(201,170,255,0.4)', borderColor: 'transparent' }}>Work</span>
            <h1 className="font-serif text-4xl md:text-6xl text-cream mt-3 max-w-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Real projects.<br />
              <span style={{ color: '#c9aaff' }}>Real results.</span>
            </h1>
            <p className="mt-5 text-cream/50 text-base leading-relaxed max-w-xl">
              Every project here solved a real problem for a real business.
              No concept pieces, no fictional clients.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-5 md:px-8 space-y-20">
          {CASE_STUDIES.map(({ label, title, problem, what, tech, results, image, imageAlt }, i) => (
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
                        <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-2">The problem</p>
                        <p className="text-sm text-navy/60 leading-relaxed">{problem}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-2">What we built</p>
                        <p className="text-sm text-navy/60 leading-relaxed">{what}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-1">Tech</p>
                        <p className="text-sm text-navy/45">{tech}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-4">Results</p>
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
              More case studies added as projects are completed.
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
              Want results like these?
            </h2>
            <Link to="/contact" className="btn-primary mt-3">
              Book a free audit →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
