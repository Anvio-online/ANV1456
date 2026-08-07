import type { ServicesProps, ServiceCluster } from '../services.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Accordion } from '@/components/ui/accordion'

/**
 * automate-spec.md §4. Nine services collapsed into four clusters —
 * "nine peer cards is a wall, not a menu." Each cluster's sub-items are
 * an accordion; expanding one shows its two-line description in place
 * rather than navigating away. seo-strategy.md: the sub-item names are
 * the leaf-page keyword set, so they're real text here even before
 * those pages exist — never a link to a page that doesn't exist yet.
 */
export function ClusterGrid({
  eyebrow,
  heading,
  clusters = [],
  headingTag,
}: ServicesProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="mb-head-gap flex flex-col gap-4">
        {eyebrow ? (
          <span className="text-label text-accent-text font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <HeadingTagEl className="max-w-headline text-h2 leading-none tracking-tight">
            {heading}
          </HeadingTagEl>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {clusters.map((cluster) => (
          <ClusterCard key={cluster.headline} cluster={cluster} />
        ))}
      </div>
    </div>
  )
}

function ClusterCard({ cluster }: { cluster: ServiceCluster }) {
  return (
    <article className="border-border bg-surface flex flex-col gap-4 rounded-xl border p-7">
      <h3 className="font-display text-h3 leading-tight tracking-tight">{cluster.headline}</h3>
      <p className="text-body-s text-text-2">{cluster.promise}</p>
      <Accordion
        items={cluster.subItems.map((item) => ({
          id: item.name,
          // The key on this span isn't consumed by React (it's stored as
          // an object property, not rendered as a direct array child) —
          // but React's dev-mode JSX runtime flags elements created
          // lexically inside a .map() callback as needing one regardless
          // of how the value is later used, and warns downstream when
          // it's eventually rendered without one. See Accordion's
          // headingLevel doc for where this was actually diagnosed.
          trigger: (
            <span key={item.name} className="text-body-s font-medium">
              {item.name}
            </span>
          ),
          content: item.description,
        }))}
      />
    </article>
  )
}
