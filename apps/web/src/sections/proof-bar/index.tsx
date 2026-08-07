import type { ProofBarProps } from './proof-bar.types'
import { Marquee } from './variants/marquee'
import { StatRow } from './variants/stat-row'

/**
 * section-library.md §3 proofBar. 'marquee' (tool logos — home-spec.md
 * §2, deliberately not client logos) and 'stat-row' (verifiable numbers
 * — automate-spec.md §2) are built. 'statement' is documented but not
 * yet needed by a page.
 */
export function ProofBar(props: ProofBarProps) {
  switch (props.variant) {
    case 'marquee':
      return <Marquee {...props} />
    case 'stat-row':
      return <StatRow {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[ProofBar] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
