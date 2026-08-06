import type { CtaClosingProps } from './cta-closing.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { SplitWithForm } from './variants/split-with-form'

export function CtaClosing(props: CtaClosingProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'split-with-form':
      return <SplitWithForm {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[CtaClosing] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
