import type { ComponentType } from 'react'
import type { SectionType } from './types'
import { Hero } from '@/sections/hero'
import { ProofBar } from '@/sections/proof-bar'
import { Services } from '@/sections/services'
import { CtaClosing } from '@/sections/cta-closing'
import { WhyUs } from '@/sections/why-us'
import { Industries } from '@/sections/industries'
import { FeaturedWork } from '@/sections/featured-work'
import { EngagementModel } from '@/sections/engagement-model'
import { Process } from '@/sections/process'
import { AgentDemo } from '@/sections/agent-demo'

/**
 * type -> component. ADR-0003: adding a section means adding one line
 * here and one folder under src/sections/ — never a new page component.
 *
 * 'process' is Home's Tier 1 signature scene (motion-system.md §7.1) —
 * its implementation lives partly outside src/sections/: the pinned
 * scroll scene itself is in src/scenes/process-pin/, dynamically
 * imported with ssr:false and IntersectionObserver-gated, per
 * motion-system.md §6.
 *
 * 'agentDemo' is the differentiator (ADR-0005, section-library.md §5)
 * — a live two-stage conversation against POST /api/agent, gated on a
 * captured email before the expensive plan call runs. Falls back to
 * its own 'preview' variant on any hard failure rather than showing a
 * broken panel.
 *
 * Every other type below is documented in section-library.md and
 * typed in types.ts, but intentionally not registered yet — an
 * unregistered type fails loudly in the renderer (with a console
 * warning) instead of silently rendering nothing, which is the signal
 * that a section folder still needs to be built.
 *
 * The registry itself is necessarily heterogeneous — it maps a union of
 * ~14 distinct prop shapes to one dispatch table. Each entry's real
 * prop type is enforced where it matters: inside its own section folder
 * (e.g. Hero takes HeroProps). `any` here is the dispatch-table
 * boundary, not a hole in type safety elsewhere.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sectionRegistry: Partial<Record<SectionType, ComponentType<any>>> = {
  hero: Hero,
  proofBar: ProofBar,
  services: Services,
  ctaClosing: CtaClosing,
  whyUs: WhyUs,
  industries: Industries,
  featuredWork: FeaturedWork,
  engagementModel: EngagementModel,
  process: Process,
  agentDemo: AgentDemo,
}
