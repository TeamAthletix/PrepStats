import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: { persistSession: true, detectSessionInUrl: true, autoRefreshToken: true }
  }
)

export async function getBalance(userId: string) {
  const { data } = await supabase
    .from('token_accounts')
    .select('balance')
    .eq('user_id', userId)
    .single()
  return data?.balance ?? 0
}

export async function spendTokens(userId: string, cost: number) {
  const balance = await getBalance(userId)
  if (balance < cost) throw new Error('Insufficient tokens')
  await supabase
    .from('token_accounts')
    .update({ balance: balance - cost })
    .eq('user_id', userId)
  await supabase
    .from('token_spends')
    .insert({
      user_id: userId,
      item_id: 1,
      tokens_spent: cost,
      activity_id: `monetize:${Date.now()}`
    })
}
