import type { ResultsProps } from './results.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { MetricRow } from './variants/metric-row'

/**
 * section-library.md, grow-spec.md §9. Only 'metric-row' is built.
 */
export function Results(props: ResultsProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'metric-row':
      return <MetricRow {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Results] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
