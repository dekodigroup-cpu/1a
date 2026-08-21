import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { PROBATE_STATS } from '../lib/content'

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, duration])

  return value
}

function Stat({ stat, index, run }: { stat: (typeof PROBATE_STATS)[number]; index: number; run: boolean }) {
  const value = useCountUp(stat.value, run)

  return (
    <div
      className="reveal relative pt-8 sm:pt-10"
      style={{ animationDelay: `${0.12 + index * 0.12}s` }}
    >
      <div className="absolute left-0 top-0 h-px w-full bg-white/12" />
      <div className="absolute left-0 top-0 h-px w-10 bg-brass" />
      <p className="font-arsenica text-6xl leading-none tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
        {stat.prefix}
        {value}
        {stat.suffix}
      </p>
      <p className="mt-4 font-inter text-[10px] uppercase tracking-[0.28em] text-brass sm:text-xs">
        {stat.label}
      </p>
      <p className="mt-4 max-w-xs font-inter text-[11px] leading-relaxed text-white/55 sm:text-sm">{stat.note}</p>
    </div>
  )
}

export function Probate() {
  const ref = useScrollReveal<HTMLElement>()
  const sentinel = useRef<HTMLDivElement | null>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRun(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="probate"
      ref={ref}
      className="grain relative overflow-hidden bg-ink px-5 py-24 sm:px-10 sm:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={sentinel} className="max-w-2xl">
          <p className="reveal font-inter text-[10px] uppercase tracking-[0.35em] text-white/45 sm:text-xs">
            The cost of doing nothing
          </p>
          <h2 className="reveal mt-6 font-arsenica text-4xl leading-[1.1] tracking-wide text-white sm:text-5xl lg:text-6xl">
            Probate is not a fee.
            <br />
            It is a year of your family&rsquo;s life.
          </h2>
          <p
            className="reveal mt-7 max-w-xl font-inter text-sm leading-relaxed text-white/60"
            style={{ animationDelay: '0.1s' }}
          >
            If you die owning things in your own name, a Mississippi court decides the timetable. Not you, and
            not the people you left them to. Here is what that costs, on average, before anyone inherits a
            thing.
          </p>
        </div>

        <div className="mt-16 grid gap-12 sm:mt-20 sm:grid-cols-3 sm:gap-8 lg:gap-14">
          {PROBATE_STATS.map((stat, i) => (
            <Stat key={stat.label} stat={stat} index={i} run={run} />
          ))}
        </div>

        <div className="reveal mt-16 sm:mt-20" style={{ animationDelay: '0.5s' }}>
          <a
            href="#plans"
            className="group inline-flex items-center gap-4 font-inter text-[10px] uppercase tracking-[0.25em] text-white/80 transition-colors duration-300 hover:text-white sm:text-xs"
          >
            <span className="h-px w-10 bg-brass transition-all duration-300 group-hover:w-16" />
            See how it is avoided
          </a>
        </div>
      </div>
    </section>
  )
}
