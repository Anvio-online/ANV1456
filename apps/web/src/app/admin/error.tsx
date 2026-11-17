'use client'
import { Button } from '@/components/ui/button'
export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="max-w-measure px-gutter mx-auto flex flex-col gap-5 py-12">
      <h1 className="text-h2">The inbox could not load.</h1>
      <p>
        Please try again. If this continues, check the database connection and whether the admin
        migration has been applied.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  )
}
