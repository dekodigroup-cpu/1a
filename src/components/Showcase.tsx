import { useScrollReveal } from '../hooks/useScrollReveal'
import { Photo } from './Photo'
import { PHOTOS } from '../lib/photos'

export function Showcase() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#120705]"
    >
      <Photo
        photo={PHOTOS.conference}
        plain
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#0b0705]/62" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_50%,rgba(11,7,5,0)_0%,rgba(11,7,5,0.72)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#410c01] to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-32 text-center">
        <h2 className="reveal font-arsenica text-4xl tracking-wide text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-7xl">
          Not Just Documents
        </h2>

        <div
          className="reveal mt-8 font-arsenica text-xl leading-[1.35] tracking-wide text-white/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)] sm:text-2xl lg:text-4xl"
          style={{ animationDelay: '0.15s' }}
        >
          <p>A plan is only as good</p>
          <p>as the day your family</p>
          <p>finally has to use it.</p>
        </div>

        <div className="reveal mt-10" style={{ animationDelay: '0.3s' }}>
          <a
            href="#process"
            className="inline-block rounded-[50%] border border-white/50 bg-transparent px-10 py-4 font-inter text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:scale-[1.03] hover:border-white hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] sm:px-12 sm:py-5 sm:text-xs"
          >
            How We Work
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-[#410c01]" />
    </section>
  )
}
