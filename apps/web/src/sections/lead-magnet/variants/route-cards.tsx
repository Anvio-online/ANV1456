import Link from 'next/link'
import type { LeadMagnetProps } from '../lead-magnet.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * contact-spec.md §2. Catches the visitor who wants to check us out
 * without talking to anyone — without this, they just leave. Routes to
 * conversion devices that already exist on their own pages rather than
 * duplicating them here.
 */
export function RouteCards({
  eyebrow,
  heading,
  options = [],
  headingTag,
}: LeadMagnetProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      {eyebrow || heading ? (
        <div className="mb-8 flex flex-col gap-4">
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {options.map((option) => (
          <Link
            key={option.title}
            href={option.href}
            className="border-border bg-surface duration-fast ease-soft-ui hover:border-accent-line hover:bg-surface-2 flex flex-col gap-3 rounded-xl border p-7 transition hover:-translate-y-0.5"
          >
            <h3 className="font-display text-h4 leading-tight tracking-tight">{option.title}</h3>
            <p className="text-body-s text-text-2">{option.body}</p>
            <span className="text-body-s text-accent-text mt-auto font-medium">
              {option.ctaLabel} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
