import Link from 'next/link'
import type { RelatedLinksProps } from '../related-links.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * content-layer.md §4. seo-strategy.md §5's hub-and-spoke pattern made
 * concrete: every leaf/guide/industry/case-study carries this, 3–5
 * curated links, descriptive anchors never "learn more".
 */
export function CardGrid({
  eyebrow,
  heading,
  items,
  headingTag,
}: RelatedLinksProps & { headingTag: HeadingTag }) {
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-border bg-surface duration-fast ease-soft-ui hover:border-accent-line hover:bg-surface-2 fade-up-in flex flex-col gap-1.5 rounded-lg border p-5 transition hover:-translate-y-0.5"
            style={{ '--reveal-i': i } as CSSVarStyle}
          >
            <span className="text-body font-medium">{item.label}</span>
            <span className="text-body-s text-text-2">{item.note}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
