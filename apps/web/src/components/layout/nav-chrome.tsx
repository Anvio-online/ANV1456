'use client'

import { useEffect, useRef, type PropsWithChildren } from 'react'

/**
 * design-system.md §6.5 — transparent over the hero, gains a blurred
 * fill + hairline past 80px of scroll. Server-rendered markup (nav.tsx)
 * stays fully usable before this hydrates; this only ever sets a class
 * and a data-theme, never gates content.
 *
 * The theme retarget is the reason this is a client component at all.
 * The nav is the one element pinned across sections of both canvases,
 * so a fixed data-theme="dark" can only be right over half the page —
 * over a light section the dark scrim rendered as a flat grey slab.
 * conventions.md §3 bans branching on theme in JS to pick colours; this
 * doesn't do that. It reads which section the nav physically overlaps
 * and hands that theme to CSS, which still owns every colour value.
 */
const CONDENSE_AT_PX = 80

export function NavChrome({ children }: PropsWithChildren) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-theme]'))
    let frame = 0

    function apply() {
      frame = 0
      const nav = el!
      nav.classList.toggle('is-condensed', window.scrollY > CONDENSE_AT_PX)

      // Probe the nav's own midline rather than scrollY, so this stays
      // correct regardless of section heights or initial scroll position.
      const probeY = nav.offsetHeight / 2
      let theme = 'dark'
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= probeY && rect.bottom > probeY) {
          theme = section.dataset.theme ?? 'dark'
          break
        }
      }
      if (nav.dataset.theme !== theme) nav.dataset.theme = theme
    }

    // rAF-throttled: apply() reads layout, and doing that synchronously
    // on every scroll event forces a reflow per event.
    function onScroll() {
      if (frame) return
      frame = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header ref={ref} data-theme="dark" className="nav-chrome h-nav-h fixed inset-x-0 top-0 z-50">
      {children}
    </header>
  )
}
