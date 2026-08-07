import type { RichTextProps } from '../rich-text.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * contact-spec.md §4 "What happens next" — the anxiety-reduction
 * section, deliberately plain: numbered mono markers, no cards.
 */
export function NumberedSteps({
  eyebrow,
  heading,
  steps = [],
  headingTag,
}: RichTextProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="max-w-measure mx-auto flex flex-col gap-8">
        {eyebrow || heading ? (
          <div className="flex flex-col gap-4">
            {eyebrow ? (
              <span className="text-label text-accent-text font-mono uppercase tracking-widest">
                {eyebrow}
              </span>
            ) : null}
            {heading ? (
              <HeadingTagEl className="text-h2 leading-none tracking-tight">{heading}</HeadingTagEl>
            ) : null}
          </div>
        ) : null}

        <ol className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <li
              key={step.label}
              className="fade-up-in flex gap-4"
              style={{ '--reveal-i': i } as CSSVarStyle}
            >
              <span className="text-label text-accent-text shrink-0 font-mono">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-body text-text-2">
                <span className="text-text font-medium">{step.label}</span> {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
