import type { AuthorBioProps } from './author-bio.types'
import { Compact } from './variants/compact'

/** content-layer.md §4. Only 'compact' is built. */
export function AuthorBio(props: AuthorBioProps) {
  switch (props.variant) {
    case 'compact':
      return <Compact {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[AuthorBio] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
