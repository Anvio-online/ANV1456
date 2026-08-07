'use client'

import { useEffect, useRef, useState } from 'react'

/** Matches --dur-scene (tokens.css). JS-driven timing can't read a CSS
 * custom property without a getComputedStyle round-trip on mount, so
 * this is a documented literal, same pattern as magnetic-cta.tsx's
 * MAX_TRAVEL_PX. */
const DURATION_MS = 800

/**
 * motion-system.md §3 counterRoll — counts to the target over
 * --dur-scene, tabular-nums so nothing reflows. Fires once at 40%
 * viewport entry. Reduced motion: final value renders immediately, no
 * animation (motion-system.md §5).
 *
 * Stat values here are compound strings ("40+ hrs/mo", "2–4 weeks"),
 * not bare numbers. This extracts the LAST integer in the string and
 * animates only that; everything else — prefix, unit, the leading "2–"
 * in a range — sits still either side of it.
 *
 * The server-rendered (and pre-animation) state is the real final
 * string, never "0" — motion-system.md §6 rule 5 requires this be real
 * indexable text regardless of JS/animation state, and it means there's
 * no flash of a wrong number before hydration.
 */
export function CounterRoll({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const numbers = value.match(/\d+/g)
  const target = numbers ? Number(numbers[numbers.length - 1]) : null

  useEffect(() => {
    const el = ref.current
    if (!el || target === null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0

    function tick(startTime: number, now: number) {
      const progress = Math.min(1, (now - startTime) / DURATION_MS)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * (target as number))
      setDisplay(value.replace(/\d+(?!.*\d)/, String(current)))
      if (progress < 1) raf = requestAnimationFrame((t) => tick(startTime, t))
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        raf = requestAnimationFrame((t) => tick(t, t))
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [value, target])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}
