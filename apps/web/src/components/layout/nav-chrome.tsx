'use client'

import { useEffect, useRef, type PropsWithChildren } from 'react'

/**
 * design-system.md §6.5 — transparent over the hero, gains a blurred
 * dark fill + hairline past 80px of scroll. Server-rendered markup
 * (nav.tsx) stays fully usable before this hydrates; this only ever
 * adds a class, never gates content.
 */
const CONDENSE_AT_PX = 80

export function NavChrome({ children }: PropsWithChildren) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onScroll() {
      el!.classList.toggle('is-condensed', window.scrollY > CONDENSE_AT_PX)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={ref}
      data-theme="dark"
      className="nav-chrome h-18 duration-base ease-soft-ui [&.is-condensed]:bg-nav-condensed [&.is-condensed]:border-border-soft fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent [&.is-condensed]:backdrop-blur-md"
    >
      {children}
    </header>
  )
}
