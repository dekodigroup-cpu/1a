import { Logo } from './Logo'
import { NAV } from '../lib/content'

const linkClass =
  'font-inter text-[10px] uppercase font-medium tracking-[0.15em] text-white/85 transition-colors duration-300 hover:text-white sm:text-xs sm:tracking-[0.2em]'

export function Navbar() {
  const [first, second, third, fourth] = NAV

  return (
    <header className="fixed left-1/2 top-4 z-50 -translate-x-1/2 sm:top-6">
      <nav
        aria-label="Primary"
        className="liquid-glass flex items-center gap-4 rounded-full px-4 py-2.5 sm:gap-12 sm:px-10 sm:py-3"
      >
        <a href={first.href} className={linkClass}>
          {first.label}
        </a>
        <a href={second.href} className={linkClass}>
          {second.label}
        </a>

        <a href="#top" aria-label="Ross Law Office — top of page" className="shrink-0">
          <Logo className="h-5 w-5 text-white transition-transform duration-300 hover:scale-110 sm:h-7 sm:w-7" />
        </a>

        <a href={third.href} className={linkClass}>
          {third.label}
        </a>
        <a href={fourth.href} className={linkClass}>
          {fourth.label}
        </a>
      </nav>
    </header>
  )
}
