import type { LeadMagnetProps } from '../lead-magnet.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { AuditForm } from './audit-form'

/**
 * grow-spec.md §7. The page's primary conversion — lower friction than
 * a call, and it qualifies hard. Server-rendered copy left of the
 * form; only the form itself (AuditForm) is a client leaf, per
 * conventions.md §2.
 */
export function ToolCard({
  eyebrow,
  heading,
  body,
  headingTag,
}: LeadMagnetProps & { headingTag: HeadingTag }) {
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
      </div>
      <AuditForm />
    </div>
  )
}
