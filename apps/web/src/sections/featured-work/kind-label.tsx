import type { CaseStudyCard } from './featured-work.types'

/**
 * projects-spec.md §0. Renders the honesty label from `kind` rather
 * than from copy written per card, so attribution can't be quietly
 * dropped in a later edit. Undefined and 'client' both render nothing
 * — that's every card on Home today, unchanged.
 */
export function KindLabel({ kind }: { kind: CaseStudyCard['kind'] }) {
  if (kind === 'internal') {
    return (
      <span className="border-accent-line text-accent-text text-label w-fit rounded-sm border px-2 py-1 font-mono uppercase tracking-widest">
        Internal build
      </span>
    )
  }
  if (kind === 'partner-agency') {
    return <span className="text-label text-text-3">Delivered via partner agency</span>
  }
  return null
}
