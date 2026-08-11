import type { InsightsProps } from './insights.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { FeaturedPlusList } from './variants/featured-plus-list'

/** section-library.md §3. Only 'featured-plus-list' is built — Home
 * §10's 'three-latest' stays a placeholder until it's needed. */
export function Insights(props: InsightsProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'featured-plus-list':
      return <FeaturedPlusList {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Insights] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
