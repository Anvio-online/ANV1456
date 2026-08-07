/**
 * The shared section contract — docs/system/section-library.md §2.
 * A page is data: an ordered array of SectionInstance. Widening this
 * union is how new section types enter the system (see registry.ts).
 */

export type Theme = 'dark' | 'light'

export type CtaStyle = 'primary' | 'secondary' | 'link'

export interface Cta {
  label: string
  href: string
  style: CtaStyle
}

/** Fields every section shares. Individual section prop types extend this. */
export interface SectionBase {
  /** kebab-case, stable — anchor target AND the analytics key. Never rename lightly. */
  id: string
  theme: Theme
  eyebrow?: string
  heading?: string
  body?: string
  cta?: Cta
  width?: 'content' | 'container' | 'bleed'
  /** Tier 1 scenes self-declare 'signature' and are exempt from the ambient default. */
  motion?: 'none' | 'ambient' | 'supporting' | 'signature'
}

// ---- Per-type prop shapes. Each section folder owns its own <type>.types.ts;
// this file re-exports the union so the renderer has one place to widen.
// Only Hero is implemented in the scaffold — the rest use PlaceholderSection
// until their section folders land, so registry.ts stays honest about
// what's actually built vs. documented in section-library.md. Every
// placeholder still extends SectionBase, so `id`/`theme` type correctly
// throughout the renderer even before the real props are filled in.

export interface HeroProps extends SectionBase {
  variant: 'centered-statement' | 'split-visual' | 'page-lead' | 'case-lead'
  trustLine?: string
  ctaSecondary?: Cta
}

export interface ProofBarProps extends SectionBase {
  variant: 'marquee' | 'stat-row' | 'statement'
  /** Each row scrolls opposite the previous one — motion-system.md §8. */
  rows: { items: string[] }[]
}

export interface ServicePillar {
  key: 'build' | 'automate' | 'grow'
  title: string
  body: string
  subItems: string[]
  href: string
}

export interface ServicesProps extends SectionBase {
  variant: 'pillar-cards' | 'cluster-grid' | 'list-detail'
  pillars: ServicePillar[]
}

export interface CtaClosingProps extends SectionBase {
  variant: 'centered-bold' | 'split-with-form' | 'calendar-embed'
  /** e.g. "OR EMAIL — hello@anvio.online" */
  altContact?: string
}

export interface ContrastRow {
  typical: string
  anvio: string
}

export interface WhyUsProps extends SectionBase {
  variant: 'contrast-table' | 'principle-cards' | 'numbered-list'
  rows: ContrastRow[]
}

export interface IndustryTile {
  name: string
  line: string
  href: string
}

export interface IndustriesProps extends SectionBase {
  variant: 'compact-grid' | 'tabbed-detail'
  items: IndustryTile[]
}

export interface CaseStudyCard {
  client: string
  region: string
  industry: string
  problem: string
  build: string
  /** Optional, deliberately — never fabricate a metric. Omit rather
   * than invent a number for a real, named business (home-spec.md's
   * strategic constraint: "no invented numbers"). */
  outcome?: string
  stack: string[]
  href: string
}

export interface FeaturedWorkProps extends SectionBase {
  variant: 'two-up-deep' | 'grid' | 'carousel'
  items: CaseStudyCard[]
}

export interface EngagementTier {
  name: string
  audienceFit: string
  timeline: string
  range: string
  includes: string[]
}

export interface EngagementModelProps extends SectionBase {
  variant: 'phase-timeline' | 'tier-cards'
  tiers: EngagementTier[]
  /** Plainly-worded policy lines — scope changes, lateness, ownership,
   * end of engagement. home-spec.md §7. */
  policyNotes: string[]
}

export interface ProcessStage {
  /** e.g. "01" — display-only, not a numeric type since leading zero matters. */
  number: string
  title: string
  promise: string
  deliverables: string[]
  duration: string
}

export interface ProcessProps extends SectionBase {
  variant: 'horizontal-pin' | 'sticky-stack' | 'vertical-list'
  stages: ProcessStage[]
}

export interface AgentDemoProps extends SectionBase {
  variant: 'full' | 'preview'
  /** Rotating examples in the idle input — content, not implementation detail,
   * so it lives here with the rest of the page composition data. */
  placeholders: string[]
}

interface PlaceholderSection extends SectionBase {
  variant: string
  [key: string]: unknown
}

export type SectionInstance =
  | ({ type: 'hero' } & HeroProps)
  | ({ type: 'proofBar' } & ProofBarProps)
  | ({ type: 'services' } & ServicesProps)
  | ({ type: 'ctaClosing' } & CtaClosingProps)
  | ({ type: 'whyUs' } & WhyUsProps)
  | ({ type: 'industries' } & IndustriesProps)
  | ({ type: 'featuredWork' } & FeaturedWorkProps)
  | ({ type: 'engagementModel' } & EngagementModelProps)
  | ({ type: 'process' } & ProcessProps)
  | ({ type: 'agentDemo' } & AgentDemoProps)
  // Documented in section-library.md, not yet scaffolded:
  | ({ type: 'problem' } & PlaceholderSection)
  | ({ type: 'workflowGraph' } & PlaceholderSection)
  | ({ type: 'integrations' } & PlaceholderSection)
  | ({ type: 'faq' } & PlaceholderSection)
  | ({ type: 'insights' } & PlaceholderSection)

export type SectionType = SectionInstance['type']
