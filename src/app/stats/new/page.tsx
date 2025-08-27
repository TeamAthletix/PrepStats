// ===================
// File: src/app/stats/new/page.tsx
// Phase 2 core MVP: Athlete stats entry form (web UI)
// ===================

'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

type MetricBlock = {
  name: string
  value: string
  unit?: string
}

export default function StatsNew() {
  const router = useRouter()
  const sp = useSearchParams()
  const sport = (sp.get('sport') as 'football' | 'flag') ?? 'football'

  const [date, setDate] = useState<string>('')
  const [opponent, setOpponent] = useState<string>('')
  const [week, setWeek] = useState<number>(1)
  const [season, setSeason] = useState<number>(new Date().getFullYear())
  const [metrics, setMetrics] = useState<MetricBlock[]>([
    { name: sport === 'football' ? 'Rushing Yards' : 'Rushing Yards', value: '' },
    { name: sport === 'football' ? 'Passing Yards' : 'Receiving Yards', value: '' },
  ])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const base = sport === 'football'
      ? [
          { name: 'Passing Yards', unit: 'yd' },
          { name: 'Rushing Yards', unit: 'yd' },
          { name: 'Receptions', unit: 'count' },
        ]
      : [
          { name: 'Passing Yards', unit: 'yd' },
          { name: 'Receptions', unit: 'count' },
          { name: 'Receiving Yards', unit: 'yd' },
        ]
    setMetrics(base.map(b => ({ name: b.name, value: '', unit: b.unit })))
  }, [sport])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    const athlete_id = user?.id
    const gamePayload = {
      sport,
      date,
      opponent,
      homeAway: 'home',
      week,
      season_year: season,
      metrics: metrics.map(m => ({
        metric_name: m.name,
        value: Number(m.value || 0),
        unit: m.unit || ''
      })),
      athlete_user_id: athlete_id
    }
    const res = await fetch('/api/stats/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gamePayload)
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) router.push('/dashboard')
    else alert(data?.error || 'Failed to save stats')
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-2">Enter Stats – {sport.toUpperCase()}</h1>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full rounded bg-brand-charcoal p-2 border border-brand-gray" />
          </div>
          <div>
            <label>Opponent</label>
            <input value={opponent} onChange={e => setOpponent(e.target.value)} className="w-full rounded bg-brand-charcoal p-2 border border-brand-gray" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Week</label>
            <input type="number" value={week} onChange={e => setWeek(Number(e.target.value))} className="w-full rounded bg-brand-charcoal p-2 border border-brand-gray" />
          </div>
          <div>
            <label>Season</label>
            <input type="number" value={season} onChange={e => setSeason(Number(e.target.value))} className="w-full rounded bg-brand-charcoal p-2 border border-brand-gray" />
          </div>
        </div>
        {metrics.map((m, idx) => (
          <div key={idx}>
            <label>{m.name}</label>
            <input
              value={m.value}
              onChange={e => {
                const v = [...metrics]
                v[idx].value = e.target.value
                setMetrics(v)
              }}
              className="w-full rounded bg-brand-charcoal p-2 border border-brand-gray"
              placeholder={`Enter ${m.name}`}
            />
          </div>
        ))}
        <button className="bg-brand-red px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Saving...' : 'Submit Stats'}
        </button>
      </form>
    </div>
  )
}
