import type { ProofBarProps } from './proof-bar.types'
import { Marquee } from './variants/marquee'

/**
 * section-library.md §3 proofBar. Only 'marquee' is built — the
 * documented alternative is client capability, not client logos, until
 * Anvio has real client relationships to show (home-spec.md §2).
 */
export function ProofBar(props: ProofBarProps) {
  switch (props.variant) {
    case 'marquee':
      return <Marquee {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[ProofBar] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
