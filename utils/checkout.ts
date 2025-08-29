import { stripePromise } from '@/lib/stripe';

export async function initiateCheckout(userId: string, amountUsd: number, tokens: number) {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({ userId, amountUsd, tokens }),
    headers: { 'Content-Type': 'application/json' },
  });

  const { sessionId } = await res.json();
  const stripe = await stripePromise;
  await stripe?.redirectToCheckout({ sessionId });
}