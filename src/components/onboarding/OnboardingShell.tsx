// src/components/onboarding/OnboardingShell.tsx

import { ReactNode } from 'react'

type Props = {
  role: 'coach' | 'player'
  children: ReactNode
}

export default function OnboardingShell({ role, children }: Props) {
  return (
    <section style={{ padding: '2rem' }}>
      <header>
        <h2>{role === 'coach' ? 'Coach Onboarding' : 'Player Onboarding'}</h2>
      </header>
      <div>{children}</div>
    </section>
  )
}
