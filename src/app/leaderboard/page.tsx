'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Leaderboard() {
  const [sport, setSport] = useState<'football'|'flag'>('football')
  const [state, setState] = useState<string>('AL')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('stat_entries')
        .select('athlete_user_id, metric_name, value, game_id, verified')
        .limit(50)
      if (!error) setData(data || [])
      setLoading(false)
    }
    fetchData().catch(() => {})
  }, [sport, state])

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">Leaderboards</h1>
      <div className="flex gap-2 mb-4">
        <select value={sport} onChange={e => setSport(e.target.value as any)} className="rounded bg-brand-charcoal p-2 border border-brand-gray">
          <option value="football">Football</option>
          <option value="flag">Girls Flag Football</option>
        </select>
        <select value={state} onChange={e => setState(e.target.value)} className="rounded bg-brand-charcoal p-2 border border-brand-gray">
          {['AL','GA','FL'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {loading && <div>Loading leaderboard...</div>}
      <ul className="list-disc pl-6">
        {data.length === 0 && <li className="text-brand-gray">No data yet.</li>}
        {data.map((row, i) => (
          <li key={i}>Athlete #{row.athlete_user_id} — {row.value ?? 0} {row.metric_name}</li>
        ))}
      </ul>
    </div>
  )
}
