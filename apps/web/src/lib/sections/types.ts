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
// Every type below is now real and registered — `testimonial` is the
// one exception, documented in section-library.md §3 but deliberately
// unbuilt (no testimonials exist to show), and it isn't in the
// SectionInstance union below for that reason: an unregistered type
// fails at the call site, which is the honest state for it right now.

export interface HeroProps extends SectionBase {
  variant: 'centered-statement' | 'split-visual' | 'page-lead' | 'case-lead'
  trustLine?: string
  ctaSecondary?: Cta
  /** 'split-visual' only — which static poster the right column shows,
   * each teasing that page's own Tier 1 scene without mounting any of
   * its JS. Defaults to 'workflow' (Automate's original, unchanged). */
  posterVariant?: 'workflow' | 'wireframe' | 'dashboard'
}

export interface ProofBarStat {
  value: string
  label: string
}

export interface ProofBarProps extends SectionBase {
  variant: 'marquee' | 'stat-row' | 'statement'
  /** 'marquee' only. Each row scrolls opposite the previous one — motion-system.md §8. */
  rows?: { items: string[] }[]
  /** 'stat-row' only. counterRoll — motion-system.md §3. Every value must
   * survive a client asking "how do you know?" (automate-spec.md §2). */
  stats?: ProofBarStat[]
}

export interface ServicePillar {
  key: 'build' | 'automate' | 'grow'
  title: string
  body: string
  subItems: string[]
  href: string
}

export interface ServiceClusterItem {
  name: string
  /** Shown when the accordion opens. Never link to an unbuilt leaf page
   * (automate-spec.md §4) — omit href until the page exists. */
  description: string
  href?: string
}

export interface ServiceCluster {
  headline: string
  promise: string
  subItems: ServiceClusterItem[]
}

