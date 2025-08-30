import { NextApiRequest, NextApiResponse } from 'next'
import stripe from '../../lib/stripeServer'

export const config = {
  api: {
    bodyParser: false,
  },
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  let event;

  try {
    const buffers: Uint8Array[] = [];
    for await (const chunk of req) {
      buffers.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const rawBody = Buffer.concat(buffers);
    const sig = req.headers['stripe-signature'] as string;
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle token purchase event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    let tokens = 0;

    // Get tokens from line_items (if available)
    try {
      // You may need to fetch line items if not expanded
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      tokens = lineItems.data.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    } catch (err) {
      console.warn('Could not fetch line items:', err);
    }

    // Fallback: Try from metadata if you set tokens there
    if (!tokens) {
      tokens = Number(session.metadata?.tokens || 0);
    }

    // TODO: Credit tokens to user in your database
    console.log(`User ${userId} purchased ${tokens} tokens.`);

    // Example:
    // await creditTokensToUser(userId, tokens);

    // Optionally, send confirmation email or other post-payment actions
  }

  res.status(200).json({ received: true });
}