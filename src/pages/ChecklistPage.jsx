import { useState } from 'react'

export default function ChecklistPage() {
  const [step, setStep] = useState('form') // 'form' | 'loading' | 'done'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setStep('loading')
    setError('')

    try {
      const res = await fetch('/api/checklist-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })

      if (!res.ok) throw new Error('Failed')
      setStep('done')
    } catch {
      setError('Something went wrong. Please try again.')
      setStep('form')
    }
  }

  if (step === 'done') {
    return (
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <iframe
          src="/checklist.html"
          style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
          title="Automation Checklist"
        />
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1e1432', color: '#f5f0e8', padding: '12px 24px',
          borderRadius: 100, fontSize: 14, fontWeight: 500,
          boxShadow: '0 8px 32px rgba(30,20,50,0.3)',
          whiteSpace: 'nowrap', zIndex: 100,
          animation: 'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          ✓ Check your inbox — we've sent you the link too
        </div>
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateX(-50%) translateY(12px); }
            to   { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f0e8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Grid background */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(180,160,140,0.18) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(180,160,140,0.18) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }} />

      {/* Violet glow */}
      <div style={{
        position: 'fixed', top: -100, right: -100,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(109,63,209,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Gate card */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.75)',
        border: '1px solid rgba(180,160,220,0.25)',
        borderRadius: 24,
        padding: '48px 40px',
        maxWidth: 480,
        width: '100%',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 60px rgba(30,20,50,0.08)',
      }}>

        {/* Brand */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#1e1432' }}>
            SYT<span style={{ color: '#6d3fd1' }}>&amp;</span>Automate
          </div>
          <div style={{
            background: 'rgba(109,63,209,0.08)', color: '#6d3fd1',
            fontSize: 11, fontWeight: 600, padding: '3px 10px',
            borderRadius: 100, letterSpacing: '.06em', textTransform: 'uppercase',
          }}>
            Free resource
          </div>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 400,
          color: '#1a1228', lineHeight: 1.2, marginBottom: 12,
        }}>
          10 processes you can<br />
          <em style={{ color: '#6d3fd1' }}>automate right now</em>
        </h1>

        <p style={{ fontSize: 15, color: '#7a6e85', lineHeight: 1.65, marginBottom: 32 }}>
          Enter your name and email — we'll send you the checklist link and unlock it here instantly.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="Your first name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{
                width: '100%', padding: '13px 16px', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(180,160,220,0.35)',
                borderRadius: 12, fontSize: 15, color: '#1a1228', outline: 'none',
                fontFamily: 'inherit', transition: 'border-color .2s',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(109,63,209,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(180,160,220,0.35)')}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%', padding: '13px 16px', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(180,160,220,0.35)',
                borderRadius: 12, fontSize: 15, color: '#1a1228', outline: 'none',
                fontFamily: 'inherit', transition: 'border-color .2s',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(109,63,209,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(180,160,220,0.35)')}
            />
          </div>

          {error && (
            <p style={{
              fontSize: 13, color: '#b03a2e',
              background: 'rgba(176,58,46,0.06)',
              border: '1px solid rgba(176,58,46,0.15)',
              borderRadius: 10, padding: '10px 14px', marginBottom: 16,
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={step === 'loading' || !name.trim() || !email.trim()}
            style={{
              width: '100%', padding: '14px 24px',
              background: step === 'loading' ? 'rgba(109,63,209,0.6)' : '#1e1432',
              color: '#f5f0e8', border: 'none',
              borderRadius: 100, fontSize: 15, fontWeight: 500,
              fontFamily: 'inherit',
              cursor: step === 'loading' ? 'default' : 'pointer',
              transition: 'all .2s',
            }}
          >
            {step === 'loading' ? 'Sending...' : 'Get the free checklist →'}
          </button>
        </form>

        <p style={{
          marginTop: 16, fontSize: 12, color: '#a09090',
          textAlign: 'center', lineHeight: 1.5,
        }}>
          No spam. No newsletters. Just the checklist and one honest follow-up.
        </p>
      </div>
    </div>
  )
}
