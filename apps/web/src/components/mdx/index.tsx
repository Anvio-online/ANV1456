import type { ComponentProps } from 'react'
import Link from 'next/link'
import { Callout } from './callout'
import { Figure } from './figure'
import { Comparison } from './comparison'

export { Callout, Figure, Comparison }

/**
 * content-layer.md §2. Passed to MDXRemote as `components` — maps
 * both the plain HTML tags a compiled MDX body produces (real
 * markdown, `##`/`###` and up per ADR-0006) and the three whitelisted
 * custom components. `##` is the body's top level: the section's own
 * `heading`/`eyebrow` go unused for the 'mdx' variant — the hero above
 * it already carries the page's one <h1>, and the body supplies real
 * <h2>/<h3> from here down.
 *
 * Typed structurally against MDXRemoteProps['components'] rather than
 * importing `mdx/types`' `MDXComponents` — `@types/mdx` sits inside
 * @mdx-js/mdx's own isolated pnpm dependency tree, not resolvable from
 * this package directly under pnpm's strict linking. A plain inferred
 * object, typed per-tag against React's own ComponentProps, is exactly
 * as sound and needs no cross-package type resolution.
 */
export const mdxComponents = {
  h2: ({ children, ...props }: ComponentProps<'h2'>) => (
    <h2 className="text-h3 mb-4 mt-12 leading-tight tracking-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<'h3'>) => (
    <h3 className="text-h4 mb-3 mt-8 leading-tight tracking-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps<'h4'>) => (
    <h4 className="text-body-l mb-2 mt-6 font-medium" {...props}>
      {children}
    </h4>
  ),
  p: (props: ComponentProps<'p'>) => <p className="text-body-l text-text-2 my-4" {...props} />,
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="text-body-l text-text-2 my-4 list-disc pl-6" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="text-body-l text-text-2 my-4 list-decimal pl-6" {...props} />
  ),
  li: (props: ComponentProps<'li'>) => <li className="my-1.5" {...props} />,
  a: ({ href, children, ...props }: ComponentProps<'a'>) =>
    href ? (
      <Link
        href={href}
        className="text-accent-text font-medium underline underline-offset-2"
        {...props}
      >
        {children}
      </Link>
    ) : (
      // MDX can emit an <a> with no href for a footnote back-ref; render it plain rather than drop it.
      <a {...props}>{children}</a>
    ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="text-text font-semibold" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code className="bg-surface-2 text-code rounded-sm px-1.5 py-0.5 font-mono" {...props} />
  ),
  pre: (props: ComponentProps<'pre'>) => (
    <pre
      className="bg-surface-2 border-border-soft text-code my-6 overflow-x-auto rounded-md border p-4 font-mono"
      {...props}
    />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="border-border text-text-2 my-6 border-l-2 pl-5 italic" {...props} />
  ),
  table: (props: ComponentProps<'table'>) => (
    <div className="my-8 overflow-x-auto">
      <table className="text-body-s w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th
      className="border-border-soft text-label text-text-3 border-b pb-3 text-left font-mono uppercase tracking-widest"
      {...props}
    />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className="border-border-soft text-text-2 border-b py-3" {...props} />
  ),
  hr: (props: ComponentProps<'hr'>) => <hr className="border-border-soft my-10" {...props} />,
  Callout,
  Figure,
  Comparison,
}
