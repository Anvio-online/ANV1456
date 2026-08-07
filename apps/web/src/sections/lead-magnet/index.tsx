import type { LeadMagnetProps } from './lead-magnet.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { RouteCards } from './variants/route-cards'

/**
 * section-library.md. 'route-cards' (contact-spec.md §2 — routes to
 * another page's own conversion device) is built. 'tool-card'
 * (grow-spec.md §7's free-audit form, a real lead-capture form rather
 * than a routing card) isn't built yet.
 */
export function LeadMagnet(props: LeadMagnetProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'route-cards':
      return <RouteCards {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[LeadMagnet] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
