import { useCallback, useRef, useState } from 'react'

export type Tilt = { rx: number; ry: number; px: number; py: number; active: boolean }

const REST: Tilt = { rx: 0, ry: 0, px: 0.5, py: 0.5, active: false }

/**
 * Pointer-driven 3D tilt. Returns the handlers to spread onto the card and the
 * current rotation in degrees. Disabled for coarse pointers and reduced motion.
 */
export function usePointerTilt(maxDeg = 9) {
  const [tilt, setTilt] = useState<Tilt>(REST)
  const frame = useRef(0)

  const enabled =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!enabled) return
      const rect = event.currentTarget.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      if (frame.current) return
      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0
        setTilt({
          rx: (0.5 - py) * maxDeg * 2,
          ry: (px - 0.5) * maxDeg * 2,
          px,
          py,
          active: true,
        })
      })
    },
    [enabled, maxDeg],
  )

  const onPointerLeave = useCallback(() => {
    if (frame.current) {
      window.cancelAnimationFrame(frame.current)
      frame.current = 0
    }
    setTilt(REST)
  }, [])

  return { tilt, enabled, handlers: { onPointerMove, onPointerLeave } }
}
