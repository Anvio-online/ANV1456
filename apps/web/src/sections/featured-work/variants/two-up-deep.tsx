import Link from 'next/link'
import type { FeaturedWorkProps, CaseStudyCard } from '../featured-work.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * home-spec.md §5. First light section on the page — this is where
 * the page changes register and slows down for substance. No real
 * screenshots exist yet, so cards use a stylized browser-frame
 * placeholder rather than a weak or invented screenshot, per the
 * spec's explicit guidance on presenting genuinely weak visuals.
 */
export function TwoUpDeep({
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
      <div className="flex flex-col gap-3 p-7">
        <span className="text-label text-text-3 font-mono uppercase tracking-widest">
          {item.client} · {item.region} · {item.industry}
        </span>
        <p className="text-body-s text-text-2">{item.problem}</p>
        <p className="text-body-s text-text-2">{item.build}</p>
        {item.outcome ? (
          <p className="text-metric text-accent-ink font-mono tabular-nums">{item.outcome}</p>
        ) : null}
        <div className="mt-1 flex flex-wrap gap-1.5">
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
            className="text-body-s text-accent-text mt-2 font-medium hover:underline"
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
        <div className="bg-border h-2 w-3/5 rounded-sm" />
      </div>
    </div>
  )
}
