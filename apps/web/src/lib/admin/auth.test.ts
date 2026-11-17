import { describe, it, expect, vi, beforeEach } from 'vitest'
const mocks = vi.hoisted(() => ({ getServerSession: vi.fn() }))
vi.mock('next-auth', () => ({ getServerSession: mocks.getServerSession }))
vi.mock('@/lib/env', () => ({
  env: {
    ADMIN_EMAILS: 'owner@example.com',
    NEXTAUTH_SECRET: 'local-secret-at-least-thirty-two-characters',
    GOOGLE_CLIENT_ID: 'local',
    GOOGLE_CLIENT_SECRET: 'local',
  },
}))
import { getAdminEmail, requireAdmin, isAdminEmail, authOptions } from './auth'
describe('admin authorization', () => {
  beforeEach(() => vi.clearAllMocks())
  it('denies an anonymous request', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    await expect(requireAdmin()).rejects.toThrow('sign-in required')
  })
  it('denies a signed-in non-admin', async () => {
    mocks.getServerSession.mockResolvedValue({ user: { email: 'other@example.com' } })
    expect(await getAdminEmail()).toBeNull()
  })
  it('checks exact email instead of suffix matches', () => {
    expect(isAdminEmail('not-owner@example.com')).toBe(false)
    expect(isAdminEmail('OWNER@example.com')).toBe(true)
  })
  it('requires Google to verify the address', async () => {
    const signIn = authOptions.callbacks!.signIn!
    const args = {
      user: { id: '1', email: 'owner@example.com' },
      account: { provider: 'google', providerAccountId: '1', type: 'oauth' as const },
      profile: { email: 'owner@example.com', email_verified: false },
    }
    expect(await signIn(args)).toBe(false)
    args.profile.email_verified = true
    expect(await signIn(args)).toBe(true)
  })
})
