'use client'

import { useRef, type PropsWithChildren, type MouseEvent } from 'react'

/**
 * motion-system.md §3 Tier 4 — magneticCTA. Max 6px travel; beyond
 * that it reads as broken, not premium. Desktop pointer devices only,
 * and a no-op under reduced motion — both checked at the point of use,
 * not via CSS media features, since this is a JS-driven transform.
 */
const MAX_TRAVEL_PX = 6

export function MagneticCta({ children }: PropsWithChildren) {
  const ref = useRef<HTMLSpanElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLSpanElement>) {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = el.getBoundingClientRect()
    const dx = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * MAX_TRAVEL_PX
    const dy = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * MAX_TRAVEL_PX
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="duration-fast ease-soft-ui inline-block transition-transform"
    >
      {children}
    </span>
  )
}
