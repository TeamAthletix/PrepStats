
// src/pages/onboard/coach.tsx

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { pageview } from '@/lib/ga'
import OnboardingShell from '@/components/onboarding/OnboardingShell'
import CoachForm from '@/components/onboarding/CoachForm'

export default function CoachOnboarding() {
  const router = useRouter()

  useEffect(() => {
    pageview(router.pathname)
  }, [router.pathname])

  return (
    <OnboardingShell role="coach">
      <CoachForm />
    </OnboardingShell>
  )
}
