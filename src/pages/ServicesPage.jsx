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

function Section({ className = '', children }) {
  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">{children}</div>
    </section>
  )
}

/* ─── Service block ─────────────────────────────────── */
function ServiceBlock({ tag, title, body, builtWith, includes, price, deliver, reverse = false }) {
  return (
    <div className="py-16 md:py-20 border-b border-navy/10 last:border-0">
      <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-start ${reverse ? 'direction-rtl' : ''}`}>
        <Reveal>
          <span className="section-label">{tag}</span>
          <h2 className="font-serif text-2xl md:text-3xl text-navy mt-2 leading-snug" style={{ letterSpacing: '-0.02em' }}>
            {title}
          </h2>
          <p className="mt-4 text-sm text-navy/60 leading-relaxed">{body}</p>
          <p className="mt-5 text-xs font-medium tracking-widest uppercase text-navy/35">Built with</p>
          <p className="mt-1 text-sm text-navy/55">{builtWith}</p>
          <div className="mt-5 pt-5 border-t border-navy/10 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-amber">{price}</span>
            <span className="text-navy/20">·</span>
            <span className="text-sm text-navy/45">{deliver}</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-cream-t border border-navy/10 rounded-2xl p-6">
            <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-4">What's included</p>
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
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <span className="section-label" style={{ color: 'rgba(201,170,255,0.4)', borderColor: 'transparent' }}>Services</span>
            <h1 className="font-serif text-4xl md:text-6xl text-cream mt-3 max-w-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Everything your business<br />
              needs online. <span style={{ color: '#c9aaff' }}>One partner.</span>
            </h1>
            <p className="mt-5 text-cream/50 text-base leading-relaxed max-w-xl">
              Most small businesses end up with three different freelancers, four subscriptions, and nobody
              who actually owns the whole thing. We fix that.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services detail */}
      <Section className="bg-cream">
        <ServiceBlock
          tag="Website"
          title="A website that actually works for you"
          body="Not a template thrown together in a day. A fast, well-designed, mobile-first website built around how your customers actually behave — with clear calls to action, contact forms that reach you instantly, and content you can update yourself."
          builtWith="Framer, Next.js, Tailwind CSS"
          includes={[
            'Custom design (no templates)',
            'Mobile-responsive, fast-loading',
            'Contact form → instant email notification to you',
            'Basic CMS so you can update text and images yourself',
            'SEO foundations (meta tags, sitemap, structured data)',
            '1 month of support after launch',
          ]}
          price="Starting from $1,500"
          deliver="Delivered in 5–10 days"
        />

        <ServiceBlock
          tag="Automations"
          title="Stop doing manually what a machine can do in seconds"
          body="Every time a customer fills out a form, books an appointment, or sends an enquiry — something manual probably happens next. You (or someone on your team) copies data somewhere, sends an email, creates a calendar event. We automate that entire chain. Zero manual steps."
          builtWith="n8n, HubSpot, Claude API (for AI steps), Supabase"
          includes={[
            'Lead capture → CRM → personalised follow-up email (within 90 seconds)',
            'Booking confirmation → calendar → reminder sequence',
            'Form submission → Slack/email notification → task creation',
            'Inventory alert → supplier email → internal report',
            'Customer onboarding sequences',
            'Weekly/monthly report generation (automated)',
          ]}
          price="Starting from $1,500"
          deliver="Delivered in 3–7 days"
          reverse
        />

        <ServiceBlock
          tag="Custom web app"
          title="Built exactly for how your business works"
          body="Off-the-shelf software almost fits. Almost. But you're paying for features you don't use, missing the ones you actually need, and duct-taping three tools together with spreadsheets. We build the exact tool your business needs — and nothing more. No bloat, no unnecessary complexity."
          builtWith="Next.js, React, Supabase, Stripe (if payments needed), n8n"
          includes={[
            '11-location café inventory + daily reporting system',
            'Staff scheduling app with conflict detection',
            'Client portal for service businesses',
            'Internal dashboard for operations teams',
            'Custom booking systems with automated confirmations',
          ]}
          price="Starting from $6,000"
          deliver="Timeline: typically 2–6 weeks"
        />

        <ServiceBlock
          tag="Maintenance & retainers"
          title="We don't disappear after launch"
          body="Every project comes with an optional monthly retainer. We keep your site and systems running, make updates, add new automations as your business grows, and fix anything that breaks — fast."
          builtWith="Included with all projects"
          includes={[
            'Starter: $199/month — hosting, monitoring, minor updates',
            'Growth: $450/month — above + new automations, integrations, monthly review call',
            'Custom: $800+/month — full ongoing development partner',
          ]}
          price="From $199/month"
          deliver="Ongoing"
          reverse
        />
      </Section>

      {/* CTA */}
      <section className="py-20 bg-cream-t">
        <div className="max-w-6xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl text-navy mb-3" style={{ letterSpacing: '-0.02em' }}>
              Not sure what you need?
            </h2>
            <p className="text-sm text-navy/55 mb-6">
              That's what the free audit is for. 30 minutes, no commitment, honest advice.
            </p>
            <Link to="/contact" className="btn-primary">
              Book a free audit →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
