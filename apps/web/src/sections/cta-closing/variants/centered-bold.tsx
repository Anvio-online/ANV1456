import type { CtaClosingProps } from '../cta-closing.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Button } from '@/components/ui/button'
import { MagneticCta } from '@/components/motion/magnetic-cta'

/**
 * about-spec.md §8. A single CTA, not a form — the form lives on
 * /contact and this section should hand off to it rather than compete
 * with it.
 */
export function CenteredBold({
  eyebrow,
  heading,
  body,
  cta,
  headingTag,
}: CtaClosingProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto text-center">
      {eyebrow ? (
        <span className="text-label text-accent-text mb-4 block font-mono uppercase tracking-widest">
          {eyebrow}
        </span>
      ) : null}
      {heading ? (
        <HeadingTagEl className="max-w-headline text-h2 mx-auto mb-4 leading-none tracking-tight">
          {heading}
        </HeadingTagEl>
      ) : null}
      {body ? <p className="max-w-measure text-body-l text-text-2 mx-auto">{body}</p> : null}
      {cta ? (
        <MagneticCta>
          <Button href={cta.href} size="lg" intent="primary" className="mt-8">
            {cta.label}
          </Button>
        </MagneticCta>
      ) : null}
    </div>
  )
}
