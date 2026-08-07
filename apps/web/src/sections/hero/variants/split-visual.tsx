import type { HeroProps } from '../hero.types'
import type { CSSVarStyle } from '@/lib/utils/css-vars'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

/**
 * automate-spec.md §1. Headline + sub left (7 cols), a static preview
 * of the workflow graph right (5 cols) — the LIVE graph is its own
 * Tier 1 scene further down the page (motion-system.md §7.2) and must
 * not be in the hero's critical path. This is plain server-rendered
 * markup, not a scene: no dynamic import, no JS dependency, matching
 * motion-system.md §6 rule 1.
 */
export function SplitVisual({
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
      <div className="pt-hero-y grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="fade-up-in text-label text-accent-text mb-6 inline-block font-mono uppercase tracking-widest">
            AI Automation
          </span>

          {/* flow-root: .mask-reveal-line's negative margin-bottom (globals.css
              — compensates for a descender-clip padding fix) collapses through
              a plain block parent and eats into the mt-6 gap below. Same fix
              as hero/variants/centered-statement.tsx. */}
          <HeadingTagEl className="max-w-headline text-display-l flow-root leading-none tracking-tight">
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
              className="fade-up-in max-w-measure text-body-l text-text-2 mt-6"
              style={{ '--reveal-i': lines.length + 2 } as CSSVarStyle}
            >
              {body}
            </p>
          ) : null}

          <div
            className="fade-up-in mt-8 flex flex-wrap items-center gap-3"
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

        <div className="lg:col-span-5">
          <WorkflowPoster />
        </div>
      </div>
    </Container>
  )
}

/**
 * Static poster — the same three-node shape the live scene below will
 * animate (Customer → AI Agent → Team), rendered once, motionless. Not
 * a smaller/cheaper version of the real scene; it never mounts any of
 * the scene's JS.
 */
function WorkflowPoster() {
  const nodes = [
    { label: 'Customer', status: 'WhatsApp · 11:04pm' },
    { label: 'AI Agent', status: 'reads intent, checks policy' },
    { label: 'Team', status: 'only if it needs a human' },
  ]

  return (
    <div
      aria-hidden
      className="border-accent-line bg-surface flex flex-col gap-5 rounded-xl border p-7"
    >
      {nodes.map((node, i) => (
        <div key={node.label} className="flex flex-col gap-2">
          <div
            className={
              'flex items-center justify-between rounded-lg border px-4 py-3 ' +
              (i === 1 ? 'border-accent-line bg-accent-wash' : 'border-border-soft bg-bg')
            }
          >
            <span className="text-body-s font-mono font-medium">{node.label}</span>
            <span className="text-label text-text-3 font-mono uppercase tracking-widest">
              {node.status}
            </span>
          </div>
          {i < nodes.length - 1 ? <div className="bg-border ml-6 h-5 w-px" /> : null}
        </div>
      ))}
    </div>
  )
}
