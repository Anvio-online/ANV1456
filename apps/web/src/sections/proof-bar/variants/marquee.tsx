import type { ProofBarProps } from '../proof-bar.types'

const pillClass =
  'border-border bg-surface text-body-s text-text-2 whitespace-nowrap rounded-full border px-4 py-2 font-mono'

/**
 * home-spec.md §2. Dual-row, opposing-direction marquee of tools we
 * integrate with — deliberately not client logos, see the section
 * docstring in index.tsx. CSS-only per motion-system.md §3 marqueeLoop.
 *
 * Each row's items are duplicated in the DOM so the scroll loop is
 * seamless, but that copy sits inside a `display: contents` wrapper
 * (`.marquee-loop-copy`) so it's a no-op for the flex layout the
 * animation depends on, while motion-system.md §5's reduced-motion rule
 * — "wraps to a flex-wrap grid" — can hide it outright instead of the
 * static view rendering each item twice.
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
              {row.items.map((item, i) => (
                <span key={`${item}-${i}`} className={pillClass}>
                  {item}
                </span>
              ))}
              <div className="marquee-loop-copy" aria-hidden="true">
                {row.items.map((item, i) => (
                  <span key={`loop-${item}-${i}`} className={pillClass}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
