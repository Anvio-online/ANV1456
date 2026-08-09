import Link from 'next/link'
import type { TableOfContentsProps } from '../table-of-contents.types'

/**
 * guides-spec.md §3 — the 'inline' option, chosen over a sticky rail
 * for the structural reason in its own docstring (lib/sections/types.ts
 * TableOfContentsProps). A native <details>/<summary> disclosure needs
 * no client JS at all — the whole section is server-rendered, real
 * anchor links to the ids rehype-slug assigns in richText:mdx.
 */
export function Inline({ items }: TableOfContentsProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="max-w-page px-gutter mx-auto">
      <details open className="border-border-soft max-w-measure mx-auto rounded-lg border">
        <summary className="text-label text-text-3 cursor-pointer select-none px-5 py-4 font-mono uppercase tracking-widest">
          Contents
        </summary>
        <ol className="flex flex-col gap-2 px-5 pb-5">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? 'pl-4' : undefined}>
              <Link href={`#${item.id}`} className="text-body-s text-text-2 hover:text-accent-text">
                {item.text}
              </Link>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  )
}
