import type { ServicesProps } from './services.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { PillarCards } from './variants/pillar-cards'

/**
 * section-library.md §3 services. 'cluster-grid' and 'list-detail' are
 * documented (the former is what Automate needs — 9 services collapsed
 * into 4 clusters, per automate-spec.md) but not built in this pass.
 */
export function Services(props: ServicesProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'pillar-cards':
      return <PillarCards {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Services] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
