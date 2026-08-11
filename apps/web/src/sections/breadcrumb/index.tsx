import type { BreadcrumbProps } from './breadcrumb.types'
import { Inline } from './variants/inline'

/**
 * content-layer.md §4. The first Phase 2 utility section — 'inline' is
 * the only variant. No headingTag prop: breadcrumb never carries a
 * heading, and heading-level.ts excludes it from h1 resolution so the
 * hero right after it still gets the page's one real <h1>.
 */
export function Breadcrumb(props: BreadcrumbProps) {
  switch (props.variant) {
    case 'inline':
      return <Inline {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Breadcrumb] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
