'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import type { GrowthChartState } from '@/sections/growth-chart/growth-chart.types'

/**
 * motion-system.md §7.4 — Grow's Tier 1 signature scene. Only ever
 * mounted by growth-chart/variants/dashboard-evolve.tsx once desktop +
 * motion-allowed + near-viewport are already confirmed, same contract
 * as every other Tier 1 scene's wrapper on this site.
 *
 * The line only ever grows — stroke-dashoffset is driven continuously
 * by scrollYProgress (not discretized per state, unlike the caption/
 * metrics below it), using the SVG `pathLength` attribute so the dash
 * math is 0-1 regardless of the path's actual pixel length. Metric
 * readouts and the caption DO discretize to the active month, and swap
 * instantly rather than counting up per transition — a simplification
 * from motion-system.md §7.4's literal "counterRoll per state" for a
 * value that changes continuously as someone scrolls, not once on
 * first appearance (CounterRoll's actual design, see its own docstring).
 */
const PIN_HEIGHT_VH = 180
const CHART_VIEW_W = 600
const CHART_VIEW_H = 200

export function GrowthChartScene({
  states,
  disclaimer,
}: {
  states: GrowthChartState[]
  disclaimer: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const railWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(states.length - 1, Math.max(0, Math.floor(v * states.length)))
    setActiveIndex((prev) => (prev === idx ? prev : idx))
  })

  const activeState = states[activeIndex]
  const points = states.map((s, i) => {
    const x = (i / Math.max(1, states.length - 1)) * CHART_VIEW_W
    const y = CHART_VIEW_H - 20 - (s.chartHeight / 100) * (CHART_VIEW_H - 40)
    return `${x} ${y}`
  })
  const linePath = `M ${points.join(' L ')}`

  return (
    <div ref={containerRef} style={{ height: `${PIN_HEIGHT_VH}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-8">
        <div className="max-w-page px-gutter mx-auto grid w-full grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="text-label text-accent-text font-mono uppercase tracking-widest">
              {activeState?.month} · {activeState?.label}
            </span>
            <p className="text-body-s text-text-2 mt-3">{activeState?.caption}</p>
            <div className="mt-6 flex flex-col gap-4">
              {activeState?.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col gap-0.5">
                  <span className="text-h3 text-accent-text font-mono tabular-nums">
                    {metric.value}
                  </span>
                  <span className="text-label text-text-3 font-mono uppercase tracking-widest">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-accent-line bg-surface shadow-card-lg rounded-xl border p-6">
              <svg
                viewBox={`0 0 ${CHART_VIEW_W} ${CHART_VIEW_H}`}
                className="h-64 w-full"
                aria-hidden
              >
                <path
                  d={`M 0 ${CHART_VIEW_H - 20} H ${CHART_VIEW_W} M 0 ${CHART_VIEW_H / 2} H ${CHART_VIEW_W}`}
                  stroke="var(--border)"
                  strokeWidth="1"
                  fill="none"
                />
                <motion.path
                  d={linePath}
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: dashOffset }}
                />
              </svg>
            </div>
            {/* motion-system.md §7.4's honesty constraint: a visible
                caption, not a footnote — deliberately body text, not
                the tiny mono-caps label style used elsewhere in this
                scene, so it reads as a sentence someone actually reads
                rather than fine print. */}
            <p className="text-body-s text-text-2 mt-4">{disclaimer}</p>
          </div>
        </div>

        <div className="px-gutter absolute inset-x-0 bottom-16">
          <div className="max-w-page mx-auto flex items-center gap-4">
            <div className="bg-border h-0.5 flex-1 rounded-full">
              <motion.div style={{ width: railWidth }} className="bg-accent h-full rounded-full" />
            </div>
            <span className="text-label text-text-3 shrink-0 font-mono tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(states.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* All six states' text, always in the DOM — motion-system.md
          §7.4: real indexable text regardless of animation state. */}
      <ul className="sr-only">
        {states.map((state) => (
          <li key={state.month}>
            {state.month} · {state.label}. {state.caption}{' '}
            {state.metrics.map((m) => `${m.label}: ${m.value}`).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  )
}
