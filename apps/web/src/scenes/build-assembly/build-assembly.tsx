'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import type { BuildAssemblyPass } from '@/sections/build-assembly/build-assembly.types'
import { cn } from '@/lib/utils/cn'

/**
 * motion-system.md §7.3 — Build's Tier 1 signature scene. Only ever
 * mounted by build-assembly/variants/wireframe-to-render.tsx once
 * desktop + motion-allowed + near-viewport are already confirmed; this
 * component doesn't re-check any of that itself, mirroring
 * scenes/process-pin/ and scenes/workflow-graph/'s contract with their
 * wrappers. Reduced-motion/mobile fallback lives entirely in
 * BuildAssemblyStaticList, not duplicated here.
 *
 * Same discrete-stage scroll mapping as Home's Process scene
 * (useScroll + useMotionValueEvent), not a horizontal traverse — the
 * frame itself is what's active here, not a track of panels. All four
 * fidelity layers stay mounted at all times; only opacity moves
 * (motion-system.md §6 rule 2), so nothing here ever mounts/unmounts
 * across the scroll range.
 */
const PIN_HEIGHT_VH = 180
const PASS_COUNT = 4

export function BuildAssemblyScene({ passes }: { passes: BuildAssemblyPass[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const railWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(PASS_COUNT - 1, Math.max(0, Math.floor(v * PASS_COUNT)))
    setActiveIndex((prev) => (prev === idx ? prev : idx))
  })

  const activePass = passes[activeIndex]

  return (
    <div ref={containerRef} style={{ height: `${PIN_HEIGHT_VH}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-8">
        <div className="max-w-page px-gutter mx-auto grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-label text-accent-text font-mono uppercase tracking-widest">
              {activePass?.caption}
            </span>
            <h3 className="font-display text-h3 mt-3 leading-tight tracking-tight">
              {activePass?.label}
            </h3>
            <p className="text-body-s text-text-2 mt-3">{activePass?.explainer}</p>
          </div>

          <div className="lg:col-span-7">
            <div className="border-accent-line bg-surface shadow-card-lg h-100 relative overflow-hidden rounded-xl border">
              <StructureLayer active={activeIndex === 0} />
              <DesignLayer active={activeIndex === 1} />
              <RealDataLayer active={activeIndex === 2} />
              <ShippedLayer active={activeIndex === 3} />
            </div>
          </div>
        </div>

        <div className="px-gutter absolute inset-x-0 bottom-16">
          <div className="max-w-page mx-auto flex items-center gap-4">
            <div className="bg-border h-0.5 flex-1 rounded-full">
              <motion.div style={{ width: railWidth }} className="bg-accent h-full rounded-full" />
            </div>
            <span className="text-label text-text-3 shrink-0 font-mono tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(PASS_COUNT).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* All four passes' text, always in the DOM — motion-system.md
          §7.3: real indexable text regardless of animation state. */}
      <ul className="sr-only">
        {passes.map((pass) => (
          <li key={pass.label}>
            {pass.caption} — {pass.label}. {pass.explainer}
          </li>
        ))}
      </ul>
    </div>
  )
}

function LayerFrame({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <div
      aria-hidden
      className={cn(
        'duration-base absolute inset-0 flex flex-col gap-3 p-6 transition-opacity ease-in-out',
        active ? 'opacity-100' : 'opacity-0',
      )}
    >
      {children}
    </div>
  )
}

/** Pass 01 — grey blocks, real layout, no styling. */
function StructureLayer({ active }: { active: boolean }) {
  return (
    <LayerFrame active={active}>
      <div className="bg-border-soft h-40 w-full rounded-md" />
      <div className="flex flex-col gap-2">
        <div className="bg-border-soft h-4 w-2/3 rounded-sm" />
        <div className="bg-border-soft h-4 w-1/3 rounded-sm" />
      </div>
      <div className="bg-border-soft mt-2 h-10 w-32 rounded-md" />
    </LayerFrame>
  )
}

/** Pass 02 — type, colour, spacing land; blocks become components. */
function DesignLayer({ active }: { active: boolean }) {
  return (
    <LayerFrame active={active}>
      <div className="from-accent-wash to-surface-2 h-40 w-full rounded-lg bg-gradient-to-br" />
      <div className="flex flex-col gap-2">
        <div className="bg-text h-4 w-2/3 rounded-sm opacity-80" />
        <div className="bg-text-3 h-3 w-1/3 rounded-sm" />
      </div>
      <div className="bg-accent mt-2 h-10 w-32 rounded-md" />
    </LayerFrame>
  )
}

/** Pass 03 — lorem becomes real product names, real prices, a real empty state. */
function RealDataLayer({ active }: { active: boolean }) {
  return (
    <LayerFrame active={active}>
      <div className="from-accent-wash to-surface-2 flex h-40 w-full items-center justify-center rounded-lg bg-gradient-to-br">
        <span className="text-label text-text-3 font-mono uppercase tracking-widest">
          Ridge Hiking Jacket
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-body font-medium">Ridge Hiking Jacket</span>
        <span className="text-accent-ink font-mono text-sm">₹4,200 · 3 left in stock</span>
      </div>
      <div className="border-border-soft mt-2 rounded-md border border-dashed p-3">
        <span className="text-label text-text-3 font-mono uppercase tracking-widest">
          No reviews yet — be the first
        </span>
      </div>
    </LayerFrame>
  )
}

/** Pass 04 — live chrome: loading state, error state, a Lighthouse badge. */
function ShippedLayer({ active }: { active: boolean }) {
  return (
    <LayerFrame active={active}>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="bg-border h-1.5 w-1.5 rounded-full" />
          <span className="bg-border h-1.5 w-1.5 rounded-full" />
          <span className="bg-border h-1.5 w-1.5 rounded-full" />
        </div>
        <span className="border-border-soft text-label text-accent-text rounded-full border px-2.5 py-1 font-mono">
          Lighthouse 94
        </span>
      </div>
      <div className="from-accent-wash to-surface-2 flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br">
        <span className="text-label text-text-3 font-mono uppercase tracking-widest">
          Ridge Hiking Jacket
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-body font-medium">Ridge Hiking Jacket</span>
        <span className="text-accent-ink font-mono text-sm">₹4,200 · 3 left in stock</span>
      </div>
      <div className="border-error/40 bg-error/10 mt-1 rounded-md border p-2.5">
        <span className="text-error text-label font-mono">
          Couldn’t reach shipping estimator — retrying
        </span>
      </div>
    </LayerFrame>
  )
}
