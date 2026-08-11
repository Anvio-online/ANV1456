import type { WorkflowGraphProps } from './workflow-graph.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Live } from './variants/live'
import { Compact } from './variants/compact'

/**
 * section-library.md, automate-spec.md §5 / motion-system.md §7.2 —
 * Automate's Tier 1 signature scene. 'compact' is the reduced form
 * used on the two Automate leaves (service-leaf-spec.md §3a).
 */
export function WorkflowGraph(props: WorkflowGraphProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'live':
      return <Live {...props} />
    case 'compact':
      return <Compact {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[WorkflowGraph] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
