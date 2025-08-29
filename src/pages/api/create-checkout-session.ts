import { NextApiRequest, NextApiResponse } from 'next'
import stripe from '../../lib/stripeServer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { userId, amountUsd, tokens } = req.body

    if (typeof userId !== 'string' || typeof amountUsd !== 'number' || typeof tokens !== 'number') {
      return res.status(400).json({ error: 'Invalid request payload' })
    }

    const pricePerTokenCents = Math.round((amountUsd * 100) / tokens)
    if (pricePerTokenCents <= 0) {
      return res.status(400).json({ error: 'Invalid token pricing' })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Purchase ${tokens} Tokens` },
            unit_amount: pricePerTokenCents,
          },
          quantity: tokens,
        },
      ],
      metadata: { userId },
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`
    })

    return res.status(200).json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return res.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}