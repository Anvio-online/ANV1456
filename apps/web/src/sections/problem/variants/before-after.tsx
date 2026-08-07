import type { ProblemProps } from '../problem.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { BeforeAfterTable } from './before-after-table'

/**
 * automate-spec.md §3. Real <table> semantics — seo-strategy.md's GEO
 * guidance: this is exactly the shape LLM surfaces cite for "what can
 * AI automation do for my business."
 */
export function BeforeAfter({
  eyebrow,
  heading,
  body,
  rows,
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

      <BeforeAfterTable rows={rows} />
    </div>
  )
}
