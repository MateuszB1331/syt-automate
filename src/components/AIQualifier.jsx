import { useState, useRef } from 'react'

const PROMPT_CHIPS = [
  {
    label: "I run a café / restaurant",
    text: "I run a café with 2 locations. Every morning I manually check stock levels and update a spreadsheet, then write a summary for the owner. It takes about an hour each day and I keep making mistakes."
  },
  {
    label: "I have a local service business",
    text: "I run a hair salon. We take bookings by phone and WhatsApp, then manually add them to a calendar. Half the time we forget to send reminders and clients don't show up. We also don't have a proper website yet."
  },
  {
    label: "I need a website",
    text: "I've been running my business for 2 years but only have a Facebook page. I know I need a proper website but I don't know what it should include or how much it should cost."
  },
  {
    label: "My follow-up process is a mess",
    text: "I get enquiries through Instagram and email but I'm terrible at following up. By the time I reply, they've gone somewhere else. I need some kind of system but I don't know where to start."
  }
]

export default function AIQualifier() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const [error, setError] = useState('')
  const textareaRef = useRef(null)
  const responseRef = useRef(null)

  const canSubmit = input.trim().length >= 5 && !isLoading

  function autoResize() {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 140) + 'px'
  }

  async function handleSubmit() {
    if (!canSubmit) return
    setIsLoading(true)
    setIsVisible(true)
    setResponse('')
    setShowCta(false)
    setError('')

    setTimeout(() => {
      responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)

    try {
      const res = await fetch('/api/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim() })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `API error ${res.status}`)
      setIsLoading(false)
      setResponse(data.text)
      setTimeout(() => setShowCta(true), 300)

    } catch (err) {
      setIsLoading(false)
      setIsVisible(false)
      setError(`Error: ${err.message}`)
      console.error(err)
    }
  }

  function handleReset() {
    setIsVisible(false)
    setShowCta(false)
    setTimeout(() => {
      setResponse('')
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.focus()
      }
    }, 400)
  }

  function formatResponse(text) {
    return text
      .split('\n\n')
      .filter(p => p.trim())
      .map((p, i) => (
        <p key={i} className="mb-3 last:mb-0"
          dangerouslySetInnerHTML={{
            __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }}
        />
      ))
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-16">
      {/* Section header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-violet flex items-center gap-2 mb-3">
          <span className="block w-5 h-px bg-violet" />
          Not sure where to start?
        </p>
        <h2 className="font-serif text-4xl text-navy leading-tight mb-3">
          Tell us about your business.<br />
          <em className="italic text-violet">We'll tell you exactly how we can help.</em>
        </h2>
        <p className="text-[#7a6e85] text-base leading-relaxed max-w-lg">
          Type anything — what you do, what's taking up your time, what you wish
          worked better. Our AI will give you a specific, honest answer.
        </p>
      </div>

      {/* Input card */}
      <div className="bg-white/70 border border-violet-t rounded-2xl p-5 backdrop-blur-md
                      focus-within:border-violet/30 focus-within:ring-4 focus-within:ring-violet-t
                      transition-all duration-200">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-t to-violet-l
                          flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="#5a3fa0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </div>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => { setInput(e.target.value); autoResize() }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && canSubmit) { e.preventDefault(); handleSubmit() }}}
            placeholder="e.g. I run a café with 3 locations. Every morning I manually check stock across all of them and it takes forever..."
            rows={2}
            maxLength={800}
            className="flex-1 bg-transparent border-none outline-none resize-none
                       text-sm text-navy placeholder-navy/30 leading-relaxed
                       min-h-[56px] max-h-[140px] font-sans"
          />
        </div>

        {/* Chips + send button */}
        <div className="flex items-center justify-between mt-4 pt-4
                        border-t border-violet-t gap-3 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {PROMPT_CHIPS.map(chip => (
              <button
                key={chip.label}
                onClick={() => { setInput(chip.text); setTimeout(autoResize, 10) }}
                className="text-xs font-medium text-violet bg-violet-t
                           border border-violet/10 rounded-full px-3 py-1.5
                           hover:bg-violet/10 transition-all duration-150
                           hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                {chip.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex items-center gap-2 bg-navy text-cream
                       rounded-full px-5 py-2.5 text-sm font-medium flex-shrink-0
                       hover:opacity-90 active:scale-95
                       disabled:opacity-40 disabled:cursor-default
                       transition-all duration-150"
          >
            Analyse my business
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {/* Response card */}
      <div
        ref={responseRef}
        className={`mt-4 overflow-hidden transition-all duration-500
                    ${isVisible ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-white/70 border border-violet-t rounded-2xl p-6 backdrop-blur-md">
          {/* Response header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy to-violet
                            flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="#d4bfff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Mateusz @ SYT&amp;Automate</p>
              <p className="text-xs text-[#7a6e85]">AI-powered analysis · based on your description</p>
            </div>
          </div>

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-center gap-1 py-2">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          )}

          {/* Response text */}
          {response && (
            <div className="text-sm text-navy leading-relaxed">
              {formatResponse(response)}
            </div>
          )}

          {/* CTA after response */}
          {showCta && (
            <div className="mt-5 pt-5 border-t border-violet-t
                            flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-semibold text-navy">Ready to talk specifics?</p>
                <p className="text-sm text-[#7a6e85]">Book a free 30-min audit — no commitment, honest advice.</p>
              </div>
              <a
                href="/contact"
                className="flex items-center gap-2 bg-violet text-white
                           rounded-full px-6 py-3 text-sm font-medium flex-shrink-0
                           hover:bg-violet-d transition-all duration-150 no-underline"
              >
                Book a free audit
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Reset */}
        {showCta && (
          <button
            onClick={handleReset}
            className="mt-3 text-xs text-[#7a6e85] hover:text-navy
                       underline underline-offset-2 transition-colors bg-transparent
                       border-none cursor-pointer font-sans"
          >
            ← Ask something else
          </button>
        )}
      </div>
    </div>
  )
}
