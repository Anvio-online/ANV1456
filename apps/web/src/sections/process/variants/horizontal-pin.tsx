'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { ProcessProps } from '../process.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { ProcessStaticList } from '../process-static-list'

/**
 * motion-system.md §6: Tier 1 scenes are dynamically imported with
 * ssr:false and IntersectionObserver-gated — this is that gate. The
 * heavy Motion-driven scene never even downloads for a visitor who
 * never scrolls this far, or for mobile/reduced-motion visitors, who
 * get the ProcessStaticList permanently instead.
 *
 * A Server Component can't call ssr:false directly (App Router
 * constraint) — that's the whole reason this file, not
 * process/index.tsx, owns the dynamic import.
 */
const ProcessPinScene = dynamic(
  () => import('@/scenes/process-pin/process-pin').then((m) => m.ProcessPinScene),
  { ssr: false },
)

export function HorizontalPin({
  eyebrow,
  heading,
  body,
  stages,
  headingTag,
}: ProcessProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag
  const containerRef = useRef<HTMLDivElement>(null)

  // Gate 1: only desktop, motion-allowed visitors are candidates for the
  // pinned scene at all. Defaults false so SSR and first client render
  // agree (no hydration mismatch) — everyone briefly sees, then keeps
  // (if ineligible) the static list.
  const [pinEligible, setPinEligible] = useState(false)
  useEffect(() => {
    const desktopMq = window.matchMedia('(min-width: 1024px)')
    const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    function evaluate() {
      setPinEligible(desktopMq.matches && !reducedMotionMq.matches)
    }
    evaluate()
    desktopMq.addEventListener('change', evaluate)
    reducedMotionMq.addEventListener('change', evaluate)
    return () => {
      desktopMq.removeEventListener('change', evaluate)
      reducedMotionMq.removeEventListener('change', evaluate)
    }
  }, [])

  // Gate 2: even if eligible, don't fetch the scene's JS until the
  // section is nearly in view.
  const [nearViewport, setNearViewport] = useState(false)
  useEffect(() => {
    if (!pinEligible || !containerRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNearViewport(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(containerRef.current)
    return () => io.disconnect()
  }, [pinEligible])

  const showPin = pinEligible && nearViewport

  return (
    <div ref={containerRef}>
      <div className="max-w-page px-gutter mx-auto mb-14">
        {eyebrow ? (
          <span className="text-label text-accent-text mb-4 block font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <HeadingTagEl className="max-w-headline text-h2 leading-none tracking-tight">
            {heading}
          </HeadingTagEl>
        ) : null}
        {body ? <p className="max-w-measure text-body-l text-text-2 mt-4">{body}</p> : null}
      </div>

      {showPin ? <ProcessPinScene stages={stages} /> : <ProcessStaticList stages={stages} />}
    </div>
  )
}
