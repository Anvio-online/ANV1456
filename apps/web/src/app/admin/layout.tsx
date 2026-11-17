import type { ReactNode } from 'react'
import { buildMetadata } from '@/lib/seo/metadata'
export const metadata = {
  ...buildMetadata({
    title: 'Private workspace',
    description: 'Anvio internal workspace.',
    path: '/admin',
  }),
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div data-theme="dark" className="bg-bg text-text min-h-screen">
      {children}
    </div>
  )
}
