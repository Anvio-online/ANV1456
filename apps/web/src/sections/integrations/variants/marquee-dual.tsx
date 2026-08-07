import type { IntegrationsProps } from '../integrations.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { MarqueeRow } from '@/components/motion/marquee-row'

/**
 * automate-spec.md §7. "Will this work with what we already have?" —
 * a real buying objection, cheaply resolved. Groups are a content
 * organization tool (§7's category list), not a visual one — the
 * marquee itself doesn't render category labels, so groups alternate
 * into the two opposing rows rather than each getting its own row.
 */
export function MarqueeDual({
  eyebrow,
  heading,
  groups,
  footnote,
  headingTag,
}: IntegrationsProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag
  const rowA = groups.filter((_, i) => i % 2 === 0).flatMap((g) => g.items)
  const rowB = groups.filter((_, i) => i % 2 === 1).flatMap((g) => g.items)

  return (
    <div className="max-w-page px-gutter mx-auto">
      {eyebrow || heading ? (
        <div className="mb-8 flex flex-col gap-4">
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
      ) : null}

      <div className="flex flex-col gap-3">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>

      {footnote ? <p className="text-body-s text-text-2 mt-8 text-center">{footnote}</p> : null}
    </div>
  )
}
