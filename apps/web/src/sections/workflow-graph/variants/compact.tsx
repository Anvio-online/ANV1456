import type { WorkflowGraphProps } from '../workflow-graph.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * service-leaf-spec.md §3a — a reduced form of Automate's Tier 1 scene
 * (motion-system.md §7.2) for the two Automate leaves. Server-rendered,
 * no dynamic import, no client JS at all: a one-time `fade-up-in`
 * stagger across 3–5 nodes in authored order is the entire "cascade."
 * No `pathPulse`, no hover-to-pause explainer layer — node labels and
 * statuses are always-visible real DOM text instead, which is also
 * strictly more accessible than the live scene's hover-gated version.
 */
export function Compact({
  eyebrow,
  heading,
  body,
  scenario,
  nodes,
  headingTag,
}: WorkflowGraphProps & { headingTag: HeadingTag }) {
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

      <p className="text-label text-text-3 mb-6 font-mono uppercase tracking-widest">{scenario}</p>

      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-0">
        {nodes.map((node, i) => (
          <div
            key={node.id}
            className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center"
          >
            <article
              className="border-accent-line bg-surface fade-up-in flex flex-1 flex-col gap-1 rounded-lg border p-4"
              style={{ '--reveal-i': i } as CSSVarStyle}
            >
              <span className="text-body-s font-medium">{node.label}</span>
              <span className="text-label text-accent-text font-mono uppercase tracking-widest">
                {node.status}
              </span>
            </article>
            {i < nodes.length - 1 ? (
              <span
                aria-hidden
                className="text-accent-text hidden shrink-0 px-2 font-mono md:block"
              >
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
