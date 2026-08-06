import type { CtaClosingProps } from '../cta-closing.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { ContactForm } from '../contact-form'

/**
 * home-spec.md §11. Left column is server-rendered copy; the form is
 * the one client-side leaf, pushed down per conventions.md §2.
 */
export function SplitWithForm({
  eyebrow,
  heading,
  body,
  altContact,
  headingTag,
}: CtaClosingProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-12">
      <div>
        {eyebrow ? (
          <span className="text-label text-accent-text mb-4 block font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <HeadingTagEl className="max-w-headline text-h2 mb-4 leading-none tracking-tight">
            {heading}
          </HeadingTagEl>
        ) : null}
        {body ? <p className="max-w-measure text-body-l text-text-2">{body}</p> : null}
        {altContact ? (
          <p className="text-label text-text-3 mt-6 font-mono tracking-widest">{altContact}</p>
        ) : null}
      </div>
      <ContactForm />
    </div>
  )
}
