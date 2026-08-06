import type { WhyUsProps } from './why-us.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { ContrastTable } from './variants/contrast-table'

/**
 * section-library.md §3 whyUs. home-spec.md §8 also specs a closing
 * founder-note block (real photo, real name) — deliberately not built
 * yet; it needs real assets, and a placeholder founder note is exactly
 * the kind of fabrication home-spec.md's strategic constraint rules
 * out. Add it as a second element in the contrast-table variant, or a
 * dedicated team:founder-note section, once the photo and copy exist.
 */
export function WhyUs(props: WhyUsProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'contrast-table':
      return <ContrastTable {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[WhyUs] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
