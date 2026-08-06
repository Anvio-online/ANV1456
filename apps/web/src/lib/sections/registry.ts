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

/**
 * type -> component. ADR-0003: adding a section means adding one line
 * here and one folder under src/sections/ — never a new page component.
 *
 * All of home-spec.md's step-3 sections are now wired: featuredWork
 * (real client names, no fabricated metrics) and engagementModel (real
 * price ranges) were the last two, unblocked once the business
 * decisions behind them were made. Every other type is documented in
 * section-library.md and typed in types.ts, but intentionally not
 * registered yet — an unregistered type fails loudly in the renderer
 * (with a console warning) instead of silently rendering nothing, which
 * is the signal that a section folder still needs to be built.
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
}
