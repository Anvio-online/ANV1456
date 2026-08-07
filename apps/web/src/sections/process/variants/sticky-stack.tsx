'use client'

import { useEffect, useRef } from 'react'
import type { ProcessProps, ProcessStage } from '../process.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * automate-spec.md §6 / motion-system.md §3 stickyStack — Tier 3, and
 * deliberately not Home's horizontalPin (that stays Home's one Tier 1
 * signature piece; see process/index.tsx's docstring).
 *
 * Each card is `position: sticky` at a staggered `top`, so cards
 * naturally overlap as you scroll — that part needs no JS. The spec's
 * "scaling to 0.96 and dimming as the next overlaps" on top of that
 * does: a single rAF-throttled scroll listener (same pattern as
 * NavChrome) measures how close each card is to being covered by the
 * next one and writes transform/opacity directly via ref, never
 * through React state — a re-render per scroll frame for a five-card
 * stack is the kind of cost motion-system.md §6 rule 8 exists to catch.
 *
 * Reduced motion: the scroll listener still runs (it only ever writes
 * transform/opacity, no layout thrash), but globals.css's blanket
 * `transition-duration: 0.001ms` rule makes every step of it read as
 * instant rather than animated — same mechanism the rest of the site
 * uses, not a special case here.
 */
export function StickyStack({
  eyebrow,
  heading,
  body,
  stages,
  headingTag,
}: ProcessProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="mb-head-gap flex flex-col gap-4">
        {eyebrow ? (
          <span className="text-label text-accent-text font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <HeadingTagEl className="max-w-headline text-h2 leading-none tracking-tight">
            {heading}
          </HeadingTagEl>
        ) : null}
        {body ? <p className="max-w-measure text-body-l text-text-2">{body}</p> : null}
      </div>

      <StackedCards stages={stages} />
    </div>
  )
}

const STAGE_TOP_STEP_PX = 24
const NAV_CLEARANCE_PX = 96

function StackedCards({ stages }: { stages: ProcessStage[] }) {
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    let frame = 0
    let idleTimer = 0

    // motion-system.md §6 rule 3 — will-change on interaction start,
    // removed on end, never a static class. "End" here is 200ms of no
    // scroll events, not a discrete gesture end.
    function markActive() {
      const cards = cardRefs.current.filter((el): el is HTMLElement => el !== null)
      for (const card of cards) card.style.willChange = 'transform, opacity'
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        for (const card of cards) card.style.willChange = 'auto'
      }, 200)
    }

    function apply() {
      frame = 0
      markActive()
      const cards = cardRefs.current.filter((el): el is HTMLElement => el !== null)
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]!
        const next = cards[i + 1]
        if (!next) {
          card.style.transform = ''
          card.style.opacity = ''
          continue
        }
        const cardTop = card.getBoundingClientRect().top
        const nextTop = next.getBoundingClientRect().top
        // 0 while the next card hasn't reached this one yet, 1 once it's
        // fully covered it — driven by actual scroll geometry, not time.
        const gap = nextTop - cardTop
        const progress = Math.min(1, Math.max(0, 1 - gap / STAGE_TOP_STEP_PX / 4))
        card.style.transform = `scale(${1 - progress * 0.04})`
        card.style.opacity = `${1 - progress * 0.35}`
      }
    }

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
  }, [stages.length])

  return (
    <div className="flex flex-col gap-6">
      {stages.map((stage, i) => (
        <article
          key={stage.number}
          ref={(el) => {
            cardRefs.current[i] = el
          }}
          className="border-border bg-surface shadow-card-lg duration-fast ease-soft-ui sticky flex flex-col gap-3 rounded-xl border p-7 sm:flex-row sm:gap-7"
          style={{ top: `${NAV_CLEARANCE_PX + i * STAGE_TOP_STEP_PX}px` }}
        >
          <span className="text-display-l text-accent-text font-mono tabular-nums sm:w-24 sm:shrink-0">
            {stage.number}
          </span>
          <div className="flex flex-1 flex-col gap-3">
            <h3 className="font-display text-h3 leading-tight tracking-tight">{stage.title}</h3>
            <p className="text-body-s text-text-2">{stage.promise}</p>
            <ul className="flex flex-col gap-1.5">
              {stage.deliverables.map((d) => (
                <li key={d} className="text-label text-text-3 flex gap-2 font-mono">
                  <span aria-hidden className="text-accent-text">
                    →
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <span className="text-label text-text-3 font-mono uppercase tracking-widest">
              {stage.duration}
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}
