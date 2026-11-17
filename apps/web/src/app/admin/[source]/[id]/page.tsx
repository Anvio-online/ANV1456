import { notFound, redirect } from 'next/navigation'
import { z } from 'zod'
import { getAdminEmail } from '@/lib/admin/auth'
import { leadSourceSchema } from '@/lib/admin/leads'
import { getLead } from '@/lib/db/queries/admin'
import { LeadDetail } from '@/components/admin/lead-detail'
export default async function LeadPage({
  params,
}: {
  params: Promise<{ source: string; id: string }>
}) {
  if (!(await getAdminEmail())) redirect('/admin/login')
  const input = z
    .object({ source: leadSourceSchema, id: z.string().uuid() })
    .safeParse(await params)
  if (!input.success) notFound()
  const lead = await getLead(input.data.source, input.data.id)
  if (!lead) notFound()
  return (
    <main className="max-w-page px-gutter mx-auto py-12">
      <LeadDetail lead={lead} />
    </main>
  )
}
