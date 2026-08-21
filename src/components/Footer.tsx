import { Facebook, MapPin, Scale, Phone } from 'lucide-react'
import { Logo } from './Logo'
import { FIRM, NAV } from '../lib/content'

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${FIRM.street}, ${FIRM.city}, ${FIRM.state} ${FIRM.zip}`,
)}`

const iconLink = 'text-white/80 transition-colors duration-300 hover:text-white'
const textLink =
  'font-inter text-[9px] uppercase font-medium tracking-[0.15em] text-white/80 transition-colors duration-300 hover:text-white sm:text-[10px] sm:tracking-[0.25em]'

export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden border-t border-white/10 bg-ink px-5 pb-28 pt-20 sm:px-10 sm:pb-24 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo className="h-8 w-8 text-brass" />
            <p className="mt-6 font-arsenica text-2xl leading-snug text-white sm:text-3xl">{FIRM.name}</p>
            <p className="mt-4 max-w-sm font-inter text-[13px] leading-relaxed text-white/50">
              Estate planning, wills, trusts, probate avoidance, real estate closings and personal injury for
              families across {FIRM.region}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-inter text-[9px] uppercase tracking-[0.28em] text-white/40">Site</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-inter text-sm text-white/70 transition-colors duration-300 hover:text-brass"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#book"
                  className="font-inter text-sm text-white/70 transition-colors duration-300 hover:text-brass"
                >
                  Book a session
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-inter text-[9px] uppercase tracking-[0.28em] text-white/40">Office</p>
            <address className="mt-5 space-y-3 not-italic">
              <a
                href={MAPS}
                target="_blank"
                rel="noreferrer"
                className="block font-inter text-sm leading-relaxed text-white/70 transition-colors duration-300 hover:text-brass"
              >
                {FIRM.street}
                <br />
                {FIRM.city}, {FIRM.state} {FIRM.zip}
              </a>
              <a
                href={FIRM.phoneHref}
                className="block font-inter text-sm text-white/70 transition-colors duration-300 hover:text-brass"
              >
                {FIRM.phone}
              </a>
              <p className="font-inter text-[13px] leading-relaxed text-white/40">
                {FIRM.hours}
                <br />
                {FIRM.hoursClosed}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="max-w-3xl font-inter text-[11px] leading-relaxed text-white/35">
            This website is for general information only and is not legal advice. Viewing it or contacting the
            firm does not create an attorney-client relationship. Free background information is available on
            request. Personal Family Lawyer® and Kids Protection Plan® are registered marks used under
            licence.
          </p>
          <p className="mt-5 font-inter text-[10px] uppercase tracking-[0.2em] text-white/30">
            © {new Date().getFullYear()} {FIRM.name} · West Point, Mississippi
          </p>
        </div>
      </div>
    </footer>
  )
}

export function FixedBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3 py-2.5 backdrop-blur-[2px] sm:px-10 sm:py-4">
      <div className="flex items-center gap-4 sm:gap-6">
        <a
          href="https://www.facebook.com/people/Ross-Law-Office-PLLC/61572520262043/"
          target="_blank"
          rel="noreferrer"
          aria-label="Ross Law Office on Facebook"
          className={iconLink}
        >
          <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </a>
        <a href={MAPS} target="_blank" rel="noreferrer" aria-label="Directions to the office" className={iconLink}>
          <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </a>
        <Scale className="hidden h-3.5 w-3.5 text-white/40 sm:block sm:h-4 sm:w-4" aria-hidden="true" />
        <span className="hidden font-inter text-[10px] uppercase tracking-[0.25em] text-white/50 sm:inline">
          Attorney Advertising
        </span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <a href="#answers" className={`${textLink} hidden sm:inline`}>
          Answers
        </a>
        <a
          href={FIRM.phoneHref}
          className="liquid-glass liquid-glass-brass inline-flex items-center gap-2 rounded-full px-4 py-2 font-inter text-[9px] uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.04] sm:px-6 sm:py-2.5 sm:text-[10px] sm:tracking-[0.25em]"
        >
          <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="sm:hidden">Call</span>
          <span className="hidden sm:inline">{FIRM.phone}</span>
        </a>
      </div>
    </div>
  )
}
