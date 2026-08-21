import { useScrollReveal } from '../hooks/useScrollReveal'
import { useParallax } from '../hooks/useParallax'
import { Photo } from './Photo'
import { PHOTOS } from '../lib/photos'
import { PROCESS } from '../lib/content'

export function Process() {
  const ref = useScrollReveal<HTMLElement>()
  const { ref: plateRef, progress } = useParallax<HTMLDivElement>()

  const lift = (progress - 0.5) * -70
  const turn = (progress - 0.5) * 9

  return (
    <section
      id="process"
      ref={ref}
      className="grain relative overflow-hidden bg-navy px-5 pb-[40vh] pt-24 sm:px-10 sm:pt-32 lg:px-20 lg:pt-40"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
        {/* 3D photo plate — leans as it travels through the viewport */}
        <div ref={plateRef} className="scene-3d lg:sticky lg:top-28 lg:self-start">
          <div
            className="reveal-scale preserve-3d relative overflow-hidden rounded-[2px] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]"
            style={{ transform: `translateY(${lift.toFixed(1)}px) rotateY(${turn.toFixed(2)}deg)` }}
          >
            <Photo
              photo={PHOTOS.detail}
              label="At the table"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 border border-white/10" />
          </div>
          <p className="reveal mt-5 font-inter text-[10px] uppercase tracking-[0.28em] text-white/45">
            384 Court Street · West Point
          </p>
        </div>

        <div>
          <p className="reveal font-inter text-[10px] uppercase tracking-[0.35em] text-white/50 sm:text-xs">
            How we work
          </p>
          <h2 className="reveal mt-6 font-arsenica text-4xl leading-[1.1] tracking-wide text-white sm:text-5xl">
            Four steps, and then
            <br />
            we stay in touch.
          </h2>

          <ol className="mt-14 space-y-12">
            {PROCESS.map((item, i) => (
              <li
                key={item.title}
                className="reveal relative border-t border-white/15 pt-7"
                style={{ animationDelay: `${0.1 + i * 0.12}s` }}
              >
                <span className="absolute -top-px left-0 h-px w-10 bg-brass" aria-hidden="true" />
                <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-brass">{item.step}</p>
                <h3 className="mt-4 font-arsenica text-2xl tracking-wide text-white sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-lg font-inter text-[13px] leading-relaxed text-white/62 sm:text-sm">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="reveal mt-14" style={{ animationDelay: '0.6s' }}>
            <a
              href="#book"
              className="liquid-glass liquid-glass-brass inline-block rounded-[50%] px-10 py-4 font-inter text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(198,161,91,0.25)] active:scale-[0.98] sm:px-12 sm:py-5 sm:text-xs"
            >
              Start with a session
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
