import { describe, it, expect, vi, beforeEach } from 'vitest'
const mocks = vi.hoisted(() => ({ authorize: vi.fn(), save: vi.fn() }))
vi.mock('@/lib/admin/auth', () => ({ requireAdmin: mocks.authorize }))
vi.mock('@/lib/db/queries/admin', () => ({ saveLeadReview: mocks.save }))
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))
import { updateLeadReview } from './admin'
const form = () => {
  const data = new FormData()
  for (const [key, value] of Object.entries({
    source: 'audit',
    leadId: '0abf187a-0cd5-42af-8f26-7ad5ccc26557',
    status: 'contacted',
    notes: 'Owner requested follow-up',
    followUpAt: '2026-12-01T09:30',
  }))
    data.set(key, value)
  return data
}
describe('lead review mutations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.authorize.mockResolvedValue('owner@example.com')
  })
  it('rejects unauthorized mutations before storage', async () => {
    mocks.authorize.mockRejectedValue(new Error('Unauthorized'))
    await expect(updateLeadReview(form())).rejects.toThrow('Unauthorized')
    expect(mocks.save).not.toHaveBeenCalled()
  })
  it('rejects unknown sources and unsupported statuses', async () => {
    const data = form()
    data.set('source', 'users')
    await expect(updateLeadReview(data)).rejects.toThrow()
    expect(mocks.save).not.toHaveBeenCalled()
  })
  it('stores explicitly labelled UTC follow-ups without server-timezone shifts', async () => {
    await updateLeadReview(form())
    expect(mocks.save).toHaveBeenCalledWith(
      expect.objectContaining({ followUpAt: new Date('2026-12-01T09:30:00Z') }),
    )
  })
})
