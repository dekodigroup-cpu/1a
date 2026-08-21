import { useState } from 'react'
import type { PhotoSlot } from '../lib/photos'

type Props = {
  photo: PhotoSlot
  className?: string
  /** Shown in the placeholder while the real photograph is not in place yet. */
  label?: string
  eager?: boolean
  /** Background slots: fall back to a bare textured field, with no caption to
   *  collide with the type laid over it. */
  plain?: boolean
}

/**
 * A photograph slot. If the file has not been dropped into `public/photos/`
 * yet, it degrades to a quiet typographic plate rather than a broken image —
 * the layout never collapses and nothing generic is ever substituted in.
 */
export function Photo({ photo, className = '', label, eager = false, plain = false }: Props) {
  const [broken, setBroken] = useState(false)

  if (broken && plain) {
    return (
      <div
        className={`grain overflow-hidden bg-[#140805] ${className}`}
        role="img"
        aria-label={photo.alt}
        style={{
          backgroundImage:
            'radial-gradient(120% 90% at 30% 20%, rgba(198,161,91,0.10) 0%, rgba(20,8,5,0) 60%), radial-gradient(100% 80% at 80% 90%, rgba(65,12,1,0.55) 0%, rgba(20,8,5,0) 65%)',
        }}
      />
    )
  }

  if (broken) {
    return (
      <div
        className={`grain flex items-center justify-center overflow-hidden bg-[#170a06] ${className}`}
        role="img"
        aria-label={photo.alt}
      >
        <div className="px-6 text-center">
          <div className="mx-auto mb-4 h-px w-10 bg-[#c6a15b]/50" />
          <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#c6a15b]/70">
            {label ?? 'Photograph'}
          </p>
          <p className="mt-2 font-arsenica text-xs leading-relaxed text-white/35 sm:text-sm">{photo.alt}</p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={photo.src}
      alt={photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setBroken(true)}
      className={className}
      style={{ objectPosition: photo.position ?? '50% 50%' }}
    />
  )
}
