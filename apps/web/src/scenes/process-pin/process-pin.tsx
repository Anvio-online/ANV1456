'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import type { ProcessStage } from '@/lib/sections/types'
import { cn } from '@/lib/utils/cn'

/**
 * motion-system.md §7.1 — Home's signature Tier 1 scene. Pinned 220vh;
 * scroll maps to horizontal translate across five panels; a progress
 * rail fills as you go; the active stage number lights up in accent.
 *
 * Only ever mounted by horizontal-pin.tsx once desktop + motion-allowed
 * + near-viewport are all already confirmed — this component doesn't
 * re-check any of that itself, and has no reduced-motion or mobile
 * fallback of its own by design (the wrapper's ProcessStaticList is
 * the one fallback implementation, not duplicated here).
 *
 * All five stages render in the DOM unconditionally — the horizontal
 * position is a transform, never a mount/unmount.
 */
const PIN_HEIGHT_VH = 220

export function ProcessPinScene({
  stages,
  header,
}: {
  stages: ProcessStage[]
  /** The section's eyebrow/heading/body, rendered INSIDE the pinned
   * frame. Kept out of the tall scroll container it used to sit above:
   * there, the h-screen frame centred a 420px card in the viewport and
   * left ~240px of dead space between the heading and the cards on
   * approach. Pinned together, they read as one composition and the
   * heading stays on screen as context while the track scrolls. */
  header: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [maxShift, setMaxShift] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    function measure() {
      const track = trackRef.current
      if (!track) return
      const viewportWidth = track.parentElement?.clientWidth ?? window.innerWidth
      setMaxShift(Math.max(0, track.scrollWidth - viewportWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift])
  const railWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(stages.length - 1, Math.max(0, Math.round(v * (stages.length - 1))))
    setActiveIndex((prev) => (prev === idx ? prev : idx))
  })

  return (
    <div ref={containerRef} style={{ height: `${PIN_HEIGHT_VH}vh` }} className="relative">
      {/* pt-nav-h clears the fixed nav, which this frame scrolls underneath
          once pinned; the header's own pt-8 is the breathing room on top
          of that, so the two concerns stay separately adjustable. */}
      <div className="pt-nav-h sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="max-w-page px-gutter mx-auto w-full shrink-0 pt-8">{header}</div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="px-gutter flex flex-1 items-center gap-6 will-change-transform"
        >
          {stages.map((stage, i) => (
            <StagePanel key={stage.number} stage={stage} active={i === activeIndex} />
          ))}
        </motion.div>

        <div className="px-gutter absolute inset-x-0 bottom-16">
          <div className="bg-border h-0.5 rounded-full">
            <motion.div style={{ width: railWidth }} className="bg-accent h-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StagePanel({ stage, active }: { stage: ProcessStage; active: boolean }) {
  return (
    <article
      aria-current={active ? 'step' : undefined}
      className="h-105 w-120 border-border bg-surface shadow-card flex shrink-0 flex-col gap-4 rounded-xl border p-9"
    >
      <span
        className={cn(
          'text-display-l duration-scene font-mono tabular-nums transition-colors',
          active ? 'text-accent-text' : 'text-text-3',
        )}
      >
        {stage.number}
      </span>
      <h3 className="font-display text-h3 leading-tight tracking-tight">{stage.title}</h3>
      <p className="text-body-s text-text-2">{stage.promise}</p>
      <ul className="mt-auto flex flex-col gap-2">
        {stage.deliverables.map((d) => (
          <li key={d} className="text-label text-text-3 flex gap-2 font-mono">
            <span aria-hidden className="text-accent-text">
              →
            </span>
            {d}
          </li>
        ))}
      </ul>
      <span className="border-border text-label text-text-3 border-t pt-3 font-mono uppercase tracking-widest">
        {stage.duration}
      </span>
    </article>
  )
}
