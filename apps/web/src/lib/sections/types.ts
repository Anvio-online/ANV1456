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

interface PlaceholderSection extends SectionBase {
  variant: string
  [key: string]: unknown
}

export type SectionInstance =
  | ({ type: 'hero' } & HeroProps)
  // Documented in section-library.md, not yet scaffolded:
  | ({ type: 'proofBar' } & PlaceholderSection)
  | ({ type: 'services' } & PlaceholderSection)
  | ({ type: 'problem' } & PlaceholderSection)
  | ({ type: 'process' } & PlaceholderSection)
  | ({ type: 'workflowGraph' } & PlaceholderSection)
  | ({ type: 'agentDemo' } & PlaceholderSection)
  | ({ type: 'featuredWork' } & PlaceholderSection)
  | ({ type: 'engagementModel' } & PlaceholderSection)
  | ({ type: 'whyUs' } & PlaceholderSection)
  | ({ type: 'industries' } & PlaceholderSection)
  | ({ type: 'integrations' } & PlaceholderSection)
  | ({ type: 'faq' } & PlaceholderSection)
  | ({ type: 'insights' } & PlaceholderSection)
  | ({ type: 'ctaClosing' } & PlaceholderSection)

export type SectionType = SectionInstance['type']
