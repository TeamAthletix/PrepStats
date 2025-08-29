// src/app/api/tokens/purchase/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Token Pack',
          },
          unit_amount: 500, // $5.00
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://prepstats.live/success',
    cancel_url: 'https://prepstats.live/cancel',
    metadata: {
      user_id: 'test_user', // Replace with dynamic user ID
    },
  });

  return NextResponse.json({ url: session.url });
}
