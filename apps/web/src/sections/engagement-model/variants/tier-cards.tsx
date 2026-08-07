import { cn } from '@/lib/utils/cn'
import type { EngagementModelProps, EngagementTier } from '../engagement-model.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * build-spec.md §9. Same EngagementTier shape as Home's phase-timeline,
 * genuinely different treatment: the middle tier is highlighted as the
 * common case, pricing-card style, rather than three uniform cards —
 * Build's three tiers are a real size progression (site -> ecommerce ->
 * custom application) in a way Home's automation/product/retainer
 * split isn't, so a "most common" emphasis reads as honest here.
 */
export function TierCards({
  eyebrow,
  heading,
  body,
  tiers,
  policyNotes,
  headingTag,
}: EngagementModelProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag
  const highlightIndex = Math.floor(tiers.length / 2)

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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-start">
        {tiers.map((tier, i) => (
          <TierCard key={tier.name} tier={tier} highlighted={i === highlightIndex} />
        ))}
      </div>

      <ul className="border-border mt-10 flex flex-col gap-2 border-t pt-8">
        {policyNotes.map((note) => (
          <li key={note} className="text-body-s text-text-2 flex gap-3">
            <span aria-hidden className="bg-accent-text mt-2.5 h-1 w-1 shrink-0 rounded-full" />
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TierCard({ tier, highlighted }: { tier: EngagementTier; highlighted: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl border p-7',
        highlighted
          ? 'border-accent-line bg-surface shadow-card-lg md:-translate-y-3'
          : 'border-border bg-surface shadow-card',
      )}
    >
      {highlighted ? (
        <span className="text-label text-accent-on bg-accent w-fit rounded-full px-3 py-1 font-mono uppercase tracking-widest">
          Most common
        </span>
      ) : null}
      <span className="text-label text-text-3 font-mono uppercase tracking-widest">
        {tier.audienceFit}
      </span>
      <h3 className="font-display text-h3 leading-tight tracking-tight">{tier.name}</h3>
      <span className="text-h4 text-accent-ink font-mono tabular-nums leading-tight">
        {tier.range}
      </span>
      <span className="text-label text-text-3 font-mono uppercase tracking-widest">
        {tier.timeline}
      </span>
      <ul className="border-border-soft mt-2 flex flex-col gap-1.5 border-t pt-4">
        {tier.includes.map((item) => (
          <li key={item} className="text-body-s text-text-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
