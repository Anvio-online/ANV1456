import type { HeroProps } from './hero.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { CenteredStatement } from './variants/centered-statement'
import { SplitVisual } from './variants/split-visual'

/**
 * Reference implementation of the section-folder pattern — see
 * docs/system/section-library.md §1. index.tsx does the variant
 * switch and nothing else; the actual markup lives in variants/.
 *
 * 'centered-statement' (Home) and 'split-visual' (Automate) are built.
 * page-lead and case-lead are documented in section-library.md §3 but
 * not yet scaffolded — add them the same way when a page needs one.
 */
export function Hero(props: HeroProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'centered-statement':
      return <CenteredStatement {...props} />
    case 'split-visual':
      return <SplitVisual {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Hero] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
