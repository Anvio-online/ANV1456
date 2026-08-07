import type { TeamProps } from './team.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { FounderNote } from './variants/founder-note'

/**
 * section-library.md §3 team. 'founder-note' (About §4) is built;
 * 'grid' (multiple team members) has no real use case yet — Anvio is
 * one or two people, and about-spec.md §4 explicitly says not to fake
 * a team grid ("Not 'our team' if it's one or two people").
 */
export function Team(props: TeamProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'founder-note':
      return <FounderNote {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Team] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
