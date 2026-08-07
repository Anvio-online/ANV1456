import type { WhyUsProps } from '../why-us.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * about-spec.md §5 "What we won't do" — the most credible section on
 * the page. Numbered mono markers, no cards: a plain list reads as a
 * statement, not a pitch.
 */
export function NumberedList({
  eyebrow,
  heading,
  body,
  items = [],
  headingTag,
}: WhyUsProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="mb-head-gap flex flex-col gap-4">
        {eyebrow ? (
          <span className="text-label text-accent-text font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <HeadingTagEl className="max-w-headline text-h2 leading-none tracking-tight">
            {heading}
          </HeadingTagEl>
        ) : null}
        {body ? <p className="max-w-measure text-body-l text-text-2">{body}</p> : null}
      </div>

      <ol className="border-border-soft divide-border-soft flex flex-col divide-y border-t">
        {items.map((item, i) => (
          <li
            key={item.title}
            className="fade-up-in flex gap-5 py-5"
            style={{ '--reveal-i': i } as CSSVarStyle}
          >
            <span className="text-label text-accent-text shrink-0 font-mono">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-body text-text-2">
              <span className="text-text font-medium">{item.title}</span> {item.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
