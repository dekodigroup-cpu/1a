import { useScrollReveal } from '../hooks/useScrollReveal'
import { useParallax } from '../hooks/useParallax'
import { FogTransition } from './FogTransition'
import { Photo } from './Photo'
import { PHOTOS } from '../lib/photos'
import { QUOTE } from '../lib/content'

export function QuoteBanner() {
  const ref = useScrollReveal<HTMLElement>()
  const { ref: fogRef, progress } = useParallax<HTMLDivElement>()
  const offset = progress * 80

  return (
    <section
      ref={ref}
      className="grain relative flex h-[100svh] min-h-[560px] w-full items-center overflow-hidden bg-[#2a0805] px-6 sm:px-12 lg:items-start lg:px-24 lg:pt-[25vh]"
    >
      <Photo
        photo={PHOTOS.town}
        plain
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#2a0805]/60" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,7,5,0.85)_0%,rgba(11,7,5,0.25)_55%,rgba(11,7,5,0)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#2a0805] to-transparent" />

      <blockquote className="reveal-scale relative z-20 max-w-xs font-arsenica text-xl leading-snug text-white sm:max-w-md sm:text-3xl lg:max-w-2xl lg:text-5xl lg:leading-tight">
        <p>
          {QUOTE.lead} <span className="font-light italic">{QUOTE.emphasis}</span>
        </p>
        <footer className="mt-8 font-inter text-[9px] uppercase not-italic tracking-[0.3em] text-[#c6a15b] sm:text-[10px]">
          Ross Law Office, PLLC
        </footer>
      </blockquote>

      <div
        ref={fogRef}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-0 z-10 h-[40vh] w-full will-change-transform"
        style={{ transform: `translateY(${(-offset).toFixed(0)}px)` }}
      >
        <FogTransition color="#0b0705" className="h-full" />
      </div>
    </section>
  )
}
