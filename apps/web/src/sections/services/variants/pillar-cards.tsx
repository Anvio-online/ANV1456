import Link from 'next/link'
import type { ServicesProps, ServicePillar } from '../services.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * home-spec.md §3. Three pillar cards, each with a per-pillar
 * CSS-only micro-visual (design-system.md §7) that plays on hover.
 * Deliberately not icons/emoji — design_direction.md rejected that
 * treatment explicitly.
 */
export function PillarCards({
  heading,
  pillars = [],
  headingTag,
}: ServicesProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      {heading ? (
        <HeadingTagEl className="reveal is-in max-w-headline text-h2 mb-head-gap leading-none tracking-tight">
          {heading}
        </HeadingTagEl>
      ) : null}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.key} pillar={pillar} />
        ))}
      </div>
    </div>
  )
}

function PillarCard({ pillar }: { pillar: ServicePillar }) {
  return (
    <article className="min-h-105 border-border bg-surface duration-fast ease-soft-ui hover:border-accent-line hover:bg-surface-2 group flex flex-col gap-4 rounded-xl border p-8 transition hover:-translate-y-0.5">
      <PillarViz pillarKey={pillar.key} />
      <h3 className="font-display text-h3 leading-tight tracking-tight">{pillar.title}</h3>
      <p className="text-body-s text-text-2">{pillar.body}</p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {pillar.subItems.map((item) => (
          <span
            key={item}
            className="border-border text-label text-text-3 rounded-sm border px-2 py-1 font-mono tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>
      <Link href={pillar.href} className="text-body-s text-accent-text font-medium hover:underline">
        Explore {pillar.title} →
      </Link>
    </article>
  )
}

function PillarViz({ pillarKey }: { pillarKey: ServicePillar['key'] }) {
  return (
    <div className="h-33 border-border-soft relative flex items-center justify-center rounded-lg border bg-black/15">
      {pillarKey === 'build' && <BuildViz />}
      {pillarKey === 'automate' && <AutomateViz />}
      {pillarKey === 'grow' && <GrowViz />}
    </div>
  )
}

function BuildViz() {
  const bars = [0, 1, 2, 3, 4]
  return (
    <div className="flex w-4/5 flex-col gap-2">
      {bars.map((i) => (
        <div
          key={i}
          className={
            'pillar-viz-build-bar h-2 rounded-sm ' +
            (i === 0 ? 'bg-accent-text opacity-85' : 'bg-border')
          }
          style={{ '--reveal-i': i } as CSSVarStyle}
        />
      ))}
    </div>
  )
}

function AutomateViz() {
  const links = [0, 1, 2]
  return (
    <div className="flex items-center">
      {links.map((i) => (
        <div key={i} className="flex items-center">
          <div className="pillar-viz-automate-node h-8.5 w-8.5 border-border bg-surface-2 duration-fast rounded-md border transition-colors" />
          <div className="w-5.5 bg-border relative h-px" style={{ '--reveal-i': i } as CSSVarStyle}>
            <span className="pillar-viz-automate-pulse bg-accent absolute -top-0.5 left-0 h-1.5 w-1.5 rounded-full" />
          </div>
        </div>
      ))}
      <div className="pillar-viz-automate-node h-8.5 w-8.5 border-border bg-surface-2 duration-fast rounded-md border transition-colors" />
    </div>
  )
}

function GrowViz() {
  return (
    <svg viewBox="0 0 200 78" className="h-19.5 w-4/5" aria-hidden>
      <path
        d="M0 62 H200 M0 40 H200 M0 18 H200"
        stroke="var(--d-border)"
        strokeWidth="1"
        fill="none"
      />
      <path
        className="pillar-viz-grow-line"
        d="M4 70 C 40 66, 52 50, 78 46 S 120 40, 140 26 S 176 14, 196 8"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
