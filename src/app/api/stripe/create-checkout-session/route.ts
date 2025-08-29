import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function POST(req: Request) {
  const { priceId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    return NextResponse.json({ error: 'Stripe session creation failed' }, { status: 500 });
  }
}
