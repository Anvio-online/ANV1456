import { describe, it, expect, vi, beforeEach } from 'vitest'
const mocks = vi.hoisted(() => ({
  limit: vi.fn(),
  challenge: vi.fn(),
  insert: vi.fn(),
  notify: vi.fn(),
}))
vi.mock('@/lib/rate-limit', () => ({ checkAuditRateLimit: mocks.limit }))
vi.mock('@/lib/forms/bot-protection', () => ({ verifyAuditChallenge: mocks.challenge }))
vi.mock('@/lib/db/client', () => ({ db: { insert: mocks.insert } }))
vi.mock('@/lib/email/lead-notification', () => ({ sendAuditRequestNotification: mocks.notify }))
vi.mock('@/lib/analytics/posthog-server', () => ({ captureServer: vi.fn() }))
vi.mock('next/headers', () => ({
  headers: async () => new Headers({ 'x-real-ip': '203.0.113.5' }),
}))
import { submitAuditRequest } from './audit'
const input = { url: 'https://example.com', email: 'owner@example.com' }
describe('audit protection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.limit.mockResolvedValue({ success: true })
    mocks.challenge.mockResolvedValue(true)
  })
  it('ignores a filled honeypot without touching storage or email', async () => {
    expect(await submitAuditRequest({ ...input, companyWebsite: 'bot value' })).toEqual({
      success: true,
    })
    expect(mocks.limit).not.toHaveBeenCalled()
    expect(mocks.insert).not.toHaveBeenCalled()
    expect(mocks.notify).not.toHaveBeenCalled()
  })
  it('blocks a request over its limit before verification or storage', async () => {
    mocks.limit.mockResolvedValue({ success: false })
    expect((await submitAuditRequest(input)).success).toBe(false)
    expect(mocks.challenge).not.toHaveBeenCalled()
    expect(mocks.insert).not.toHaveBeenCalled()
  })
  it('does not store or email an unverified request', async () => {
    mocks.challenge.mockResolvedValue(false)
    expect((await submitAuditRequest(input)).success).toBe(false)
    expect(mocks.insert).not.toHaveBeenCalled()
    expect(mocks.notify).not.toHaveBeenCalled()
  })
  it('fails closed when the rate-limit provider is unavailable', async () => {
    mocks.limit.mockRejectedValue(new Error('unavailable'))
    expect((await submitAuditRequest(input)).success).toBe(false)
    expect(mocks.insert).not.toHaveBeenCalled()
  })
})
