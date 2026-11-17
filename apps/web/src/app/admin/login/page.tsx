import { redirect } from 'next/navigation'
import { getAdminEmail, isAdminConfigured } from '@/lib/admin/auth'
import { AdminSignIn } from '@/components/admin/sign-in'
export default async function AdminLogin() {
  if (await getAdminEmail()) redirect('/admin')
  return (
    <main className="max-w-measure px-gutter mx-auto flex min-h-screen flex-col justify-center gap-6 py-12">
      <p className="text-label text-accent-text font-mono">ANVIO · PRIVATE WORKSPACE</p>
      <h1 className="text-h2">Your enquiries, in one place.</h1>
      <p className="text-text-2">
        Sign in with your approved Google account to review submissions and follow up.
      </p>
      {isAdminConfigured ? (
        <AdminSignIn />
      ) : (
        <p role="status">
          Admin access is not configured yet. Add the Google OAuth credentials, session secret and
          approved email before signing in.
        </p>
      )}
    </main>
  )
}
