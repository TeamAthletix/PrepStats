// src/pages/onboard/player.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { pageview } from '@/lib/ga'

export default function PlayerOnboarding() {
  const router = useRouter()

  useEffect(() => {
    pageview(router.pathname)
  }, [router.pathname])

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome, Player</h1>
        <p className="mt-2 text-gray-600">Let’s get you set up.</p>
      </div>
    </main>
  )
}
