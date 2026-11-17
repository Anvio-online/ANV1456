'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin/auth'
import { leadSourceSchema, leadStatusSchema } from '@/lib/admin/leads'
import { saveLeadReview } from '@/lib/db/queries/admin'
const schema = z.object({
  source: leadSourceSchema,
  leadId: z.string().uuid(),
  status: leadStatusSchema,
  notes: z.string().max(5000),
  followUpAt: z.union([z.literal(''), z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)]),
})
export async function updateLeadReview(form: FormData): Promise<void> {
  await requireAdmin()
  const input = schema.parse(Object.fromEntries(form))
  const followUpAt = input.followUpAt ? new Date(`${input.followUpAt}Z`) : null
  if (followUpAt && Number.isNaN(followUpAt.getTime())) throw new Error('Invalid follow-up date.')
  await saveLeadReview({ ...input, followUpAt })
  revalidatePath('/admin')
  revalidatePath(`/admin/${input.source}/${input.leadId}`)
}
