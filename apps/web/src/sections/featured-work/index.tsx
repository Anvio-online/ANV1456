import type { FeaturedWorkProps } from './featured-work.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { TwoUpDeep } from './variants/two-up-deep'

export function FeaturedWork(props: FeaturedWorkProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'two-up-deep':
      return <TwoUpDeep {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[FeaturedWork] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