export interface ServicesProps extends SectionBase {
  variant: 'pillar-cards' | 'cluster-grid' | 'list-detail'
  /** 'pillar-cards' only. */
  pillars?: ServicePillar[]
  /** 'pillar-cards' only. Home's per-card looping micro-visual is Tier 2
   * (motion-system.md §8) and reserved for the page that has to sell.
   * services-hub-spec.md §3 reuses the same variant for the full
   * sub-item lists but explicitly drops the visual — the hub carries
   * zero Tier 2 pieces (phase-2-plan.md §4). Defaults true so Home's
   * existing instance is unaffected. */
  showViz?: boolean
  /** 'cluster-grid' only. */
  clusters?: ServiceCluster[]
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

export interface WhyUsItem {
  title: string
  body: string
}

export interface WhyUsProps extends SectionBase {
  variant: 'contrast-table' | 'principle-cards' | 'numbered-list'
  /** 'contrast-table' only. */
  rows?: ContrastRow[]
  /** 'principle-cards' / 'numbered-list' — same {title, body} shape,
   * about-spec.md §3 and §5, styled differently per variant. */
  items?: WhyUsItem[]
}

export interface IndustryTile {
  name: string
  line: string
  /** Omit rather than link to the /industries hub until it's built —
   * see docs/README.md "Known gaps". A 404 from the homepage is worse
   * than a non-interactive card. */
  href?: string
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
  /** Omit rather than link to an unbuilt /case-studies/[slug] page — see
   * docs/README.md "Known gaps". A 404 from the homepage is worse than
   * a card with no "read more". */
  href?: string
  /** Overrides the card's default "Read the case study →" link text.
   * Needed the moment `href` points somewhere that isn't a case study —
   * projects-spec.md's internal-build cards link to a live demo or a
   * tool, not a write-up. Defaults to "Read the case study →" so every
   * existing card (all real case studies) is unaffected. */
  hrefLabel?: string
  /** projects-spec.md §0 — renders the honesty label structurally so it
   * can't be dropped in a later edit. Omit (or 'client') for a named
   * client project with no label needed; 'partner-agency' renders
   * "Delivered via partner agency"; 'internal' renders "Internal build"
   * — required for anything on /projects that isn't client work
   * (phase-2-plan.md §1a: the agent demo, the ROI tool, this site
   * itself). Left optional here rather than required so Home's existing
   * featuredWork cards, which predate this field, render unchanged. */
  kind?: 'client' | 'internal' | 'partner-agency'
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
  /** 'tier-cards' only. Explicit rather than inferred from array
   * position — inferring "the middle one" breaks the moment a tier
   * gets added or removed, and silently highlights the wrong card. */
  highlighted?: boolean
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

export interface ProblemRow {
  without: string
  withAnvio: string
}

export interface PainGridItem {
  pain: string
  line: string
}

export interface ProblemProps extends SectionBase {
  variant: 'before-after' | 'pain-grid' | 'cost-calculator'
  /** 'before-after' only. Real <table> semantics — automate-spec.md
   * §3, this is a GEO asset. */
  rows?: ProblemRow[]
  /** 'pain-grid' only — build-spec.md §3. Independent failure modes,
   * not paired transformations, so a grid rather than a two-column
   * contrast: same section family, different variant, per
   * ADR-0003's variant-first rule. Capped at 6 — fadeUpGroup's
   * documented stagger limit (motion-system.md §3). */
  items?: PainGridItem[]
  /** 'cost-calculator' only — grow-spec.md §3. Client-side, no
   * submission, no gate: real number inputs with sensible defaults,
   * server-rendered and readable before any JS runs. `disclaimer` is
   * load-bearing — a calculator without one is the over-promising this
   * page's positioning otherwise rejects. */
  calculator?: {
    defaultVisitors: number
    defaultEnquiryRate: number
    targetEnquiryRate: number
    defaultDealValue: number
    disclaimer: string
  }
}

export interface IntegrationGroup {
  category: string
  items: string[]
}

export interface IntegrationsProps extends SectionBase {
  variant: 'marquee-dual'
  groups: IntegrationGroup[]
  /** e.g. "Don't see yours? If it has an API, we can connect it. →" */
  footnote?: string
}

export interface FaqItem {
  question: string
  /** Answer-first, 40-60 words before any expansion — seo-strategy.md §7. */
  answer: string
}

export interface FaqProps extends SectionBase {
  variant: 'accordion'
  items: FaqItem[]
}

export interface WorkflowNode {
  id: string
  label: string
  /** e.g. "classifying intent" — the short line that updates as the
   * node activates, always visible. */
  status: string
  /** Longer copy shown on hover/tap, when the cascade pauses on this
   * node — motion-system.md §7.2: "the difference between 'we do
   * automation' and 'here's how it works.'" Distinct from `status`
   * because that line is deliberately terse. */
  explainer: string
}

export interface WorkflowEdge {
  from: string
  to: string
}

export interface WorkflowGraphProps extends SectionBase {
  /** 'compact' — service-leaf-spec.md §3a: a reduced form for the
   * Automate leaves, 3–5 nodes, one-time staggered reveal, no
   * `pathPulse`, no hover-to-pause explainer layer, no dynamic import
   * — server-rendered, real DOM text throughout, same as 'live'. */
  variant: 'live' | 'compact'
  /** e.g. "A customer messages on WhatsApp at 11pm." */
  scenario: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

export interface RichTextStep {
  label: string
  text: string
}

export interface RichTextProps extends SectionBase {
  variant: 'prose' | 'numbered-steps' | 'mdx'
  /** 'prose' only — one or more paragraphs, rendered in order. */
  paragraphs?: string[]
  /** 'numbered-steps' only — e.g. contact-spec.md §4 "What happens next". */
  steps?: RichTextStep[]
  /** 'mdx' only. ADR-0006 — the raw MDX source of a content entry's
   * body, compiled server-side per request by next-mdx-remote/rsc
   * (content-layer.md §2). Reuses SectionBase.body's slot rather than
   * a dedicated field: same "the body of the page" meaning, and no
   * other variant sets it. The only section permitted to render a
   * whitelisted set of MDX components (content-layer.md §2) — never a
   * section component. */
  body?: string
}

export interface ContactProps extends SectionBase {
  variant: 'split-form' | 'details'
  /** 'split-form' only — the amber-marker reassurance lines above the form. */
  reassurances?: string[]
  /** 'split-form' only — passed through to ContactForm; each placement's
   * qualifying question is deliberately different copy (contact-spec.md §1). */
  messageLabel?: string
  /** 'details' only. */
  email?: string
  responseTime?: string
  location?: string
}

export interface LeadMagnetOption {
  title: string
  body: string
  href: string
  ctaLabel: string
}

export interface LeadMagnetProps extends SectionBase {
  variant: 'route-cards' | 'tool-card'
  /** 'route-cards' only — contact-spec.md §2, routes to another page's
   * own conversion device rather than being one itself. */
  options?: LeadMagnetOption[]
  /** 'tool-card' (grow-spec.md §7, the free-audit form) isn't built yet
   * — its fields land here when it is. */
}

export interface TechStackCategory {
  category: string
  items: string[]
}

export interface TechStackProps extends SectionBase {
  variant: 'categorized'
  categories: TechStackCategory[]
  /** e.g. "Not married to any of it. If your team already runs
   * something that works, we build on that instead." */
  footnote?: string
}

export interface BuildAssemblyPass {
  /** e.g. "Structure" — the frame itself is fixed markup per pass
   * index (scenes/build-assembly/build-assembly.tsx); this and the
   * fields below are the real DOM text carried per pass. */
  label: string
  /** e.g. "PASS 01 · STRUCTURE" */
  caption: string
  explainer: string
}

export interface BuildAssemblyProps extends SectionBase {
  variant: 'wireframe-to-render'
  /** Exactly 4, matching motion-system.md §7.3's fixed passes. */
  passes: BuildAssemblyPass[]
}

export interface ResultMetric {
  name: string
  definition: string
}

export interface ResultsProps extends SectionBase {
  variant: 'metric-row'
  metrics: ResultMetric[]
  /** e.g. "And the ones we don't report on, because they don't mean
   * anything: impressions, 'domain authority', keyword count." —
   * grow-spec.md §9: this line does more work than the list above it. */
  footnote?: string
}

export interface GrowthChartMetric {
  label: string
  value: string
}

export interface GrowthChartState {
  /** e.g. "M1" */
  month: string
  /** e.g. "BASELINE" */
  label: string
  /** What shipped that month — real text, always in the DOM. The M2
   * caption is deliberately the least flattering one on the site
   * (motion-system.md §7.4): "rankings flat, deliberately." */
  caption: string
  metrics: GrowthChartMetric[]
  /** 0-100, the line chart's height at this state — draws via
   * stroke-dashoffset in the live scene, never redraws from zero. */
  chartHeight: number
}

export interface GrowthChartProps extends SectionBase {
  variant: 'dashboard-evolve'
  states: GrowthChartState[]
  /** motion-system.md §7.4's honesty constraint — a visible caption,
   * not a footnote, saying these numbers are illustrative of a shape,
   * not a real client's results. Required, not optional: this is the
   * one signature scene on the site where the content itself needs a
   * disclosure, not just the motion. */
  disclaimer: string
}

export interface TeamProps extends SectionBase {
  variant: 'founder-note' | 'grid'
  paragraphs: string[]
  /** Omit until a real photo exists — never a stock photo, per
   * about-spec.md §4: "ship the page without this section rather than
   * with a stock photo." The section reads fine without one; drop it
   * in later without touching layout or copy. */
  photo?: { src: string; alt: string }
  /** Real name and role, signed under the note. Omit to publish
   * anonymously — e.g. while the person writing it is still employed
   * elsewhere and hasn't disclosed Anvio publicly yet. The copy is
   * already written in first-person-plural so it reads fine either way. */
  name?: string
  role?: string
}

export interface BreadcrumbItem {
  name: string
  path: string
}

/** content-layer.md §4. Renders the visible trail only — BreadcrumbList
 * JSON-LD stays a separate call to breadcrumbSchema() on the page, so
 * the two can't drift while both exist independently. Same `items`
 * shape as breadcrumbSchema's input for that reason. */
export interface BreadcrumbProps extends SectionBase {
  variant: 'inline'
  items: BreadcrumbItem[]
}

export interface RelatedLink {
  label: string
  href: string
  /** One line of context — seo-strategy.md §4 bans bare "learn more"
   * as the sole anchor, so the descriptive text lives here, next to
   * the link, not folded into the anchor itself. */
  note: string
}

/** content-layer.md §4. 3–5 curated links on leaves, industries,
 * guides, and case studies — seo-strategy.md §5's hub-and-spoke
 * internal linking, made a real section rather than ad hoc per page. */
export interface RelatedLinksProps extends SectionBase {
  variant: 'card-grid' | 'inline-list'
  items: RelatedLink[]
}

export interface TocHeadingItem {
  level: 2 | 3
  text: string
  id: string
}

/** content-layer.md §4. Built from the body's own `##`/`###` headings
 * at compile time (lib/content/toc.ts) — guides-spec.md §3's `inline`
 * option, chosen there over a sticky rail for a structural reason: a
 * sticky-positioned rail needs to share a grid container with the
 * body, and sections are flat siblings under ADR-0003. */
export interface TableOfContentsProps extends SectionBase {
  variant: 'inline'
  items: TocHeadingItem[]
}

/** content-layer.md §4. guides-spec.md §2's fallback ladder: a real
 * name when available, otherwise a role byline with no name — `name`
 * is optional for exactly that reason, same pattern as TeamProps. */
export interface AuthorBioProps extends SectionBase {
  variant: 'compact'
  name?: string
  role: string
  bio: string
  photo?: { src: string; alt: string }
}

export interface InsightItem {
  title: string
  description: string
  href: string
  category: string
}

/** section-library.md §3 — the one placeholder type the codebase
 * already admitted was missing. 'featured-plus-list' built first: it's
 * what guides-spec.md's index needs (editorial ordering, not
 * chronological — the first item is the deliberate pick, not
 * "most recent"). 'three-latest' (Home §10) stays a placeholder. */
export interface InsightsProps extends SectionBase {
  variant: 'three-latest' | 'featured-plus-list'
  items: InsightItem[]
}

export type SectionInstance =
  | ({ type: 'breadcrumb' } & BreadcrumbProps)
  | ({ type: 'relatedLinks' } & RelatedLinksProps)
  | ({ type: 'tableOfContents' } & TableOfContentsProps)
  | ({ type: 'authorBio' } & AuthorBioProps)
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
  | ({ type: 'problem' } & ProblemProps)
  | ({ type: 'integrations' } & IntegrationsProps)
  | ({ type: 'faq' } & FaqProps)
  | ({ type: 'workflowGraph' } & WorkflowGraphProps)
  | ({ type: 'richText' } & RichTextProps)
  | ({ type: 'contact' } & ContactProps)
  | ({ type: 'leadMagnet' } & LeadMagnetProps)
  | ({ type: 'techStack' } & TechStackProps)
  | ({ type: 'buildAssembly' } & BuildAssemblyProps)
  | ({ type: 'results' } & ResultsProps)
  | ({ type: 'growthChart' } & GrowthChartProps)
  | ({ type: 'team' } & TeamProps)
  // Documented in section-library.md, not yet scaffolded:
  | ({ type: 'insights' } & InsightsProps)

export type SectionType = SectionInstance['type']
