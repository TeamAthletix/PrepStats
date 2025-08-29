import { NextRequest } from 'next/server';
import { buffer } from 'micro';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // TODO: Replace with actual Stripe signature verification
  const stripeSignature = req.headers.get('stripe-signature');

  if (!stripeSignature) {
    return new Response('Missing Stripe signature', { status: 400 });
  }

  // TODO: Replace with actual event handling logic
  console.log('Received raw Stripe webhook:', rawBody);

  return new Response('Webhook received', { status: 200 });
}
