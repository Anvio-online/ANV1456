import type { ProcessProps } from './process.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { HorizontalPin } from './variants/horizontal-pin'
import { StickyStack } from './variants/sticky-stack'
import { VerticalList } from './variants/vertical-list'

/**
 * section-library.md §3 process — 'horizontal-pin' is reserved for
 * Home (ADR: keeps the signature scene unique; Automate/Build/Grow use
 * sticky-stack instead so no other page shares Home's Tier 1
 * treatment). 'vertical-list' (About §6) is the compressed, one-line-
 * per-stage version — deliberately not sticky-stack either, so About
 * doesn't share a signature-adjacent scroll piece with the sales pages.
 */
export function Process(props: ProcessProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'horizontal-pin':
      return <HorizontalPin {...props} />
    case 'sticky-stack':
      return <StickyStack {...props} />
    case 'vertical-list':
      return <VerticalList {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Process] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
