import { ArrowUpRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePointerTilt } from '../hooks/usePointerTilt'
import { PLANS, PLAN_FEE_NOTE, type Plan } from '../lib/content'

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const { tilt, enabled, handlers } = usePointerTilt(8)

  const transform = enabled
    ? `rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) translateZ(${tilt.active ? 18 : 0}px)`
    : undefined

  return (
    <article
      {...handlers}
      className="reveal scene-3d group relative h-full"
      style={{ animationDelay: `${0.12 + index * 0.14}s` }}
    >
      <div
        className="preserve-3d relative flex h-full flex-col overflow-hidden rounded-[2px] border border-white/10 bg-[#150806]/80 p-7 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#c6a15b]/45 group-hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:p-9"
        style={{ transform }}
      >
        {/* pointer glare, sits above the plate in Z */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${(tilt.px * 100).toFixed(1)}% ${(tilt.py * 100).toFixed(1)}%, rgba(198,161,91,0.16), transparent 62%)`,
          }}
        />

        <span
          aria-hidden="true"
          className="engraved pointer-events-none absolute -right-2 -top-6 font-arsenica text-[7rem] leading-none sm:text-[9rem]"
          style={{ transform: 'translateZ(-40px)' }}
        >
          {plan.index}
        </span>

        <div className="relative" style={{ transform: 'translateZ(30px)' }}>
          <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#c6a15b]">{plan.forWhom}</p>
          <h3 className="mt-4 font-arsenica text-3xl tracking-wide text-white sm:text-4xl">{plan.name}</h3>
          <div className="mt-5 h-px w-full bg-white/12" />
          <p className="mt-5 font-inter text-[13px] leading-relaxed text-white/62 sm:text-sm">{plan.summary}</p>
        </div>

        <ul className="relative mt-7 space-y-2.5" style={{ transform: 'translateZ(20px)' }}>
          {plan.includes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-[#c6a15b]" aria-hidden="true" />
              <span className="font-inter text-[12px] leading-relaxed text-white/78 sm:text-[13px]">{item}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-auto pt-8" style={{ transform: 'translateZ(26px)' }}>
          <p className="font-arsenica text-base leading-snug text-white/90 sm:text-lg">{plan.outcome}</p>
          <a
            href="#book"
            className="mt-6 inline-flex items-center gap-2 font-inter text-[10px] uppercase tracking-[0.25em] text-white/85 transition-colors duration-300 hover:text-[#c6a15b]"
          >
            Choose the {plan.name}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  )
}

export function Plans() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      id="plans"
      ref={ref}
      className="grain relative overflow-hidden bg-gradient-to-b from-[#0b0705] via-[#1d0703] to-[#410c01] px-5 py-24 sm:px-10 sm:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="reveal font-inter text-[10px] uppercase tracking-[0.35em] text-white/45 sm:text-xs">
            Three plans · one flat fee
          </p>
          <h2 className="reveal mt-6 font-arsenica text-4xl leading-[1.1] tracking-wide text-white sm:text-5xl lg:text-6xl">
            Pick the plan your family
            <br />
            actually needs.
          </h2>
          <p
            className="reveal mt-7 font-inter text-sm leading-relaxed text-white/60"
            style={{ animationDelay: '0.1s' }}
          >
            {PLAN_FEE_NOTE}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-3 lg:gap-7">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
