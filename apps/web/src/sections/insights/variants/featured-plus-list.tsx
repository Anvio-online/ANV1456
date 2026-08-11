import Link from 'next/link'
import type { InsightsProps } from '../insights.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * guides-spec.md §Part 1. Editorial ordering, not chronological — the
 * first item in `items` is the deliberate featured pick, the rest
 * render as a plain list. section-library.md §3.
 */
export function FeaturedPlusList({
  eyebrow,
  heading,
  items,
  headingTag,
}: InsightsProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag
  const [featured, ...rest] = items

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

      {featured ? (
        <Link
          href={featured.href}
          className="border-border bg-surface duration-fast ease-soft-ui hover:border-accent-line hover:bg-surface-2 mb-8 flex flex-col gap-2 rounded-xl border p-8 transition"
        >
          <span className="text-label text-accent-text font-mono uppercase tracking-widest">
            {featured.category}
          </span>
          <span className="font-display text-h3 leading-tight tracking-tight">
            {featured.title}
          </span>
          <span className="text-body-s text-text-2">{featured.description}</span>
        </Link>
      ) : null}

      {rest.length > 0 ? (
        <ul className="border-border-soft divide-border-soft flex flex-col divide-y border-t">
          {rest.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:bg-surface-2 flex flex-col gap-1 py-5 transition-colors md:flex-row md:items-baseline md:justify-between"
              >
                <span className="text-body font-medium">{item.title}</span>
                <span className="text-label text-text-3 font-mono uppercase tracking-widest">
                  {item.category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
