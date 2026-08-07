import Link from 'next/link'
import type { ProcessProps } from '../process.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * about-spec.md §6 "How we work" — the five stages compressed to one
 * line each, deliberately not the sticky-stack or horizontal-pin
 * treatment. Re-running a signature-adjacent scroll piece on the About
 * page would flatten the distinction between a trust page and a sales
 * page; this is plain enough to make that distinction obvious.
 */
export function VerticalList({
  eyebrow,
  heading,
  stages,
  headingTag,
}: ProcessProps & { headingTag: HeadingTag }) {
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
      </div>

      <ol className="border-border-soft divide-border-soft max-w-measure flex flex-col divide-y border-t">
        {stages.map((stage, i) => (
          <li
            key={stage.number}
            className="fade-up-in flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4"
            style={{ '--reveal-i': i } as CSSVarStyle}
          >
            <span className="text-label text-accent-text font-mono">{stage.number}</span>
            <span className="text-body text-text font-medium">{stage.title}</span>
            <span className="text-body-s text-text-2">{stage.promise}</span>
          </li>
        ))}
      </ol>

      <Link
        href="/services/automate#process"
        className="text-body-s text-accent-text mt-6 inline-block font-medium hover:underline"
      >
        The full version, with what ships at each stage →
      </Link>
    </div>
  )
}
