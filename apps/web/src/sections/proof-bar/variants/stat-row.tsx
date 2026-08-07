import type { ProofBarProps } from '../proof-bar.types'
import { CounterRoll } from '@/components/motion/counter-roll'

/**
 * automate-spec.md §2. Three to four honest, verifiable stats — not
 * client counts. "Every number here must survive a client asking 'how
 * do you know?'" is a content rule, not a rendering one; enforced by
 * whoever edits the page data, not this component.
 */
export function StatRow({ eyebrow, stats = [] }: ProofBarProps) {
  return (
    <div className="max-w-page px-gutter mx-auto">
      {eyebrow ? (
        <p className="text-label text-text-3 mb-8 font-mono uppercase tracking-widest">{eyebrow}</p>
      ) : null}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <span className="text-h3 text-accent-text font-mono leading-none md:whitespace-nowrap">
              <CounterRoll value={stat.value} />
            </span>
            <span className="text-body-s text-text-2">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
