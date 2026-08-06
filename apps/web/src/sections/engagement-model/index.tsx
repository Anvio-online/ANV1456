import type { EngagementModelProps } from './engagement-model.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { PhaseTimeline } from './variants/phase-timeline'

export function EngagementModel(props: EngagementModelProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'phase-timeline':
      return <PhaseTimeline {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[EngagementModel] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
