import { z } from 'zod'
import { Webhook } from 'svix'
const eventSchema = z.object({
  type: z.enum([
    'email.delivered',
    'email.bounced',
    'email.complained',
    'email.failed',
    'email.delivery_delayed',
  ]),
  created_at: z.string().datetime({ offset: true }),
  data: z.object({ email_id: z.string().min(1).max(200) }),
})
export function verifyDeliveryEvent(
  body: string,
  headers: Headers,
  secret: string,
): { id: string; providerId: string; status: string; occurredAt: Date } | null {
  const id = headers.get('svix-id')
  if (!id || id.length > 200) throw new Error('Missing webhook id.')
  new Webhook(secret).verify(body, {
    'svix-id': id,
    'svix-timestamp': headers.get('svix-timestamp') ?? '',
    'svix-signature': headers.get('svix-signature') ?? '',
  })
  const parsed = eventSchema.safeParse(JSON.parse(body))
  if (!parsed.success) return null
  return {
    id,
    providerId: parsed.data.data.email_id,
    status: parsed.data.type.slice('email.'.length),
    occurredAt: new Date(parsed.data.created_at),
  }
}
