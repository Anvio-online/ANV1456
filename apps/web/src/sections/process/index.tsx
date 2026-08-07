import type { ProcessProps } from './process.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { HorizontalPin } from './variants/horizontal-pin'
import { StickyStack } from './variants/sticky-stack'

/**
 * section-library.md §3 process — 'horizontal-pin' is reserved for
 * Home (ADR: keeps the signature scene unique; Automate uses
 * sticky-stack instead so both pages don't share the same Tier 1
 * treatment). 'vertical-list' as a standalone variant isn't built yet —
 * horizontal-pin already degrades to a plain stacked list internally
 * (see process-static-list.tsx), which covers its use case for now.
 */
export function Process(props: ProcessProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'horizontal-pin':
      return <HorizontalPin {...props} />
    case 'sticky-stack':
      return <StickyStack {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Process] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
