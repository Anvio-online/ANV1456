import type { IntegrationsProps } from './integrations.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { MarqueeDual } from './variants/marquee-dual'

/**
 * section-library.md, automate-spec.md §7. Only 'marquee-dual' is
 * built — the one variant the spec calls for.
 */
export function Integrations(props: IntegrationsProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'marquee-dual':
      return <MarqueeDual {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Integrations] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
