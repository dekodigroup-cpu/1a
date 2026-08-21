import { MARQUEE } from '../lib/content'

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]

  return (
    <div className="relative z-30 -mt-px overflow-hidden border-y border-white/[0.07] bg-[#0b0705]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0b0705] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0b0705] to-transparent sm:w-32" />
      <div className="marquee-track flex w-max items-center py-3.5 sm:py-4">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center">
            <span className="font-inter text-[9px] uppercase tracking-[0.28em] text-white/45 sm:text-[10px]">
              {item}
            </span>
            <span className="mx-6 h-1 w-1 rotate-45 bg-[#c6a15b]/55 sm:mx-10" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
