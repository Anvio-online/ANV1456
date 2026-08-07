import type { HeroProps } from '../hero.types'
import type { CSSVarStyle } from '@/lib/utils/css-vars'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

/**
 * automate-spec.md §1 / build-spec.md §1 / grow-spec.md §1. Headline +
 * sub left (7 cols), a static poster right (5 cols) teasing that
 * page's own Tier 1 scene further down — the LIVE scene must not be in
 * the hero's critical path (motion-system.md §6 rule 1). Plain
 * server-rendered markup, not a scene: no dynamic import, no JS
 * dependency, never any of the real scene's code.
 */
export function SplitVisual({
  eyebrow,
  heading,
  body,
  cta,
  ctaSecondary,
  trustLine,
  posterVariant = 'workflow',
  headingTag,
}: HeroProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag
  const lines = (heading ?? '').split('\n')

  return (
    <Container>
      <div className="pt-hero-y grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {eyebrow ? (
            <span className="fade-up-in text-label text-accent-text mb-6 inline-block font-mono uppercase tracking-widest">
              {eyebrow}
            </span>
          ) : null}

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
          {posterVariant === 'wireframe' ? <WireframePoster /> : null}
          {posterVariant === 'dashboard' ? <DashboardPoster /> : null}
          {posterVariant === 'workflow' ? <WorkflowPoster /> : null}
        </div>
      </div>
    </Container>
  )
}

/**
 * Automate's original poster — the same three-node shape the live
 * workflow graph below will animate (Customer → AI Agent → Team),
 * rendered once, motionless.
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

/**
 * build-spec.md §1 — a frame with two blocks already resolved into
 * finished UI, teasing the wireframe-to-render assembly scene below.
 * Static: three rows fixed at different fidelity, never animating
 * between them (that's the live scene's job).
 */
function WireframePoster() {
  return (
    <div
      aria-hidden
      className="border-accent-line bg-surface flex flex-col gap-3 rounded-xl border p-7"
    >
      <span className="text-label text-text-3 mb-1 font-mono uppercase tracking-widest">
        Product page
      </span>
      {/* Row 1 — structure pass: grey blocks, no styling */}
      <div className="flex gap-3">
        <div className="bg-border-soft h-16 w-16 shrink-0 rounded-md" />
        <div className="flex flex-1 flex-col justify-center gap-2">
          <div className="bg-border-soft h-3 w-3/4 rounded-sm" />
          <div className="bg-border-soft h-3 w-1/2 rounded-sm" />
        </div>
      </div>
      {/* Row 2 — resolved pass: real component styling */}
      <div className="border-accent-line bg-accent-wash flex items-center gap-3 rounded-md border p-3">
        <div className="bg-accent h-16 w-16 shrink-0 rounded-md opacity-85" />
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          <span className="text-body-s font-medium">Ridge Hiking Jacket</span>
          <span className="text-label text-accent-text font-mono">₹4,200</span>
        </div>
      </div>
      <span className="text-label text-text-3 mt-1 font-mono uppercase tracking-widest">
        Pass 03 · Real data
      </span>
    </div>
  )
}

/**
 * grow-spec.md §1 — the dashboard scene's "after" state, motionless.
 * Teases the six-month dashboard-evolve scene below.
 */
function DashboardPoster() {
  return (
    <div
      aria-hidden
      className="border-accent-line bg-surface flex flex-col gap-5 rounded-xl border p-7"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-label text-text-3 font-mono uppercase tracking-widest">
          Organic sessions
        </span>
        <span className="text-label text-accent-text font-mono uppercase tracking-widest">
          Month 6
        </span>
      </div>
      <svg viewBox="0 0 200 60" className="h-15 w-full" aria-hidden>
        <path
          d="M0 52 H200 M0 34 H200 M0 16 H200"
          stroke="var(--border)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M4 50 C 30 48, 50 44, 70 40 S 110 30, 130 20 S 170 8, 196 4"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="border-border-soft flex justify-between border-t pt-4">
        <div className="flex flex-col gap-1">
          <span className="text-h4 text-accent-text font-mono">3.1×</span>
          <span className="text-label text-text-3 font-mono uppercase tracking-widest">
            Organic traffic
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-h4 text-accent-text font-mono">94</span>
          <span className="text-label text-text-3 font-mono uppercase tracking-widest">
            Core Web Vitals
          </span>
        </div>
      </div>
    </div>
  )
}
