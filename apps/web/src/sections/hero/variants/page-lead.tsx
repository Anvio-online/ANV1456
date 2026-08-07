import type { HeroProps } from '../hero.types'
import type { CSSVarStyle } from '@/lib/utils/css-vars'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Container } from '@/components/layout/container'

/**
 * about-spec.md §1. The quiet hero — no split visual, no CTA pair,
 * nothing to interact with. Headline and a short lead, centred,
 * generous space. This page's entire ambition for motion above the
 * fold is maskReveal + one fadeUp; a page arguing for credibility
 * shouldn't open with the same device the sales pages use.
 */
export function PageLead({
  eyebrow,
  heading,
  body,
  headingTag,
}: HeroProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag
  const lines = (heading ?? '').split('\n')

  return (
    <Container>
      <div className="pt-hero-y pb-16 text-center md:pb-24">
        {eyebrow ? (
          <span className="fade-up-in text-label text-accent-text mb-6 inline-block font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        ) : null}

        {/* flow-root: .mask-reveal-line's negative margin-bottom (globals.css
            — compensates for a descender-clip padding fix) collapses through
            a plain block parent and eats into the mt-6 gap below. Same fix
            as hero/variants/centered-statement.tsx and split-visual.tsx. */}
        <HeadingTagEl className="max-w-headline text-display-l mx-auto flow-root leading-none tracking-tight">
          {lines.map((line, i) => (
            <span
              key={line}
              className="mask-reveal-line"
              style={{ '--reveal-i': i + 1 } as CSSVarStyle}
            >
              <span>{line}</span>
            </span>
          ))}
        </HeadingTagEl>

        {body ? (
          <p
            className="fade-up-in max-w-measure text-body-l text-text-2 mx-auto mt-6"
            style={{ '--reveal-i': lines.length + 2 } as CSSVarStyle}
          >
            {body}
          </p>
        ) : null}
      </div>
    </Container>
  )
}
