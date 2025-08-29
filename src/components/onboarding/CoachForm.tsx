// src/components/onboarding/CoachForm.tsx

import { useState } from 'react'

export default function CoachForm() {
  const [name, setName] = useState('')
  const [team, setTeam] = useState('')
  const [email, setEmail] = useState('')

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const payload = { name, team, email }

  try {
    const res = await fetch('/api/onboard/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const error = await res.json()
      console.error('Submission failed:', error)
      return
    }

    const result = await res.json()
    console.log('Submission successful:', result)
  } catch (err) {
    console.error('Network error:', err)
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Team:
        <input value={team} onChange={e => setTeam(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
