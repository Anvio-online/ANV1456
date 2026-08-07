import type { ContactProps } from '../contact.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'
import { ContactForm } from '@/sections/cta-closing/contact-form'

/**
 * contact-spec.md §1. Above the fold, both columns — the form is not
 * below anything. No motion delays interactivity: the form renders
 * immediately, server-side, and is the LCP-critical element on this
 * page (motion-system.md §6 rule 1's logic, applied to a form instead
 * of a hero headline).
 */
export function SplitForm({
  eyebrow,
  heading,
  body,
  reassurances = [],
  messageLabel,
  headingTag,
}: ContactProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-12">
      <div>
        {eyebrow ? (
          <span className="fade-up-in text-label text-accent-text mb-4 inline-block font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <HeadingTagEl className="max-w-headline text-h2 mb-4 leading-none tracking-tight">
            {heading}
          </HeadingTagEl>
        ) : null}
        {body ? <p className="max-w-measure text-body-l text-text-2">{body}</p> : null}

        {reassurances.length > 0 ? (
          <ul className="mt-6 flex flex-col gap-2">
            {reassurances.map((line, i) => (
              <li
                key={line}
                className="fade-up-in text-body-s text-text-2 flex gap-3"
                style={{ '--reveal-i': i + 2 } as CSSVarStyle}
              >
                <span aria-hidden className="bg-accent-text mt-2.5 h-1 w-1 shrink-0 rounded-full" />
                {line}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <ContactForm messageLabel={messageLabel} />
    </div>
  )
}
