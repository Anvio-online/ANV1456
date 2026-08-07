import type { ProofBarProps } from '../proof-bar.types'
import { MarqueeRow } from '@/components/motion/marquee-row'

/**
 * home-spec.md §2. Dual-row, opposing-direction marquee of tools we
 * integrate with — deliberately not client logos, see the section
 * docstring in index.tsx.
 */
export function Marquee({ eyebrow, rows = [] }: ProofBarProps) {
  return (
    <div className="max-w-page px-gutter mx-auto">
      {eyebrow ? (
        <p className="text-label text-text-3 mb-6 font-mono uppercase tracking-widest">{eyebrow}</p>
      ) : null}
      <div className="flex flex-col gap-3">
        {rows.map((row, rowIndex) => (
          <MarqueeRow key={rowIndex} items={row.items} reverse={rowIndex % 2 === 1} />
        ))}
      </div>
    </div>
  )
}
