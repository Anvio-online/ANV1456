import type { GrowthChartState } from './growth-chart.types'

/**
 * The one honest fallback — same role as the other Tier 1 scenes'
 * static lists. motion-system.md §7.4: "static, all six states as a
 * stacked vertical list (month · what shipped · the numbers), all
 * content visible."
 */
export function GrowthChartStaticList({
  states,
  disclaimer,
}: {
  states: GrowthChartState[]
  disclaimer: string
}) {
  return (
    <div className="max-w-content px-gutter mx-auto flex flex-col gap-4">
      {states.map((state) => (
        <article
          key={state.month}
          className="border-accent-line bg-surface flex flex-col gap-2 rounded-xl border p-6"
        >
          <span className="text-label text-accent-text font-mono uppercase tracking-widest">
            {state.month} · {state.label}
          </span>
          <p className="text-body-s text-text-2">{state.caption}</p>
          <div className="mt-2 flex flex-wrap gap-5">
            {state.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-0.5">
                <span className="text-h4 text-accent-text font-mono tabular-nums">
                  {metric.value}
                </span>
                <span className="text-label text-text-3 font-mono uppercase tracking-widest">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </article>
      ))}
      <p className="text-body-s text-text-2">{disclaimer}</p>
    </div>
  )
}
