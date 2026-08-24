/**
 * The Ross Law mark: three angular rings around a solid core — the same idea
 * the hero renders in 3D, flattened to a seal.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="none" aria-hidden="true">
      <path d="M128 6 L250 128 L128 250 L6 128 Z" stroke="currentColor" strokeWidth="9" />
      <path d="M128 60 L196 128 L128 196 L60 128 Z" stroke="currentColor" strokeWidth="9" />
      <path d="M128 102 L154 128 L128 154 L102 128 Z" fill="currentColor" />
    </svg>
  )
}
