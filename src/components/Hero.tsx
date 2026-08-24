import { Phone } from 'lucide-react'
import { Rings3D } from './webgl/Rings3D'
import { FIRM } from '../lib/content'

export function Hero() {
  return (
    <section id="top" className="grain relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink">
      <Rings3D className="absolute inset-0 h-full w-full" />

      {/* scrims — keep the type readable wherever the render lands */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_75%_at_50%_58%,rgba(5,9,16,0)_0%,rgba(5,9,16,0.42)_42%,rgba(5,9,16,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/85 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-14 text-center text-white sm:pb-16">
        <p
          className="hero-fade-up font-inter text-xs font-medium uppercase tracking-[0.35em] text-white/90 sm:text-sm"
          style={{ animationDelay: '0.1s' }}
        >
          {FIRM.name}
        </p>
        <p
          className="hero-fade-up mt-2 font-inter text-[10px] font-light uppercase tracking-[0.4em] text-white/70 sm:text-xs"
          style={{ animationDelay: '0.1s' }}
        >
          {FIRM.city} · Mississippi
        </p>

        <h1
          className="hero-fade-up mt-7 leading-[1.05] drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
          style={{ animationDelay: '0.25s' }}
        >
          <span className="block font-arsenica text-5xl tracking-wide sm:text-6xl md:text-7xl lg:text-[6.25rem]">
            Legacy
          </span>
          <span className="block font-inter text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-[6.25rem]">
            BY DESIGN
          </span>
        </h1>

        <div
          className="hero-fade-up brass-sweep mt-8 h-px w-32 sm:w-44"
          style={{ animationDelay: '0.35s' }}
          aria-hidden="true"
        />

        <p
          className="hero-fade-up mt-8 max-w-xl font-arsenica text-sm leading-relaxed text-white/90 sm:text-lg md:text-xl"
          style={{ animationDelay: '0.4s' }}
        >
          Estate planning for Mississippi families who would rather leave clarity than a court case. Wills,
          trusts and probate avoidance, from a certified Personal Family Lawyer® on Court Street.
        </p>

        <div
          className="hero-fade-up mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
          style={{ animationDelay: '0.55s' }}
        >
          <a
            href="#book"
            className="liquid-glass liquid-glass-brass rounded-[50%] px-10 py-5 font-inter text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(198,161,91,0.25)] active:scale-[0.98] sm:px-12 sm:py-6 sm:text-xs"
          >
            Book Your Planning Session
          </a>
          <a
            href={FIRM.phoneHref}
            className="group inline-flex items-center gap-2.5 font-inter text-[10px] uppercase tracking-[0.25em] text-white/75 transition-colors duration-300 hover:text-white sm:text-xs"
          >
            <Phone className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-12" />
            {FIRM.phone}
          </a>
        </div>
      </div>

    </section>
  )
}
