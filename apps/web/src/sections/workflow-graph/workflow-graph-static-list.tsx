import type { WorkflowNode } from './workflow-graph.types'

/**
 * The one honest fallback — same role as process-static-list.tsx:
 * (1) what's visible before the live scene's JS hydrates, (2) the
 * permanent view on mobile and under reduced motion. motion-system.md
 * §7.2: "static graph, all nodes in active state, explainers as a
 * stacked list below" — combined into one list here rather than two
 * separate renderings of the same six nodes, the same simplification
 * process-static-list.tsx already makes for Home's Process fallback.
 * Every node renders in its "active" styling permanently; the → between
 * cards carries the sequence that the live scene otherwise animates.
 */
export function WorkflowGraphStaticList({ nodes }: { nodes: WorkflowNode[] }) {
  return (
    <div className="max-w-content px-gutter mx-auto flex flex-col gap-3">
      {nodes.map((node, i) => (
        <div key={node.id} className="flex flex-col items-stretch gap-3">
          <article className="border-accent-line bg-surface flex flex-col gap-2 rounded-xl border p-6">
            {/* flex-wrap: a long label (e.g. "Knowledge Base") can wrap to
                two lines on narrow viewports; without wrap here the status
                badge stayed pinned to that same row via shrink-0 and
                overflowed the card's right edge instead of dropping to
                its own line. */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-display text-h4 leading-tight tracking-tight">
                {node.label}
              </span>
              <span className="text-label text-accent-text font-mono uppercase tracking-widest">
                {node.status}
              </span>
            </div>
            <p className="text-body-s text-text-2">{node.explainer}</p>
          </article>
          {i < nodes.length - 1 ? (
            <span aria-hidden className="text-accent-text mx-auto font-mono">
              ↓
            </span>
          ) : null}
        </div>
      ))}
    </div>
  )
}
