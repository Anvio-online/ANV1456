import type { ProblemProps } from './problem.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { BeforeAfter } from './variants/before-after'
import { PainGrid } from './variants/pain-grid'
import { CostCalculator } from './variants/cost-calculator'

/**
 * section-library.md. 'before-after' (Automate §3), 'pain-grid'
 * (Build §3), and 'cost-calculator' (Grow §3, interactive) are built.
 */
export function Problem(props: ProblemProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'before-after':
      return <BeforeAfter {...props} />
    case 'pain-grid':
      return <PainGrid {...props} />
    case 'cost-calculator':
      return <CostCalculator {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Problem] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
