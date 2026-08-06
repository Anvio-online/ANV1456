import type { ProcessStage } from './process.types'

/**
 * The one honest fallback, used in three places — never three separate
 * implementations: (1) what the server renders and what's visible
 * before hydration, (2) the permanent view on mobile/tablet and under
 * reduced motion, (3) the placeholder while the pinned scene's JS is
 * still loading. motion-system.md §7.1 requires all five stages in the
 * DOM at all times regardless of visual state — this component is real
 * server-rendered content, not a loading spinner standing in for it.
 */
export function ProcessStaticList({ stages }: { stages: ProcessStage[] }) {
  return (
    <div className="max-w-content px-gutter mx-auto flex flex-col gap-4">
      {stages.map((stage) => (
        <article
          key={stage.number}
          className="border-border bg-surface shadow-card flex flex-col gap-3 rounded-xl border p-7 sm:flex-row sm:gap-7"
        >
          <span className="text-display-l text-accent-text font-mono tabular-nums sm:w-24 sm:shrink-0">
            {stage.number}
          </span>
          <div className="flex flex-1 flex-col gap-3">
            <h3 className="font-display text-h3 leading-tight tracking-tight">{stage.title}</h3>
            <p className="text-body-s text-text-2">{stage.promise}</p>
            <ul className="flex flex-col gap-1.5">
              {stage.deliverables.map((d) => (
                <li key={d} className="text-label text-text-3 flex gap-2 font-mono">
                  <span aria-hidden className="text-accent-text">
                    →
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <span className="text-label text-text-3 font-mono uppercase tracking-widest">
              {stage.duration}
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}
