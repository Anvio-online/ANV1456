import type { FaqProps } from './faq.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { FaqAccordion } from './variants/accordion'

/**
 * section-library.md, automate-spec.md §11. Only 'accordion' is built.
 */
export function Faq(props: FaqProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'accordion':
      return <FaqAccordion {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Faq] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
