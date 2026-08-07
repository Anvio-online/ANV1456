import type { BuildAssemblyPass } from './build-assembly.types'

/**
 * The one honest fallback — same role as process-static-list.tsx and
 * workflow-graph-static-list.tsx: what's visible before the live
 * scene's JS hydrates, and the permanent view on mobile and under
 * reduced motion. motion-system.md §7.3: "static, all four passes as
 * a stacked vertical list of labelled frames, all content visible."
 */
export function BuildAssemblyStaticList({ passes }: { passes: BuildAssemblyPass[] }) {
  return (
    <div className="max-w-content px-gutter mx-auto flex flex-col gap-4">
      {passes.map((pass) => (
        <article
          key={pass.label}
          className="border-accent-line bg-surface flex flex-col gap-2 rounded-xl border p-6"
        >
          <span className="text-label text-accent-text font-mono uppercase tracking-widest">
            {pass.caption}
          </span>
          <h3 className="font-display text-h4 leading-tight tracking-tight">{pass.label}</h3>
          <p className="text-body-s text-text-2">{pass.explainer}</p>
        </article>
      ))}
    </div>
  )
}
