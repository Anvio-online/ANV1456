import type { ServicesProps } from './services.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { PillarCards } from './variants/pillar-cards'
import { ClusterGrid } from './variants/cluster-grid'

/**
 * section-library.md §3 services. 'pillar-cards' (Home) and
 * 'cluster-grid' (Automate — 9 services collapsed into 4 clusters, per
 * automate-spec.md §4) are built. 'list-detail' is documented but not
 * yet needed by a page.
 */
export function Services(props: ServicesProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'pillar-cards':
      return <PillarCards {...props} />
    case 'cluster-grid':
      return <ClusterGrid {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Services] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
