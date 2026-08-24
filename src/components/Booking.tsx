import { useState, type FormEvent } from 'react'
import { ArrowRight, Phone, MapPin } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { FIRM, PLANS } from '../lib/content'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'

const fieldClass =
  'w-full rounded-[2px] border border-white/15 bg-white/[0.03] px-4 py-3 font-inter text-sm text-white placeholder-white/30 transition-colors duration-300 focus:border-brass focus:outline-none'
const labelClass = 'block font-inter text-[9px] uppercase tracking-[0.28em] text-white/50'

export function Booking() {
  const ref = useScrollReveal<HTMLElement>()
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ENDPOINT) {
      setStatus('unconfigured')
      return
    }
    const form = event.currentTarget
    setStatus('sending')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!response.ok) throw new Error(String(response.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="book"
      ref={ref}
      className="grain relative overflow-hidden bg-ink px-5 py-24 sm:px-10 sm:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-24">
        <div>
          <p className="reveal font-inter text-[10px] uppercase tracking-[0.35em] text-white/45 sm:text-xs">
            Book a Family Wealth Planning Session
          </p>
          <h2 className="reveal mt-6 font-arsenica text-4xl leading-[1.08] tracking-wide text-white sm:text-5xl lg:text-6xl">
            One conversation,
            <br />
            and you will know
            <br />
            exactly where you stand.
          </h2>
          <p
            className="reveal mt-7 max-w-md font-inter text-sm leading-relaxed text-white/60"
            style={{ animationDelay: '0.1s' }}
          >
            You leave the session knowing what your family would face tomorrow, what it would cost them, and
            what a flat fee to fix it looks like — whether or not you go on to hire us.
          </p>

          <div className="reveal mt-12 space-y-6" style={{ animationDelay: '0.2s' }}>
            <a href={FIRM.phoneHref} className="group flex items-center gap-4">
              <Phone className="h-4 w-4 shrink-0 text-brass" />
              <span className="font-arsenica text-2xl text-white transition-colors duration-300 group-hover:text-brass sm:text-3xl">
                {FIRM.phone}
              </span>
            </a>
            <p className="flex items-start gap-4 font-inter text-sm text-white/60">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-brass" />
              <span>
                {FIRM.street}, {FIRM.city}, {FIRM.state} {FIRM.zip}
                <br />
                <span className="text-white/40">{FIRM.hours}</span>
              </span>
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="liquid-glass reveal rounded-[3px] p-6 sm:p-9"
          style={{ animationDelay: '0.15s' }}
          noValidate={false}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="name">
                Your name
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" className={`${fieldClass} mt-2.5`} />
            </div>
            <div>
              <label className={labelClass} htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={`${fieldClass} mt-2.5`} />
            </div>
            <div>
              <label className={labelClass} htmlFor="phone">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" className={`${fieldClass} mt-2.5`} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="interest">
                What brings you in
              </label>
              <select id="interest" name="interest" defaultValue="" className={`${fieldClass} mt-2.5`}>
                <option value="" disabled>
                  Choose one
                </option>
                {PLANS.map((plan) => (
                  <option key={plan.name} value={plan.name} className="bg-slate">
                    {plan.name}
                  </option>
                ))}
                <option value="Not sure yet" className="bg-slate">
                  Not sure yet
                </option>
                <option value="Real estate closing" className="bg-slate">
                  Real estate closing
                </option>
                <option value="Personal injury" className="bg-slate">
                  Personal injury
                </option>
                <option value="Probate already underway" className="bg-slate">
                  Probate already underway
                </option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="message">
                Anything we should know
              </label>
              <textarea id="message" name="message" rows={4} className={`${fieldClass} mt-2.5 resize-none`} />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-[2px] bg-brass px-8 py-4 font-inter text-[10px] uppercase tracking-[0.25em] text-onbrass transition-all duration-300 hover:bg-brass-lit disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
          >
            {status === 'sending' ? 'Sending…' : 'Request my session'}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <p aria-live="polite" className="mt-5 min-h-[2.5rem] font-inter text-[11px] leading-relaxed">
            {status === 'sent' && (
              <span className="text-brass">
                Thank you — we have your request and will be in touch within one business day.
              </span>
            )}
            {status === 'error' && (
              <span className="text-ember">
                That did not go through. Please call {FIRM.phone} and we will get you booked.
              </span>
            )}
            {status === 'unconfigured' && (
              <span className="text-ember">
                Form delivery is not connected yet — please call {FIRM.phone}. (Set{' '}
                <code className="text-white/70">VITE_FORM_ENDPOINT</code> to enable submissions.)
              </span>
            )}
            {(status === 'idle' || status === 'sending') && (
              <span className="text-white/40">
                Submitting this form does not create an attorney-client relationship, and nothing you send
                through it is confidential until we have agreed to represent you.
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  )
}
