export const SITE_NAME = 'Anvio'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://anvio.online'
export const SITE_DESCRIPTION =
  'We help growing businesses automate manual work, build software that scales, and get found online.'

/** The publicly displayed, monitored inbox — same address shown on
 * /contact and the Home alt-contact line. Used in Organization
 * structured data (schema.ts). Not hello@anvio.online, which is
 * unmonitored (current-situation.md §3). */
export const SITE_CONTACT_EMAIL = 'teamanvio@gmail.com'

/** Markets Anvio actively serves — India first, UAE the deliberate
 * second market (positioning.md §5). Drives Organization.areaServed
 * and Service.areaServed. */
export const SITE_AREA_SERVED = ['India', 'United Arab Emirates'] as const
