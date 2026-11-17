import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { getAdminEmail } from '@/lib/admin/auth'
import { getLead } from '@/lib/db/queries/admin'
import { leadSourceSchema } from '@/lib/admin/leads'
const escape = (value: string): string =>
  value
    .replaceAll('\\', '\\\\')
    .replaceAll(';', '\\;')
    .replaceAll(',', '\\,')
    .replace(/\r?\n/g, '\\n')
const stamp = (value: Date): string =>
  value
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
export async function GET(req: NextRequest) {
  if (!(await getAdminEmail())) return new NextResponse('Unauthorized', { status: 401 })
  const input = z
    .object({ source: leadSourceSchema, id: z.string().uuid() })
    .safeParse(Object.fromEntries(req.nextUrl.searchParams))
  if (!input.success) return new NextResponse('Invalid lead', { status: 400 })
  const lead = await getLead(input.data.source, input.data.id)
  if (!lead) return new NextResponse('Not found', { status: 404 })
  const start = lead.follow_up_at ? new Date(lead.follow_up_at) : new Date(Date.now() + 86400000)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Anvio//Follow ups//EN',
    'BEGIN:VEVENT',
    `UID:${lead.source}-${lead.id}@anvio.online`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(new Date(start.getTime() + 15 * 60000))}`,
    `SUMMARY:${escape(`Follow up: ${lead.name || lead.email}`)}`,
    `DESCRIPTION:${escape(`Review ${lead.source} enquiry in Anvio admin: https://anvio.online/admin/${lead.source}/${lead.id}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return new NextResponse(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="anvio-follow-up.ics"',
      'Cache-Control': 'private, no-store',
    },
  })
}
