import { getServerSession, type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { env } from '@/lib/env'

export function isAdminEmail(email: string | null | undefined): boolean {
  return Boolean(
    email &&
    env.ADMIN_EMAILS?.split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean)
      .includes(email.trim().toLowerCase()),
  )
}
export const isAdminConfigured = Boolean(
  env.NEXTAUTH_SECRET && env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.ADMIN_EMAILS,
)
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: isAdminConfigured
    ? [GoogleProvider({ clientId: env.GOOGLE_CLIENT_ID!, clientSecret: env.GOOGLE_CLIENT_SECRET! })]
    : [],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 },
  pages: { signIn: '/admin/login', error: '/admin/login' },
  callbacks: {
    async signIn({ account, profile, user }) {
      return Boolean(
        isAdminConfigured &&
        account?.provider === 'google' &&
        profile &&
        'email_verified' in profile &&
        profile.email_verified === true &&
        isAdminEmail(user.email) &&
        isAdminEmail(profile.email) &&
        user.email?.toLowerCase() === profile.email?.toLowerCase(),
      )
    },
    async session({ session }) {
      if (!isAdminEmail(session.user?.email)) session.user = undefined
      return session
    },
  },
}
export async function getAdminEmail(): Promise<string | null> {
  if (!isAdminConfigured) return null
  const session = await getServerSession(authOptions)
  return isAdminEmail(session?.user?.email) ? session!.user!.email! : null
}
export async function requireAdmin(): Promise<string> {
  const email = await getAdminEmail()
  if (!email) throw new Error('Administrator sign-in required.')
  return email
}
