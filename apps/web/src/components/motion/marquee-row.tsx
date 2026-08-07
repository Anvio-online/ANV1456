const pillClass =
  'border-border bg-surface text-body-s text-text-2 whitespace-nowrap rounded-full border px-4 py-2 font-mono'

/**
 * motion-system.md §3 marqueeLoop — CSS-only (`@keyframes` + `translate3d`,
 * no JS/rAF). Shared by proof-bar's single-row marquee and integrations'
 * dual-row opposing one, so it's implemented once here rather than
 * re-authored per section.
 *
 * Items are duplicated in the DOM so the scroll loop is seamless, but the
 * copy sits inside a `display: contents` wrapper (`.marquee-loop-copy`) —
 * a no-op for the flex layout the animation depends on — so reduced
 * motion's "wraps to a flex-wrap grid" rule (motion-system.md §5) can
 * hide that copy outright instead of the static view showing every item
 * twice.
 */
export function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-row">
      <div className={reverse ? 'marquee-track reverse' : 'marquee-track'}>
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className={pillClass}>
            {item}
          </span>
        ))}
        <div className="marquee-loop-copy" aria-hidden="true">
          {items.map((item, i) => (
            <span key={`loop-${item}-${i}`} className={pillClass}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
