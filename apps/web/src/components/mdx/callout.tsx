import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * content-layer.md §2 whitelist. An aside inside an MDX body — the
 * only styling an author gets beyond plain prose, deliberately narrow.
 */
export function Callout({
  type = 'note',
  children,
}: {
  type?: 'note' | 'warning'
  children: ReactNode
}) {
  return (
    <div
      role={type === 'warning' ? 'alert' : undefined}
      className={cn(
        'text-body-s my-6 rounded-md border-l-2 px-5 py-4',
        type === 'warning'
          ? 'border-warning bg-warning/10 text-text'
          : 'border-accent-line bg-surface text-text-2',
      )}
    >
      {children}
    </div>
  )
}
