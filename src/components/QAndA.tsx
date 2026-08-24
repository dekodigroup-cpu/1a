import { useScrollReveal } from '../hooks/useScrollReveal'
import { useParallax } from '../hooks/useParallax'
import { PALETTE } from '../lib/theme'
import { FogTransition } from './FogTransition'
import { QA_LEFT, QA_RIGHT, type QA } from '../lib/content'

function Item({ item, delay }: { item: QA; delay: number }) {
  return (
    <div className="reveal" style={{ animationDelay: `${delay.toFixed(2)}s` }}>
      <h3 className="font-arsenica text-xs uppercase tracking-wide text-white sm:text-sm lg:text-base">
        {item.q}
      </h3>
      <p className="mt-4 font-inter text-[11px] leading-relaxed text-white/60 sm:text-xs lg:text-sm">
        {item.a}
      </p>
    </div>
  )
}

export function QAndA() {
  const ref = useScrollReveal<HTMLElement>()
  const { ref: fogRef, progress } = useParallax<HTMLDivElement>()
  const offset = progress * 30

  return (
    <section
      id="answers"
      ref={ref}
      className="grain relative overflow-hidden bg-navy px-4 pt-20 sm:px-10 sm:pt-24 lg:px-28 lg:pt-32"
      style={{ paddingBottom: '50vh' }}
    >
      <div className="relative z-20 mx-auto max-w-6xl">
        <p className="reveal text-center font-inter text-[10px] uppercase tracking-[0.35em] text-white/45 sm:text-xs">
          In conversation with Stephen S. Ross
        </p>

        <h2 className="reveal mt-6 flex items-baseline justify-center gap-1 font-arsenica text-4xl tracking-wide text-white sm:text-5xl lg:text-7xl">
          <span>Q</span>
          <span className="text-xl italic text-white/80 sm:text-2xl lg:text-4xl">&amp;</span>
          <span>A</span>
        </h2>

        <div className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div className="space-y-12 lg:space-y-16">
            {QA_LEFT.map((item, i) => (
              <Item key={item.q} item={item} delay={0.12 + i * 0.12} />
            ))}
          </div>
          <div className="space-y-12 md:mt-24 lg:space-y-16">
            {QA_RIGHT.map((item, i) => (
              <Item key={item.q} item={item} delay={0.12 + (i + 3) * 0.12} />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={fogRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-[45vh] w-full will-change-transform"
        style={{ transform: `translateY(${(18 - offset).toFixed(2)}%)` }}
      >
        <FogTransition color={PALETTE.navyDeep} className="h-full" />
      </div>

    </section>
  )
}
