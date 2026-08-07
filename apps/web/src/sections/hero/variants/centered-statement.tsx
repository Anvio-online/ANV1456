import type { HeroProps } from '../hero.types'
import type { CSSVarStyle } from '@/lib/utils/css-vars'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

/**
 * Home hero — home-spec.md §1. Tier 3 motion only: maskReveal on the
 * headline, fadeUpGroup on sub + CTAs. Server-rendered and complete
 * without JS — it's the LCP element on every page it appears on.
 */
export function CenteredStatement({
  heading,
  body,
  cta,
  ctaSecondary,
  trustLine,
  headingTag,
}: HeroProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag
  const lines = (heading ?? '').split('\n')

  return (
    <>
      {/* Ambient background — CSS-only, no JS, per motion-system.md §7.1's
          "hero has no JS dependency" rule. home-spec.md §1: a faint 1px grid
          plus a single slow amber glow drift.

          A direct child of <Section> (which is `relative`), NOT of the content
          div — so inset-0 spans the section's whole border box, padding
          included, and the light reaches y=0 behind the transparent nav.
          Nested inside the content div it started below --section-y and was
          clipped by that div's overflow, leaving an 86px band of dead black
          across the top of the page that read as a box around the nav. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-ambient-grid absolute inset-0" />
        <div className="hero-ambient-glow" />
      </div>

      <Container>
        {/* <Section> owns --section-y (conventions.md §3); the only thing added
            here is clearance for the fixed nav, which contributes no flow
            height. The previous pt-32/md:pt-44 was a second full helping of
            section padding on top of the first — ~325px of dead space above
            the eyebrow. `relative` keeps this above the ambient layer. */}
        <div className="pt-hero-y relative text-center">
          <span className="fade-up-in text-label text-accent-text mb-6 inline-block font-mono uppercase tracking-widest">
            AI Automation · Software · Growth
          </span>

          <HeadingTagEl className="max-w-headline text-display-xl leading-display-xl mx-auto tracking-tight">
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

          <div
            className="fade-up-in mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ '--reveal-i': lines.length + 3 } as CSSVarStyle}
          >
            {cta ? (
              <Button href={cta.href} size="lg" intent="primary">
                {cta.label}
              </Button>
            ) : null}
            {ctaSecondary ? (
              <Button href={ctaSecondary.href} size="lg" intent="secondary">
                {ctaSecondary.label}
              </Button>
            ) : null}
          </div>

          {trustLine ? (
            <p
              className="fade-up-in text-label text-text-3 mt-6 font-mono uppercase tracking-widest"
              style={{ '--reveal-i': lines.length + 4 } as CSSVarStyle}
            >
              {trustLine}
            </p>
          ) : null}
        </div>
      </Container>
    </>
  )
}
