'use client'

import { useEffect, useRef, useState } from 'react'
import type { WorkflowNode, WorkflowEdge } from '@/sections/workflow-graph/workflow-graph.types'
import { cn } from '@/lib/utils/cn'

/**
 * motion-system.md §7.2 — Automate's Tier 1 signature scene. Only ever
 * mounted by workflow-graph/variants/live.tsx once desktop +
 * motion-allowed + near-viewport are already confirmed; this component
 * doesn't re-check any of that itself, mirroring scenes/process-pin/'s
 * contract with its wrapper. Reduced-motion/mobile fallback lives
 * entirely in WorkflowGraphStaticList, not duplicated here.
 *
 * Topology (fixed, not data-driven beyond node/edge content): Customer
 * -> AI Agent -> [branch: Knowledge Base and back] -> CRM -> WhatsApp
 * -> Team, laid out on a 5-column CSS grid with Knowledge Base sitting
 * above AI Agent. SVG connector paths are computed from actual node
 * DOM positions (measured via ref + getBoundingClientRect, remeasured
 * on resize) rather than guessed percentages, so they stay aligned
 * regardless of exact label widths.
 */
const CASCADE_STEP_MS = 1500

const NODE_GRID_POSITION: Record<string, { col: number; row: number }> = {
  customer: { col: 1, row: 2 },
  'ai-agent': { col: 2, row: 2 },
  'knowledge-base': { col: 2, row: 1 },
  crm: { col: 3, row: 2 },
  whatsapp: { col: 4, row: 2 },
  team: { col: 5, row: 2 },
}

interface EdgePath {
  from: string
  to: string
  d: string
}

export function WorkflowGraphScene({
  scenario,
  nodes,
  edges,
}: {
  scenario: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const [activeIndex, setActiveIndex] = useState(0)
  const [offscreen, setOffscreen] = useState(true)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [paths, setPaths] = useState<EdgePath[]>([])

  const paused = offscreen || hoveredId !== null
  const activeId = hoveredId ?? nodes[activeIndex]?.id ?? null
  const activeNode = nodes.find((n) => n.id === activeId) ?? null
  const activeEdge = paths.find((p) => p.to === activeId) ?? null

  // Measure connector geometry from real node positions, not guessed
  // coordinates — stays correct regardless of label width or viewport.
  useEffect(() => {
    function measure() {
      const container = containerRef.current
      if (!container) return
      const cRect = container.getBoundingClientRect()
      const next: EdgePath[] = []
      for (const edge of edges) {
        const fromEl = nodeRefs.current[edge.from]
        const toEl = nodeRefs.current[edge.to]
        if (!fromEl || !toEl) continue
        const fr = fromEl.getBoundingClientRect()
        const tr = toEl.getBoundingClientRect()
        const x1 = fr.left + fr.width / 2 - cRect.left
        const y1 = fr.top + fr.height / 2 - cRect.top
        const x2 = tr.left + tr.width / 2 - cRect.left
        const y2 = tr.top + tr.height / 2 - cRect.top
        next.push({ from: edge.from, to: edge.to, d: `M ${x1} ${y1} L ${x2} ${y2}` })
      }
      setPaths(next)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [edges, nodes])

  // Cascade timer — advances through nodes in order. Paused (not reset)
  // on hover/tap or while offscreen, per motion-system.md §7.2.
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % nodes.length)
    }, CASCADE_STEP_MS)
    return () => window.clearInterval(id)
  }, [paused, nodes.length])

  // "Pauses when out of viewport... never animate offscreen."
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry?.isIntersecting), {
      threshold: 0.2,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="max-w-page px-gutter mx-auto">
      <p className="text-label text-text-3 mb-8 text-center font-mono uppercase tracking-widest">
        {scenario}
      </p>

      <div ref={containerRef} className="relative">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          {paths.map((path) => (
            <path
              key={`${path.from}-${path.to}`}
              d={path.d}
              stroke="var(--border)"
              strokeWidth="1.5"
              fill="none"
            />
          ))}
          {activeEdge ? (
            <circle
              key={activeIndex}
              r="4"
              className="workflow-graph-pulse"
              fill="var(--accent)"
              style={{ offsetPath: `path('${activeEdge.d}')` }}
            />
          ) : null}
        </svg>

        <div className="relative grid grid-cols-5 grid-rows-2 items-center gap-6 py-12">
          {nodes.map((node) => (
            <GraphNode
              key={node.id}
              node={node}
              active={node.id === activeId}
              position={NODE_GRID_POSITION[node.id]}
              nodeRef={(el) => {
                nodeRefs.current[node.id] = el
              }}
              onHoverStart={() => setHoveredId(node.id)}
              onHoverEnd={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>

      <div
        aria-live="polite"
        className="border-border-soft bg-surface max-w-measure mx-auto mt-8 flex min-h-24 flex-col gap-1 rounded-lg border p-5"
      >
        {activeNode ? (
          <>
            <span className="text-label text-accent-text font-mono uppercase tracking-widest">
              {activeNode.label} · {activeNode.status}
            </span>
            <p className="text-body-s text-text-2">{activeNode.explainer}</p>
          </>
        ) : null}
      </div>

      {/* All six explainers, always in the DOM — motion-system.md §7.2:
          "this section is a genuine SEO asset." The panel above only
          ever shows one at a time; crawlers and screen-reader users
          still get all of them regardless of animation/hover state. */}
      <ul className="sr-only">
        {nodes.map((node) => (
          <li key={node.id}>
            {node.label} — {node.status}. {node.explainer}
          </li>
        ))}
      </ul>
    </div>
  )
}

function GraphNode({
  node,
  active,
  position,
  nodeRef,
  onHoverStart,
  onHoverEnd,
}: {
  node: WorkflowNode
  active: boolean
  position: { col: number; row: number } | undefined
  nodeRef: (el: HTMLButtonElement | null) => void
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  return (
    <button
      type="button"
      ref={nodeRef}
      aria-pressed={active}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      // gridColumnStart/gridRowStart are per-node data, not a fixed set
      // of classes a call site could hardcode — a template-literal class
      // string here (col-start-${n}) would never match a literal token
      // Tailwind's static scanner can see, so the compiled CSS simply
      // wouldn't include it. Inline style is the correct escape hatch
      // for genuinely dynamic values (conventions.md §3), same as
      // sticky-stack.tsx's per-card `top` offset.
      style={position ? { gridColumnStart: position.col, gridRowStart: position.row } : undefined}
      className={cn(
        'duration-fast ease-soft-ui bg-bg flex flex-col items-start gap-1 rounded-lg border px-4 py-3 text-left transition-colors',
        active ? 'border-accent-line bg-accent-wash' : 'border-border-soft',
      )}
    >
      <span
        className={cn(
          'duration-fast text-body-s font-mono font-medium transition-colors',
          active ? 'text-accent' : 'text-text',
        )}
      >
        {node.label}
      </span>
      <span className="text-label text-text-3 font-mono uppercase tracking-widest">
        {node.status}
      </span>
    </button>
  )
}
