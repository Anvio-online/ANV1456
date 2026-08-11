import Link from 'next/link'
import type { BreadcrumbProps } from '../breadcrumb.types'

/**
 * content-layer.md §4. Visible trail only — BreadcrumbList JSON-LD is
 * a separate breadcrumbSchema() call on the page, so the two data
 * sources are the same `items` array passed twice rather than one
 * derived from the other reading the DOM. Tier 0: no motion, no
 * heading (heading-level.ts excludes this type from h1 resolution).
 */
export function Inline({ items }: BreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="max-w-page px-gutter mx-auto">
      <ol className="text-label text-text-3 flex flex-wrap items-center gap-2 font-mono uppercase tracking-widest">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden="true">/</span> : null}
              {isLast ? (
                <span aria-current="page" className="text-text-2">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-accent-text transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
