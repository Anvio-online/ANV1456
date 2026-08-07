import type { ResultsProps } from '../results.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * grow-spec.md §9. Answers "what do I actually get every month?" — a
 * definition list, not a chart. Deliberately no counterRoll: these are
 * definitions, not values, per motion-system.md §8's explicit note.
 */
export function MetricRow({
  eyebrow,
  heading,
  metrics,
  footnote,
  headingTag,
}: ResultsProps & { headingTag: HeadingTag }) {
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
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, i) => (
          <div
            key={metric.name}
            className="fade-up-in border-border bg-surface rounded-xl border p-6"
            style={{ '--reveal-i': i } as CSSVarStyle}
          >
            <span className="text-body font-medium">{metric.name}</span>
            <p className="text-body-s text-text-2 mt-1.5">{metric.definition}</p>
          </div>
        ))}
      </div>

      {footnote ? <p className="text-body-s text-text-2 mt-8">{footnote}</p> : null}
    </div>
  )
}
