import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils/cn'

const widths = {
  content: 'max-w-content',
  container: 'max-w-page',
  bleed: 'max-w-none',
} as const

export function Container({
  width = 'content',
  className,
  children,
}: PropsWithChildren<{ width?: keyof typeof widths; className?: string }>) {
  return <div className={cn('px-gutter mx-auto', widths[width], className)}>{children}</div>
}
