import type { IndustryTile } from '@/lib/sections/types'

/**
 * industries-spec.md §3, Open Items — the shared source Home and the
 * /industries hub both read, so the six tile lines can't drift between
 * the two places they're shown. `href` is set only for the two
 * industries that actually have a page (industries-spec.md §1,
 * automate-spec.md §4's "never link to an unbuilt page") — the other
 * four stay plain cards until Phase 3 writes them as specifically.
 */
export const INDUSTRY_TILES: IndustryTile[] = [
  {
    name: 'Healthcare',
    line: 'Patient scheduling, intake, and follow-ups — automated without losing the human touch.',
  },
  {
    name: 'Ecommerce',
    line: 'Order confirmations, inventory syncs, and support tickets that used to eat your afternoon.',
    href: '/industries/ecommerce',
  },
  {
    name: 'Real Estate',
    line: 'Lead follow-up and listing updates that happen the moment they should, not when someone remembers.',
  },
  {
    name: 'Accounting & Finance',
    line: "Invoice entry and reconciliation off your team's desk and into a system that never forgets.",
    href: '/industries/accounting-firms',
  },
  {
    name: 'Education',
    line: 'Admissions inquiries and enrollment follow-ups answered in minutes, not days.',
  },
  {
    name: 'Logistics',
    line: 'Shipment updates and customer queries handled automatically, end to end.',
  },
]
