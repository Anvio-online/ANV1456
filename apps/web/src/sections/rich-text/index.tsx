import type { RichTextProps } from './rich-text.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Prose } from './variants/prose'
import { NumberedSteps } from './variants/numbered-steps'
import { Mdx } from './variants/mdx'

/**
 * section-library.md. The plainest section type on the site — no
 * cards, no motion beyond fadeUp. about-spec.md §2/§7 use 'prose';
 * contact-spec.md §4 uses 'numbered-steps'; every leaf/guide/industry
 * body (ADR-0006) uses 'mdx'.
 */
export function RichText(props: RichTextProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'prose':
      return <Prose {...props} />
    case 'numbered-steps':
      return <NumberedSteps {...props} />
    case 'mdx':
      return <Mdx {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[RichText] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
