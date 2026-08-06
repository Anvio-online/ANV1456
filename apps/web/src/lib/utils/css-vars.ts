import type { CSSProperties } from 'react'

/**
 * React's style prop type doesn't allow custom properties by default.
 * This is the one legitimate place for a typed escape hatch — used for
 * genuinely per-instance dynamic values like animation stagger index,
 * never as a substitute for a design token. See conventions.md §3.
 */
export type CSSVarStyle = CSSProperties & Record<`--${string}`, string | number>
