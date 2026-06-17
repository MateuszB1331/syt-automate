import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import AIQualifier from '../components/AIQualifier'
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

export default function ContactPage() {
  const { lang } = useLanguage()
  const t = lang === 'pl' ? pl.contact : en.contact

  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({
    name: '', email: '', business_type: '', need: '', message: '', 'bot-field': ''
  })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...form }).toString(),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', business_type: '', need: '', message: '', 'bot-field': '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-xl border border-navy/15 bg-cream text-navy text-sm
    placeholder:text-navy/35 focus:outline-none focus:border-violet/50 focus:ring-2 focus:ring-violet/10
    transition-all`

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

      {/* AI Qualifier */}
      <section className="bg-cream">
        <AIQualifier />
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8 max-w-2xl mx-auto px-4">
        <div className="flex-1 h-px bg-violet-t" />
        <p className="text-xs text-[#7a6e85] font-medium">{t.divider}</p>
        <div className="flex-1 h-px bg-violet-t" />
      </div>

      {/* Form section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">

            {/* Left — info */}
            <Reveal>
              <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4" style={{ letterSpacing: '-0.02em' }}>
                {t.formTitle}
              </h2>
              <p className="text-sm text-navy/55 leading-relaxed mb-8">
                {t.formSub}
              </p>

              <div className="space-y-5">
                {[
                  { title: t.promise1Title, sub: t.promise1Sub },
                  { title: t.promise2Title, sub: t.promise2Sub },
                  { title: t.promise3Title, sub: t.promise3Sub },
                ].map(({ title, sub }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-t flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-violet">
                        <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy">{title}</p>
                      <p className="text-xs text-navy/45 mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-navy/10">
                <p className="text-xs font-medium tracking-widest uppercase text-navy/35 mb-2">{t.emailLabel}</p>
                <a href="mailto:kontakt@sytautomate.com" className="text-sm font-medium text-violet hover:text-violet-d transition-colors">
                  kontakt@sytautomate.com
                </a>
                <p className="mt-1.5 text-xs text-navy/40">{t.location}</p>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal delay={100}>
              {status === 'success' ? (
                <div className="bg-green-t border border-green/20 rounded-2xl p-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green">
                      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-serif text-xl text-navy">{t.successTitle}</p>
                  <p className="text-sm text-navy/55 mt-2">{t.successSub}</p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="hidden">
                    <input name="bot-field" value={form['bot-field']} onChange={handleChange} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-navy/50 mb-1.5">{t.labelName}</label>
                      <input
                        type="text" name="name" required
                        value={form.name} onChange={handleChange}
                        placeholder={t.placeholderName}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-navy/50 mb-1.5">{t.labelEmail}</label>
                      <input
                        type="email" name="email" required
                        value={form.email} onChange={handleChange}
                        placeholder={t.placeholderEmail}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-navy/50 mb-1.5">{t.labelBizType}</label>
                    <select name="business_type" value={form.business_type} onChange={handleChange} className={inputClass}>
                      <option value="">{t.selectDefault}</option>
                      {t.bizTypes.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-navy/50 mb-1.5">{t.labelNeed}</label>
                    <select name="need" value={form.need} onChange={handleChange} className={inputClass}>
                      <option value="">{t.selectDefault}</option>
                      {t.needs.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-navy/50 mb-1.5">{t.labelMore}</label>
                    <textarea
                      name="message" rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder={t.placeholderMessage}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-red-500">
                      {t.errorMsg}{' '}
                      <a href="mailto:kontakt@sytautomate.com" className="underline">kontakt@sytautomate.com</a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 bg-violet text-white text-sm font-medium rounded-full
                      hover:bg-violet-d transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? t.sending : t.sendBtn}
                  </button>

                  <p className="text-xs text-navy/35 text-center">
                    {t.footerNote}
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
