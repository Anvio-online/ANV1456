import type { TableOfContentsProps } from './table-of-contents.types'
import { Inline } from './variants/inline'

/** content-layer.md §4. Only 'inline' is built. */
export function TableOfContents(props: TableOfContentsProps) {
  switch (props.variant) {
    case 'inline':
      return <Inline {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[TableOfContents] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
