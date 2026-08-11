'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

const LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Build', href: '/services/build' },
  { label: 'Automate', href: '/services/automate' },
  { label: 'Grow', href: '/services/grow' },
  { label: 'Guides', href: '/guides' },
  { label: 'Industries', href: '/industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
] as const

/**
 * design-system.md §6.5 mobile spec: full-screen overlay, links
 * stagger in, body scroll locked. md:hidden — desktop gets nav.tsx's
 * own hover dropdown instead, this covers the gap that left About and
 * Services unreachable from a phone (docs/README.md "Known gaps" #2).
 *
 * The panel itself stays mounted so its opacity can transition both
 * ways; only the link list inside unmounts on close, so `.fade-up-in`
 * (motion-system.md §3 fadeUpGroup) replays fresh every time it opens
 * instead of firing once and never again.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    function onChange() {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="text-text relative z-10 flex h-9 w-9 items-center justify-center"
      >
        <MenuIcon open={open} />
      </button>

      <div
        id="mobile-nav-panel"
        data-theme="dark"
        className={cn(
          'bg-bg pt-nav-h px-gutter duration-base ease-soft-ui fixed inset-0 flex flex-col transition-opacity',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        {open ? (
          <nav aria-label="Mobile" className="flex flex-col gap-1 pt-10">
            {LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="fade-up-in border-border-soft text-h4 font-display border-b py-4"
                style={{ '--reveal-i': i } as CSSVarStyle}
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="/contact"
              size="lg"
              onClick={() => setOpen(false)}
              className="fade-up-in mt-8"
              style={{ '--reveal-i': LINKS.length } as CSSVarStyle}
            >
              Book a call
            </Button>
          </nav>
        ) : null}
      </div>
    </div>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line
          x1="4"
          y1="8"
          x2="20"
          y2="8"
          className={cn(
            'duration-fast ease-soft-ui origin-center transition-transform',
            open && 'translate-y-1 rotate-45',
          )}
        />
        <line
          x1="4"
          y1="16"
          x2="20"
          y2="16"
          className={cn(
            'duration-fast ease-soft-ui origin-center transition-transform',
            open && '-translate-y-1 -rotate-45',
          )}
        />
      </g>
    </svg>
  )
}
