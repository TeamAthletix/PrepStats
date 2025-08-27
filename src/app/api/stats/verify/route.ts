// ===================
// File: src/app/api/stats/verify/route.ts
// Phase 2 core MVP: Verify a stat entry
// ===================

import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient()
  const { data: user } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { stat_entry_id, notes, evidence_url } = await req.json()
  if (!stat_entry_id) return NextResponse.json({ error: 'Missing stat_entry_id' }, { status: 400 })

  // Check role
  const { data: roles } = await supabase.from('user_roles').select('role,status').eq('user_id', user.user?.id)
  const canVerify = (roles || []).some(r => (r.role === 'coach' || r.role === 'media' || r.role === 'admin') && r.status === 'active')
  if (!canVerify) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { error } = await supabase.from('stat_verifications').insert({
    stat_entry_id,
    verifier_type: 'admin',
    verifier_user_id: user.user?.id,
    notes: notes || null,
    evidence_url: evidence_url || null
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Mark as verified
  const { error: e2 } = await supabase.from('stat_entries').update({ verified: true }).eq('id', stat_entry_id)
  if (e2) return NextResponse.json({ error: e2.message }, { status: 400 })

  return NextResponse.json({ ok: true })
}
