import type { RichTextProps } from '../rich-text.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * about-spec.md §2 "Why Anvio exists" / §7 "Where we work". Single
 * column, --measure width, no cards — the visual restraint is the
 * point on a page arguing for substance over decoration.
 */
export function Prose({
  eyebrow,
  heading,
  paragraphs = [],
  headingTag,
}: RichTextProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="max-w-measure mx-auto flex flex-col gap-6">
        {eyebrow ? (
          <span className="text-label text-accent-text font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <HeadingTagEl className="text-h2 leading-none tracking-tight">{heading}</HeadingTagEl>
        ) : null}
        {paragraphs.map((paragraph, i) => (
          <p
            key={paragraph}
            className="fade-up-in text-body-l text-text-2"
            style={{ '--reveal-i': i } as CSSVarStyle}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
