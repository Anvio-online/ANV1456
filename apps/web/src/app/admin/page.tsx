import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAdminEmail } from '@/lib/admin/auth'
import { listLeads, inboxCounts } from '@/lib/db/queries/admin'
import { leadSourceSchema, LEAD_STATUSES, spamSignals } from '@/lib/admin/leads'
import { AdminSignOut } from '@/components/admin/sign-in'
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const email = await getAdminEmail()
  if (!email) redirect('/admin/login')
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q.slice(0, 200) : ''
  const source = leadSourceSchema.safeParse(params.source).data ?? ''
  const status =
    typeof params.status === 'string' && LEAD_STATUSES.some((v) => v === params.status)
      ? params.status
      : ''
  const page = Math.max(1, Math.min(10000, Number.parseInt(String(params.page), 10) || 1))
  const [{ leads, total }, counts] = await Promise.all([
    listLeads({ q, source, status, page }),
    inboxCounts(),
  ])
  function pageLink(next: number) {
    return `/admin?${new URLSearchParams({ q, source, status, page: String(next) })}`
  }
  return (
    <main className="max-w-page px-gutter mx-auto flex flex-col gap-8 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-label text-accent-text font-mono">ANVIO · PRIVATE WORKSPACE</p>
          <h1 className="text-h2">Enquiries & follow-ups</h1>
          <p className="text-body-s text-text-3">{email}</p>
        </div>
        <AdminSignOut />
      </header>
      <section aria-label="Submission totals" className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {['contact', 'audit', 'agent', 'voice'].map((type) => (
          <div key={type} className="border-border bg-surface rounded-xl border p-5">
            <p className="text-text-2 capitalize">{type}</p>
            <p className="text-h2">{counts.find((row) => row.source === type)?.total ?? 0}</p>
            <p className="text-body-s text-text-3">Raw submissions, including spam</p>
          </div>
        ))}
      </section>
      <form className="border-border bg-surface flex flex-wrap items-end gap-4 rounded-xl border p-5">
        <label className="flex grow flex-col gap-2">
          Search
          <input
            name="q"
            defaultValue={q}
            placeholder="Email, company, message or website"
            className="border-border bg-bg h-11 rounded-md border px-3"
          />
        </label>
        <label>
          Source
          <select
            name="source"
            defaultValue={source}
            className="border-border bg-bg block h-11 rounded-md border px-3"
          >
            <option value="">All sources</option>
            {leadSourceSchema.options.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select
            name="status"
            defaultValue={status}
            className="border-border bg-bg block h-11 rounded-md border px-3"
          >
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <button className="bg-accent text-accent-on h-11 rounded-md px-6 font-bold">Filter</button>
      </form>
      <section className="border-border overflow-x-auto rounded-xl border">
        <table className="text-body-s w-full text-left">
          <caption className="p-4 text-left">
            {total} matching submissions · page {page}
          </caption>
          <thead className="bg-surface">
            <tr>
              {['Customer / email', 'Source', 'Details', 'Review', 'Submitted (IST)', 'Action'].map(
                (text) => (
                  <th key={text} className="p-4">
                    {text}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={`${lead.source}:${lead.id}`} className="border-border border-t">
                <td className="p-4">
                  <p>{lead.name || 'Name not provided'}</p>
                  <p className="text-text-2 break-all">{lead.email}</p>
                </td>
                <td className="p-4 capitalize">{lead.source}</td>
                <td className="p-4">
                  <p className="max-w-measure break-words">
                    {String(
                      lead.payload.company ||
                        lead.payload.url ||
                        (lead.source === 'agent' ? 'Automation plan' : 'Open for details'),
                    )}
                  </p>
                  {spamSignals(
                    lead.email,
                    typeof lead.payload.url === 'string' ? lead.payload.url : undefined,
                  ).length ? (
                    <p className="text-warning">Needs verification</p>
                  ) : null}
                  {lead.follow_up_at ? (
                    <p>
                      Follow up:{' '}
                      {new Date(lead.follow_up_at).toLocaleDateString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                      })}
                    </p>
                  ) : null}
                </td>
                <td className="p-4">{lead.status}</td>
                <td className="whitespace-nowrap p-4">
                  {new Date(lead.created_at).toLocaleDateString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                  })}
                </td>
                <td className="p-4">
                  <Link
                    className="text-accent-text inline-flex min-h-11 items-center underline"
                    href={`/admin/${lead.source}/${lead.id}`}
                  >
                    Review →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!leads.length ? <p className="p-8">No matching submissions.</p> : null}
      </section>
      <nav aria-label="Inbox pages" className="flex gap-6">
        {page > 1 ? <Link href={pageLink(page - 1)}>← Previous</Link> : null}
        {page * 25 < total ? <Link href={pageLink(page + 1)}>Next →</Link> : null}
      </nav>
    </main>
  )
}
