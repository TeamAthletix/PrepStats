import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // your checkout logic here
}
