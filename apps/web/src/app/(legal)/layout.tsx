import type { ReactNode } from 'react'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'

/**
 * legal-spec.md §1 — its own route group per repo-structure.md §2, but
 * still inside the normal site chrome: a visitor reaches these from
 * the footer and expects to navigate back out the same way. Separate
 * from (marketing) only for the routing/organization reason
 * repo-structure.md names, not to strip Nav/Footer.
 */
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
