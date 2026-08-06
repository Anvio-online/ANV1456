import type { ReactNode } from 'react'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
