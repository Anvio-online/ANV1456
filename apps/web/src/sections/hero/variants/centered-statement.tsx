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
    <Container>
      <div className="relative overflow-hidden pb-16 pt-32 text-center md:pb-24 md:pt-44">
        {/* Ambient background — CSS-only, no JS, per motion-system.md §7.1's
            "hero has no JS dependency" rule. */}
        <div aria-hidden className="hero-ambient-grid pointer-events-none absolute inset-0" />

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
  )
}
