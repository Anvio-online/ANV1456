import type { PropsWithChildren } from 'react'
import type { Theme } from '@/lib/sections/types'

/**
 * Applies the theme boundary and --section-y. conventions.md §3:
 * sections themselves must never set vertical margin — this is the
 * only place that does, which is what makes reordering pages safe.
 */
export function Section({
  id,
  theme,
  compact = false,
  className,
  children,
}: PropsWithChildren<{ id: string; theme: Theme; compact?: boolean; className?: string }>) {
  return (
    <section
      id={id}
      data-theme={theme}
      className={
        (compact ? 'py-section-y-compact' : 'py-section-y') +
        ' bg-bg text-text relative' +
        (className ? ` ${className}` : '')
      }
      style={{
        transitionProperty: 'background-color, color',
        transitionDuration: 'var(--dur-scene)',
        transitionTimingFunction: 'var(--ease-in-out)',
      }}
    >
      {children}
    </section>
  )
}
