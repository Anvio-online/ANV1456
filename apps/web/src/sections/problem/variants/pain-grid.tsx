import type { ProblemProps } from '../problem.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * build-spec.md §3. Independent failure modes, not paired before/after
 * transformations — a grid of cells rather than before-after's
 * two-column table.
 */
export function PainGrid({
  eyebrow,
  heading,
  body,
  items = [],
  headingTag,
}: ProblemProps & { headingTag: HeadingTag }) {
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.pain}
            className="fade-up-in border-border bg-surface rounded-xl border p-6"
            style={{ '--reveal-i': i } as CSSVarStyle}
          >
            <p className="text-accent-text text-body font-medium">{item.pain}</p>
            <p className="text-body-s text-text-2 mt-2">{item.line}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
