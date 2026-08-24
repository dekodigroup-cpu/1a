import { MapPin, Clock, Phone } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePointerTilt } from '../hooks/usePointerTilt'
import { Photo } from './Photo'
import { PHOTOS } from '../lib/photos'
import { FIRM, TEAM } from '../lib/content'

function AttorneyCard({ person, index }: { person: (typeof TEAM)[number]; index: number }) {
  const { tilt, enabled, handlers } = usePointerTilt(6)
  const transform = enabled
    ? `rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`
    : undefined

  return (
    <article
      {...handlers}
      className="reveal scene-3d group"
      style={{ animationDelay: `${0.14 + index * 0.14}s` }}
    >
      <div
        className="preserve-3d transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform }}
      >
        <div className="relative overflow-hidden rounded-[2px] border border-white/10">
          <Photo
            photo={PHOTOS[person.key]}
            label={person.name}
            className="aspect-[4/5] w-full object-cover grayscale-[0.35] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        </div>
        <div className="relative pt-6" style={{ transform: 'translateZ(24px)' }}>
          <h3 className="font-arsenica text-2xl tracking-wide text-white sm:text-3xl">{person.name}</h3>
          <p className="mt-2 font-inter text-[9px] uppercase tracking-[0.26em] text-brass">{person.role}</p>
          <p className="mt-4 max-w-sm font-inter text-[13px] leading-relaxed text-white/60">{person.bio}</p>
        </div>
      </div>
    </article>
  )
}

export function Firm() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      id="firm"
      ref={ref}
      className="grain relative overflow-hidden bg-ink px-5 pb-[36vh] pt-24 sm:px-10 sm:pt-32 lg:px-20 lg:pt-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="reveal font-inter text-[10px] uppercase tracking-[0.35em] text-white/45 sm:text-xs">
            The firm
          </p>
          <h2 className="reveal mt-6 font-arsenica text-4xl leading-[1.1] tracking-wide text-white sm:text-5xl lg:text-6xl">
            A Court Street practice,
            <br />
            not a document mill.
          </h2>
          <p
            className="reveal mt-7 font-inter text-sm leading-relaxed text-white/60"
            style={{ animationDelay: '0.1s' }}
          >
            Ross Law Office has served Mississippi families since {FIRM.since}, backed by nearly a century of
            combined legal experience. You will know the lawyer who drafts your plan, and you will be able to
            reach him afterwards.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:mt-20 sm:grid-cols-2 sm:gap-12 lg:gap-20">
          {TEAM.map((person, i) => (
            <AttorneyCard key={person.name} person={person} index={i} />
          ))}
        </div>

        {/* Where we are */}
        <div className="mt-20 grid gap-8 border-t border-white/10 pt-14 sm:mt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div className="reveal relative overflow-hidden rounded-[2px] border border-white/10">
            <Photo
              photo={PHOTOS.office}
              label="384 Court Street"
              className="aspect-[3/2] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>

          <dl className="reveal space-y-8 self-center" style={{ animationDelay: '0.12s' }}>
            <div className="flex gap-4">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-brass" />
              <div>
                <dt className="font-inter text-[9px] uppercase tracking-[0.28em] text-white/45">Office</dt>
                <dd className="mt-2 font-arsenica text-xl text-white sm:text-2xl">
                  {FIRM.street}
                  <br />
                  {FIRM.city}, {FIRM.state} {FIRM.zip}
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-brass" />
              <div>
                <dt className="font-inter text-[9px] uppercase tracking-[0.28em] text-white/45">Hours</dt>
                <dd className="mt-2 font-inter text-sm text-white/80">
                  {FIRM.hours}
                  <br />
                  <span className="text-white/45">{FIRM.hoursClosed}</span>
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-brass" />
              <div>
                <dt className="font-inter text-[9px] uppercase tracking-[0.28em] text-white/45">Telephone</dt>
                <dd className="mt-2">
                  <a
                    href={FIRM.phoneHref}
                    className="font-arsenica text-2xl text-white transition-colors duration-300 hover:text-brass sm:text-3xl"
                  >
                    {FIRM.phone}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
