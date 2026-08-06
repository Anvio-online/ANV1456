import type { ProofBarProps } from '../proof-bar.types'

/**
 * home-spec.md §2. Dual-row, opposing-direction marquee of tools we
 * integrate with — deliberately not client logos, see the section
 * docstring in index.tsx. CSS-only per motion-system.md §3 marqueeLoop.
 *
 * Known simplification: each row's items are duplicated in the DOM for
 * a seamless loop. Under reduced-motion the track wraps instead of
 * scrolling, so the duplicate copy renders as a second, visible list —
 * acceptable for a proof bar, but worth fixing with a client-side
 * matchMedia check if this pattern gets reused somewhere more visible.
 */
export function Marquee({ eyebrow, rows }: ProofBarProps) {
  return (
    <div className="max-w-page px-gutter mx-auto">
      {eyebrow ? (
        <p className="text-label text-text-3 mb-6 font-mono uppercase tracking-widest">{eyebrow}</p>
      ) : null}
      <div className="flex flex-col gap-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="marquee-row">
            <div className={rowIndex % 2 === 1 ? 'marquee-track reverse' : 'marquee-track'}>
              {[...row.items, ...row.items].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="border-border bg-surface text-body-s text-text-2 whitespace-nowrap rounded-full border px-4 py-2 font-mono"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
