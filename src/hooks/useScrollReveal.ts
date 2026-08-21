import { useEffect, useRef } from 'react'

/** Longest stagger delay any section uses, plus the animation and some slack. */
const SAFETY_MS = 2600

/**
 * Adds `.revealed` to every `.reveal` / `.reveal-scale` descendant of the
 * returned ref as it enters the viewport, then stops observing it.
 *
 * A CSS animation can be left play-pending if the compositor never hands it a
 * start time, which would strand the element at `opacity: 0` — invisible copy
 * on a page whose whole job is to be read. So every revealed element is checked
 * once the animation should have finished and forced visible if it has not.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll<HTMLElement>('.reveal, .reveal-scale'))
    if (targets.length === 0) return

    const show = (el: HTMLElement) => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    }

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach(show)
      return
    }

    const timers: number[] = []
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.classList.add('revealed')
          observer.unobserve(el)
          timers.push(
            window.setTimeout(() => {
              if (getComputedStyle(el).opacity === '0') show(el)
            }, SAFETY_MS),
          )
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [threshold])

  return ref
}
