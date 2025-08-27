// ===================
// File: src/app/api/stats/entries/route.ts
// Phase 2 core MVP: Create per-game stat entries
// ===================

import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient()
  const { data: auth } = await supabase.auth.getUser()
  const athlete_user_id = auth?.user?.id
  if (!athlete_user_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { sport, date, opponent, week, season_year, metrics } = body

  if (!sport || !date || !week || !season_year || !metrics?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Create or find a game
  const { data: games, error: gErr } = await supabase
    .from('games')
    .select('id')
    .eq('date', date)
    .eq('opponent', opponent)
    .eq('sport_type', sport)
    .single()

  const game_id = (games?.id) ?? (await supabase.from('games').insert({
    school_id: null,
    opponent,
    date,
    home_away: 'home',
    week,
    season_year,
    sport_type: sport
  }).select('id').single())?.id

  // Create stat_entries
  const created: any[] = []
  for (const m of metrics) {
    const { data, error } = await supabase.from('stat_entries').insert({
      athlete_user_id,
      game_id,
      metric_name: m.metric_name,
      value: m.value,
      unit: m.unit || '',
      submission_by: athlete_user_id,
      proof_urls: []
    }).select('id')
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    created.push(data)
  }

  return NextResponse.json({ ok: true, entries: created })
}
