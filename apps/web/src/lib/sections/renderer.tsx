import type { SectionInstance } from './types'
import { sectionRegistry } from './registry'
import { resolveHeadingLevel } from './heading-level'
import { Section } from '@/components/layout/section'

/**
 * The single component every page composition renders through.
 * ADR-0003 — a page is data; this is the only place that turns data
 * into markup. Sections own no vertical margin (conventions.md §3);
 * <Section> applies --section-y so reordering the array is always safe.
 */
export function SectionRenderer({ sections }: { sections: SectionInstance[] }) {
  return (
    <>
      {sections.map((instance, index) => {
        const Component = sectionRegistry[instance.type]
        const headingTag = resolveHeadingLevel(sections, index)

        if (!Component) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              `[SectionRenderer] "${instance.type}" is not registered in registry.ts — skipping. ` +
                `See docs/system/section-library.md for its spec.`,
            )
          }
          return null
        }

        return (
          <Section key={instance.id} id={instance.id} theme={instance.theme}>
            <Component {...instance} headingTag={headingTag} />
          </Section>
        )
      })}
    </>
  )
}
