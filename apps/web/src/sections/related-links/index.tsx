import type { RelatedLinksProps } from './related-links.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { CardGrid } from './variants/card-grid'

/**
 * content-layer.md §4. Only 'card-grid' is built — every spec that
 * uses this type (service-leaf-spec.md §8, industries-spec.md §8,
 * guides-spec.md §6, case-studies-spec.md §6) uses that variant.
 * 'inline-list' stays documented, not built, same as `testimonial`.
 */
export function RelatedLinks(props: RelatedLinksProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'card-grid':
      return <CardGrid {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[RelatedLinks] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
