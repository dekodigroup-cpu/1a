type Props = {
  color?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Cinematic mist. Three wide radial billows rising off the bottom edge under a
 * vertical wash, so one section's colour dissolves into the next with no hard
 * seam. Deliberately built from gradients alone — a large `filter: blur()`
 * here is expensive enough on software rasterisers and low-end phones to stall
 * the compositor, and the soft stops get the same look for nothing.
 */
export function FogTransition({ color = '#410c01', className = '', style }: Props) {
  const billow = (w: number, h: number, x: number, peak: string, mid: string) =>
    `radial-gradient(${w}% ${h}% at ${x}% 104%, ${color}${peak} 0%, ${color}${mid} 30%, ${color}3d 58%, ${color}14 74%, ${color}00 86%)`

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full ${className}`}
      style={{
        ...style,
        backgroundImage: [
          billow(64, 86, 10, 'f2', 'c4'),
          billow(52, 68, 40, 'e0', 'a8'),
          billow(70, 92, 78, 'f2', 'c4'),
          billow(44, 60, 98, 'd6', '99'),
          `linear-gradient(to bottom, ${color}00 0%, ${color}0f 24%, ${color}47 52%, ${color}a8 74%, ${color}eb 88%, ${color} 100%)`,
        ].join(','),
      }}
    />
  )
}
