import Link from 'next/link'
import { automationPlanSchema, chatTurnSchema } from '@/lib/ai/schemas'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { LEAD_STATUSES, spamSignals, safeWebsite, type Lead } from '@/lib/admin/leads'
import { updateLeadReview } from '@/lib/actions/admin'
export function LeadDetail({ lead }: { lead: Lead }) {
  const website = safeWebsite(lead.payload.url)
  const signals = spamSignals(
    lead.email,
    typeof lead.payload.url === 'string' ? lead.payload.url : undefined,
  )
  const field = 'border-border bg-bg text-text w-full rounded-md border p-3'
  const subject =
    lead.source === 'audit' ? 'Your website audit request to Anvio' : 'Your enquiry to Anvio'
  return (
    <article className="grid gap-8 lg:grid-cols-2">
      <section className="flex min-w-0 flex-col gap-5">
        <Link href="/admin" className="text-accent-text underline">
          ← All enquiries
        </Link>
        <h1 className="text-h2 break-words">{lead.name || lead.email}</h1>
        <p className="text-text-2">
          {lead.source} ·{' '}
          {new Date(lead.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
        </p>
        <p className="break-all">{lead.email}</p>
        <div className="flex flex-wrap gap-3">
          <Button
            href={`mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(subject)}`}
          >
            Draft email
          </Button>
          <Button
            intent="secondary"
            href={`/api/admin/calendar?source=${lead.source}&id=${lead.id}`}
          >
            Calendar reminder
          </Button>
          {website ? (
            <Button intent="secondary" href={website} target="_blank" rel="noopener noreferrer">
              Visit submitted website
            </Button>
          ) : null}
        </div>
        <p className="text-body-s text-text-3">
          Email opens your mail app. Calendar downloads a reminder; it does not invite or email the
          customer.
        </p>
        {signals.length ? (
          <aside className="border-warning rounded-md border p-4">
            <h2 className="font-bold">Needs verification</h2>
            <ul>
              {signals.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
            <p>These are review hints, not proof of spam.</p>
          </aside>
        ) : null}
        {lead.source === 'agent' ? (
          <p>
            Email: {lead.delivery_status || (lead.payload.email_sent ? 'accepted' : 'unknown')}.
            Acceptance does not confirm delivery.
          </p>
        ) : null}
        <div className="flex flex-col gap-4">
          {Object.entries(lead.payload)
            .filter(([key]) => !['id', 'email', 'name', 'created_at'].includes(key))
            .map(([key, value]) => (
              <section key={key}>
                <h2 className="text-label text-text-3 font-mono uppercase">
                  {key.replaceAll('_', ' ')}
                </h2>
                <ReadableValue field={key} value={value} />
              </section>
            ))}
        </div>
      </section>
      <section className="border-border bg-surface flex h-fit flex-col gap-4 rounded-xl border p-6">
        <h2 className="text-h3">Review & follow-up</h2>
        <form action={updateLeadReview} className="flex flex-col gap-4">
          <input type="hidden" name="source" value={lead.source} />
          <input type="hidden" name="leadId" value={lead.id} />
          <label>
            Status
            <select name="status" defaultValue={lead.status} className={field}>
              {LEAD_STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label>
            Next follow-up (UTC)
            <input
              type="datetime-local"
              name="followUpAt"
              defaultValue={
                lead.follow_up_at ? new Date(lead.follow_up_at).toISOString().slice(0, 16) : ''
              }
              className={field}
            />
          </label>
          <label>
            Private notes
            <textarea
              name="notes"
              maxLength={5000}
              rows={8}
              defaultValue={lead.notes ?? ''}
              className={field}
            />
          </label>
          <Button type="submit">Save review</Button>
          <p className="text-body-s text-text-3">
            Mark suspected spam for review. Original submissions are preserved.
          </p>
        </form>
      </section>
    </article>
  )
}

function ReadableValue({ field, value }: { field: string; value: unknown }) {
  if (field === 'transcript') {
    const turns = z.array(chatTurnSchema).safeParse(value)
    if (turns.success)
      return (
        <ol className="flex flex-col gap-3">
          {turns.data.map((turn, index) => (
            <li key={index} className="border-border bg-surface rounded-md border p-4">
              <p className="text-label text-accent-text font-bold">
                {turn.role === 'user' ? 'Visitor' : 'Anvio assistant'}
              </p>
              <p className="whitespace-pre-wrap break-words">{turn.content}</p>
            </li>
          ))}
        </ol>
      )
  }
  if (field === 'plan') {
    const plan = automationPlanSchema.safeParse(value)
    if (plan.success)
      return (
        <div className="flex flex-col gap-4">
          <p className="whitespace-pre-wrap">{plan.data.summary}</p>
          <ol className="list-inside list-decimal">
            {plan.data.nodes.map((node, index) => (
              <li key={index} className="py-2">
                <strong>{node.label}</strong>
                <p className="text-text-2">{node.detail}</p>
              </li>
            ))}
          </ol>
          <p>
            Complexity: {plan.data.complexity} · Estimated hours saved/month:{' '}
            {plan.data.estimatedHoursSavedPerMonth.low}–{plan.data.estimatedHoursSavedPerMonth.high}
          </p>
        </div>
      )
  }
  return (
    <pre className="text-body-s font-body whitespace-pre-wrap break-words">
      {value === null
        ? 'Not provided'
        : typeof value === 'object'
          ? JSON.stringify(value, null, 2)
          : String(value)}
    </pre>
  )
}
