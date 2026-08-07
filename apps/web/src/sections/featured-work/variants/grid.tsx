import Link from 'next/link'
import type { FeaturedWorkProps, CaseStudyCard } from '../featured-work.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * build-spec.md §8. Not two-up-deep — Build has more shippable
 * examples and they're more visual, so more of them shown shallower is
 * the right trade: three columns, no problem/build prose, just what a
 * visitor scanning for "have they built something like mine" needs.
 */
export function Grid({
  heading,
  items,
  headingTag,
}: FeaturedWorkProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      {heading ? (
        <HeadingTagEl className="max-w-headline text-h2 mb-head-gap leading-none tracking-tight">
          {heading}
        </HeadingTagEl>
      ) : null}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((item) => (
          <CaseStudyCardEl key={item.client} item={item} />
        ))}
      </div>
    </div>
  )
}

function CaseStudyCardEl({ item }: { item: CaseStudyCard }) {
  return (
    <article className="border-border bg-surface shadow-card duration-fast ease-soft-ui hover:border-accent-line flex flex-col overflow-hidden rounded-xl border transition hover:-translate-y-0.5">
      <BrowserFrame />
      <div className="flex flex-col gap-2 p-6">
        <span className="text-label text-text-3 font-mono uppercase tracking-widest">
          {item.client} · {item.industry}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {item.stack.map((s) => (
            <span
              key={s}
              className="border-border text-label text-text-3 rounded-sm border px-2 py-1 font-mono"
            >
              {s}
            </span>
          ))}
        </div>
        {item.href ? (
          <Link
            href={item.href}
            className="text-body-s text-accent-text mt-1 font-medium hover:underline"
          >
            Read the case study →
          </Link>
        ) : null}
      </div>
    </article>
  )
}

function BrowserFrame() {
  return (
    <div className="from-surface-2 to-bg relative aspect-video bg-gradient-to-br p-3.5">
      <div className="mb-2.5 flex gap-1.5">
        <span className="bg-border h-1.5 w-1.5 rounded-full" />
        <span className="bg-border h-1.5 w-1.5 rounded-full" />
        <span className="bg-border h-1.5 w-1.5 rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-accent h-2 w-1/2 rounded-sm opacity-75" />
        <div className="bg-border h-2 w-5/6 rounded-sm" />
        <div className="bg-border h-2 w-2/3 rounded-sm" />
      </div>
    </div>
  )
}
