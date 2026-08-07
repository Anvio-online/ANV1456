import type { ContactProps } from './contact.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { SplitForm } from './variants/split-form'
import { Details } from './variants/details'

/**
 * section-library.md, contact-spec.md. 'split-form' is the page's
 * above-the-fold hero+form; 'details' is the plain email/hours/location
 * block further down.
 */
export function Contact(props: ContactProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'split-form':
      return <SplitForm {...props} />
    case 'details':
      return <Details {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Contact] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
