import type { WhyUsProps } from '../why-us.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * about-spec.md §3. A statement of method, not a competitor
 * comparison — different shape from contrast-table's typical/Anvio
 * pairs, so a new variant rather than forcing the same rows shape.
 */
export function PrincipleCards({
  eyebrow,
  heading,
  items = [],
  headingTag,
}: WhyUsProps & { headingTag: HeadingTag }) {
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="border-border bg-surface flex flex-col gap-3 rounded-xl border p-7"
          >
            <h3 className="font-display text-h4 leading-tight tracking-tight">{item.title}</h3>
            <p className="text-body-s text-text-2">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
