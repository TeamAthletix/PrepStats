import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import { allocateTeamFreeSpotlight, allocateOrgFreeSpotlight, spendTokens } from '@/lib/tokens'

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient()
  const { data: auth } = await supabase.auth.getUser()
  const userId = auth?.user?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const athleteUserId = body.athlete_user_id
  const teamId = Number(body.team_id) || null
  const orgId = Number(body.org_id) || null
  const pin = Boolean(body.pin)

  const { data: roleRows } = await supabase.from('user_roles').select('role,status').eq('user_id', userId)
  const isCoach = roleRows?.some(r => r.role === 'coach' && r.status === 'active')
  const isMedia = roleRows?.some(r => r.role === 'media' && r.status === 'active')
  let freeUsed = false

  if (isCoach && teamId) {
    const { data: alloc } = await supabase.from('spotlight_free_allocations_team')
      .select('*').eq('team_id', teamId).eq('consumed', false).limit(1).single()
    if (alloc) {
      const ok = await allocateTeamFreeSpotlight(teamId)
      if (ok) freeUsed = true
    }
  }

  if (!freeUsed && isMedia && orgId) {
    const { data: o } = await supabase.from('organizations').select('id,whitelisted').eq('id', orgId).single()
    const whitelisted = o?.whitelisted ?? false
    if (whitelisted) {
      const { data: f } = await supabase.from('spotlight_free_allocations_org')
        .select('*').eq('org_id', orgId).eq('consumed', false).limit(1).single()
      if (f) {
        const ok = await allocateOrgFreeSpotlight(orgId)
        if (ok) freeUsed = true
      }
    }
  }

  if (!freeUsed) {
    const cost = 60
    try {
      await spendTokens(userId, cost)
    } catch (e: any) {
      return NextResponse.json({ error: e?.message ?? 'Insufficient tokens' }, { status: 400 })
    }
  }

  const createdBy = userId
  const now = new Date().toISOString()
  const spotlight = {
    athlete_user_id: athleteUserId,
    created_by_uuid: createdBy,
    org_id: orgId || null,
    team_id: teamId || null,
    type: 'spotlight',
    pinned: pin,
    created_at: now,
    expires_at: null,
    share_url: null
  }

  const { data: s, error } = await supabase.from('spotlight_edits').insert(spotlight).select('id').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ ok: true, spotlight_id: s?.id })
}
