import type { ProcessProps } from './process.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { HorizontalPin } from './variants/horizontal-pin'

/**
 * section-library.md §3 process — 'horizontal-pin' is reserved for
 * Home (ADR: keeps the signature scene unique; Automate uses
 * sticky-stack instead so both pages don't share the same Tier 1
 * treatment). 'sticky-stack' and 'vertical-list' as standalone
 * variants aren't built yet — horizontal-pin already degrades to a
 * plain stacked list internally (see process-static-list.tsx), which
 * covers vertical-list's use case for now.
 */
export function Process(props: ProcessProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'horizontal-pin':
      return <HorizontalPin {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Process] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
