import type { WhyUsProps } from './why-us.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { ContrastTable } from './variants/contrast-table'
import { PrincipleCards } from './variants/principle-cards'
import { NumberedList } from './variants/numbered-list'

/**
 * section-library.md §3 whyUs. 'contrast-table' (Home, Automate),
 * 'principle-cards' (About §3), and 'numbered-list' (About §5) are
 * built. home-spec.md §8 also specs a closing founder-note block — see
 * sections/team/ instead (About §4 uses it; Home's copy of it is a
 * separate open item, not this section type).
 */
export function WhyUs(props: WhyUsProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'contrast-table':
      return <ContrastTable {...props} />
    case 'principle-cards':
      return <PrincipleCards {...props} />
    case 'numbered-list':
      return <NumberedList {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[WhyUs] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
