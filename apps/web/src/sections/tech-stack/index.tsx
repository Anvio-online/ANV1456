import type { TechStackProps } from './tech-stack.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Categorized } from './variants/categorized'

/**
 * section-library.md, build-spec.md §7. This is the section
 * automate-spec.md deferred "off Automate" ("buyers there care about
 * their tools, not ours") — the reasoning inverts for Build, where a
 * buyer commissioning custom software genuinely is evaluating the
 * stack they'll inherit. Only 'categorized' is built.
 */
export function TechStack(props: TechStackProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'categorized':
      return <Categorized {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[TechStack] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
