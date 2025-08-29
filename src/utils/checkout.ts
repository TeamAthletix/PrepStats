import { stripePromise } from '@/lib/stripe'

export async function initiateCheckout(userId: string, amountUsd: number, tokens: number) {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, amountUsd, tokens }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Failed to create checkout session: ${errText}`)
  }

  const { sessionId } = await res.json()
  const stripe = await stripePromise
  if (!stripe) throw new Error('Stripe initialization failed')

  const result = await stripe.redirectToCheckout({ sessionId })
  if (result?.error) throw result.error
}
