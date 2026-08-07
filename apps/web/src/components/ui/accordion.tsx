'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface AccordionItemData {
  id: string
  trigger: ReactNode
  content: ReactNode
}

/**
 * motion-system.md §3 accordionOpen — Tier 4 micro. Domain-agnostic:
 * used by faq:accordion and services:cluster-grid's sub-items, works
 * on both themes since it consumes only the neutral aliases.
 *
 * One item open at a time (id-based, not index-based, so callers don't
 * need to track anything). `.accordion-panel` is a named class rather
 * than a Tailwind grid-rows-[0fr]/[1fr] utility — that pair has no
 * home in the default spacing/grid scale and grid-rows-[1fr] is exactly
 * the arbitrary-value shape the lint rule exists to block. See
 * globals.css.
 *
 * `headingLevel` marks each trigger as a heading via `role="heading"
 * aria-level`, for FAQ where the question itself must be indexable
 * heading content (automate-spec.md §11, a GEO asset) — semantically
 * and for assistive tech/SEO purposes equivalent to a literal <h3>, but
 * not an actual heading TAG: a heading element can't validly nest
 * INSIDE a button (invalid content model), and the button here has to
 * contain the trigger text for the whole row to be one click target.
 * Omit `headingLevel` (the default) for services' cluster sub-items,
 * which are labels, not headings, and shouldn't add one per item under
 * a cluster that already has its own.
 *
 * `AccordionItemData.trigger`/`content` are typically built via
 * `items.map(item => ({ trigger: <span>…</span>, … }))` at the call
 * site. Give that inner element an explicit `key` even though it's
 * stored as an object property, not rendered as a direct array child —
 * React's dev-mode JSX runtime flags elements created lexically inside
 * a .map() callback as needing one regardless of how the value is
 * later consumed, and warns downstream (attributed to this component,
 * not the actual call site) the first time it renders without one.
 */
export function Accordion({
  items,
  headingLevel,
}: {
  items: AccordionItemData[]
  headingLevel?: number
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="flex flex-col">
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id} className="border-border-soft border-b">
            <div role={headingLevel ? 'heading' : undefined} aria-level={headingLevel}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : item.id)}
                className="text-body group flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                {item.trigger}
                <ChevronIcon open={open} />
              </button>
            </div>
            <div className={cn('accordion-panel', open && 'is-open')}>
              <div className="overflow-hidden">
                <div className="text-body-s text-text-2 pb-4">{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn(
        'duration-fast ease-soft-ui h-4 w-4 shrink-0 transition-transform',
        open && 'rotate-180',
      )}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
