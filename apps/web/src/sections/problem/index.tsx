import type { ProblemProps } from './problem.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { BeforeAfter } from './variants/before-after'

/**
 * section-library.md, automate-spec.md §3. Only 'before-after' is
 * built — the one variant the spec calls for.
 */
export function Problem(props: ProblemProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'before-after':
      return <BeforeAfter {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Problem] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
