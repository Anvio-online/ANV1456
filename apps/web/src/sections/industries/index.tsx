import type { IndustriesProps } from './industries.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { CompactGrid } from './variants/compact-grid'

export function Industries(props: IndustriesProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'compact-grid':
      return <CompactGrid {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Industries] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
