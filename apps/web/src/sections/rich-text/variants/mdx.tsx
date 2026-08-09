import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import type { RichTextProps } from '../rich-text.types'
import { mdxComponents } from '@/components/mdx'

/**
 * ADR-0006 — the only section permitted to render a content entry's
 * body. `MDXRemote` from 'next-mdx-remote/rsc' is an async Server
 * Component: it compiles `body` (raw MDX source) and renders it on the
 * server, on every request, so the output is real server-rendered
 * HTML — not the client-eval'd bundle @content-collections/mdx's own
 * MDXContent would have produced (content-collections.ts's docstring,
 * this repo's non-negotiable "all copy is real DOM, server-rendered").
 *
 * remark-gfm gets every body — GitHub-flavored tables, strikethrough,
 * task lists — real semantics for markdown authors who never touch
 * the <Comparison> component (content-layer.md §2).
 */
export async function Mdx({ body }: RichTextProps) {
  if (!body) return null

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="max-w-measure mx-auto">
        <MDXRemote
          source={body}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </div>
  )
}
