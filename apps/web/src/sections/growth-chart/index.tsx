import type { GrowthChartProps } from './growth-chart.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { DashboardEvolve } from './variants/dashboard-evolve'

/**
 * section-library.md, grow-spec.md §5 / motion-system.md §7.4 — Grow's
 * Tier 1 signature scene. Only 'dashboard-evolve' is built.
 */
export function GrowthChart(props: GrowthChartProps & { headingTag: HeadingTag }) {
  switch (props.variant) {
    case 'dashboard-evolve':
      return <DashboardEvolve {...props} />
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[GrowthChart] variant "${props.variant}" is not yet implemented.`)
      }
      return null
  }
}
