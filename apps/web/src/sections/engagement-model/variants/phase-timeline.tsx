import type { EngagementModelProps, EngagementTier } from '../engagement-model.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * home-spec.md §7 — "the highest-leverage trust section on the page,
 * and almost no competitor has one." Ranges are a first published
 * pricing model, not fabricated numbers about a third party — the
 * spec's constraint against invented claims applies to facts about
 * others, not to Anvio's own forward-looking pricing, which is a
 * business decision adjustable anytime.
 */
export function PhaseTimeline({
  eyebrow,
  heading,
  body,
  tiers,
  policyNotes,
  headingTag,
}: EngagementModelProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="mb-12 flex flex-col gap-4">
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
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

function TierCard({ tier }: { tier: EngagementTier }) {
  return (
    <div className="border-border bg-surface shadow-card flex flex-col gap-4 rounded-xl border p-7">
      <span className="text-label text-text-3 font-mono uppercase tracking-widest">
        {tier.audienceFit}
      </span>
      <h3 className="font-display text-h3 leading-tight tracking-tight">{tier.name}</h3>
      <span className="text-metric text-accent-ink font-mono tabular-nums">{tier.range}</span>
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
