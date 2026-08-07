import type { BuildAssemblyProps } from './build-assembly.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { WireframeToRender } from './variants/wireframe-to-render'

/**
 * section-library.md, build-spec.md §5 / motion-system.md §7.3 —
 * Build's Tier 1 signature scene. Only 'wireframe-to-render' is built.
 */
export function BuildAssembly(props: BuildAssemblyProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'wireframe-to-render':
      return <WireframeToRender {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[BuildAssembly] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
