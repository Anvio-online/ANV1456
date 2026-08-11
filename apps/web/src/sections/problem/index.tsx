import type { ProblemProps } from './problem.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { BeforeAfter } from './variants/before-after'
import { PainGrid } from './variants/pain-grid'
import { CostCalculator } from './variants/cost-calculator'
import { AutomationCalculator } from './variants/automation-calculator'

/**
 * section-library.md. 'before-after' (Automate §3), 'pain-grid'
 * (Build §3), 'cost-calculator' (Grow §3), and 'automation-calculator'
 * (tools-spec.md §3) are built — the last two are interactive but
 * answer different questions (traffic-conversion cost vs. manual-work
 * cost), same section family per ADR-0003's variant-first rule.
 */
export function Problem(props: ProblemProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'before-after':
      return <BeforeAfter {...props} />
    case 'pain-grid':
      return <PainGrid {...props} />
    case 'cost-calculator':
      return <CostCalculator {...props} />
    case 'automation-calculator':
      return <AutomationCalculator {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Problem] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
