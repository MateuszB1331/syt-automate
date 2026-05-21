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

const TEMPLATES = [
  {
    name: 'HubSpot → n8n AI Lead Qualifier',
    desc: 'New HubSpot contact → AI scores fit based on form answers → routes to Hot/Warm/Cold pipeline stage → sends personalised email.',
    price: '$49',
    tags: ['HubSpot', 'AI', 'Lead gen'],
  },
  {
    name: 'Contact Form → CRM + Email Notification',
    desc: 'Any form submission → creates contact in HubSpot (or Airtable) → sends you a Slack notification + sends the lead a confirmation email. Works with Typeform, Tally, Webflow.',
    price: '$29',
    tags: ['Lead capture', 'Notifications'],
  },
  {
    name: 'SaaS Trial Onboarding Sequence',
    desc: 'New trial signup → 5-email welcome sequence over 14 days → personalised based on answers from signup form → HubSpot deal updated at each stage.',
    price: '$49',
    tags: ['Onboarding', 'SaaS', 'HubSpot'],
  },
  {
    name: 'Inventory Alert → Supplier Email',
    desc: 'Google Sheets or Supabase inventory table → monitors stock levels daily → sends supplier email + internal Slack alert when below threshold.',
    price: '$39',
    tags: ['Inventory', 'Hospitality', 'Retail'],
  },
  {
    name: 'Weekly Report Generator',
    desc: 'Pulls data from HubSpot + GA4 → AI writes a plain-English summary → emails it to your team every Monday morning.',
    price: '$59',
    tags: ['Reporting', 'AI', 'HubSpot', 'GA4'],
  },
]

const FAQ = [
  {
    q: 'Do I need to know how to code to use these?',
    a: 'No. You need an n8n account (cloud or self-hosted) and the relevant tool accounts (HubSpot, etc.). We include a step-by-step setup guide with every template.',
  },
  {
    q: "What if something doesn't work in my setup?",
    a: "Every template comes with 30 days of email support. We'll help you get it running.",
  },
  {
    q: 'Can you customise a template for me?',
    a: "Yes. Send us a message and we'll quote you for customisation.",
  },
]

export default function TemplatesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <span className="section-label" style={{ color: 'rgba(201,170,255,0.4)', borderColor: 'transparent' }}>Templates</span>
            <h1 className="font-serif text-4xl md:text-6xl text-cream mt-3 max-w-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Ready-made automations.<br />
              <span style={{ color: '#c9aaff' }}>Plug in and go.</span>
            </h1>
            <p className="mt-5 text-cream/50 text-base leading-relaxed max-w-xl">
              Don't need a full custom build? Our n8n templates are pre-built, documented, and ready to
              import into your own n8n instance. Built from real client projects — not demos.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Templates grid */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEMPLATES.map(({ name, desc, price, tags }, i) => (
              <Reveal key={name} delay={i * 60}>
                <div className="card flex flex-col h-full group cursor-pointer">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="font-serif text-base text-navy leading-snug">{name}</h3>
                    <span className="shrink-0 font-medium text-amber text-sm">{price}</span>
                  </div>
                  <p className="text-sm text-navy/55 leading-relaxed flex-1 mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-navy/5 text-navy/50 border border-navy/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="mt-5 w-full py-2.5 text-sm font-medium text-violet border border-violet/30
                    rounded-full hover:bg-violet hover:text-white transition-all">
                    Get template →
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-cream-t">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <span className="section-label">FAQ</span>
          </Reveal>
          <div className="mt-4 max-w-2xl space-y-6">
            {FAQ.map(({ q, a }) => (
              <Reveal key={q}>
                <div className="border-b border-navy/10 pb-6">
                  <p className="font-medium text-navy mb-2">{q}</p>
                  <p className="text-sm text-navy/55 leading-relaxed">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="border border-navy/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="font-serif text-2xl text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>
                  Need something custom instead?
                </h2>
                <p className="text-sm text-navy/55">
                  If none of these fit exactly, we build custom automations from scratch.
                </p>
              </div>
              <Link to="/contact" className="btn-primary shrink-0">
                Get a quote →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
