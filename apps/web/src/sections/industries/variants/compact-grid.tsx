import Link from 'next/link'
import type { IndustriesProps } from '../industries.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * home-spec.md §9. Tier 4 motion only — hoverLift, this is a
 * navigational aid, not a performance. Four of six tiles still render
 * without a link or hover affordance — industries-spec.md ships two
 * real industry pages, not six, and a tile without a page stays
 * unlinked rather than 404ing, per "never link to an unbuilt page."
 */
export function CompactGrid({
  eyebrow,
  heading,
  items,
  headingTag,
}: IndustriesProps & { headingTag: HeadingTag }) {
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const cardClass = 'border-border bg-surface flex flex-col gap-1.5 rounded-lg border p-5'
          const content = (
            <>
              <span className="font-display text-h4">{item.name}</span>
              <span className="text-body-s text-text-2">{item.line}</span>
            </>
          )

          return item.href ? (
            <Link
              key={item.name}
              href={item.href}
              className={`${cardClass} duration-fast ease-soft-ui hover:border-accent-line transition hover:-translate-y-0.5`}
            >
              {content}
            </Link>
          ) : (
            <div key={item.name} className={cardClass}>
              {content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
