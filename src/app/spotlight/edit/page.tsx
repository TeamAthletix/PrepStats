'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function SpotlightEditPage() {
  const router = useRouter()
  const [athleteId, setAthleteId] = useState('')
  const [teamId, setTeamId] = useState('')
  const [orgId, setOrgId] = useState('')
  const [pin, setPin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const publish = async () => {
    setLoading(true)
    const res = await fetch('/api/spotlight/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        athlete_user_id: athleteId,
        team_id: teamId ? Number(teamId) : null,
        org_id: orgId ? Number(orgId) : null,
        pin
      })
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setMsg('Spotlight Edit submitted!')
      router.push('/dashboard')
    } else {
      setMsg(data.error || 'Failed to publish spotlight')
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold mb-2">Spotlight Edit</h1>
      <p className="text-sm text-brand-gray mb-3">
        Publish a Player of the Week spotlight for an athlete. Free allocations apply; otherwise tokens.
      </p>
      <div className="space-y-3">
        <input placeholder="Athlete User ID" value={athleteId} onChange={e => setAthleteId(e.target.value)} className="w-full rounded bg-brand-charcoal p-2 border border-brand-gray" />
        <input placeholder="Team ID (optional)" value={teamId} onChange={e => setTeamId(e.target.value)} className="w-full rounded bg-brand-charcoal p-2 border border-brand-gray" />
        <input placeholder="Org ID (optional)" value={orgId} onChange={e => setOrgId(e.target.value)} className="w-full rounded bg-brand-charcoal p-2 border border-brand-gray" />
        <label><input type="checkbox" checked={pin} onChange={e => setPin(e.target.checked)} /> Pin spotlight</label>
        <button onClick={publish} className="bg-brand-red px-4 py-2 rounded" disabled={loading}>{loading ? 'Publishing...' : 'Publish Spotlight'}</button>
      </div>
      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </div>
  )
}
