'use client'
import { signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
export function AdminSignIn() {
  return (
    <Button onClick={() => void signIn('google', { callbackUrl: '/admin' })}>
      Continue with Google
    </Button>
  )
}
export function AdminSignOut() {
  return (
    <Button intent="secondary" onClick={() => void signOut({ callbackUrl: '/admin/login' })}>
      Sign out
    </Button>
  )
}
