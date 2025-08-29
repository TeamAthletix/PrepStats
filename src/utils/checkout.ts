// Ensure Stripe is initialized from your existing setup
import { stripePromise } from '@/lib/stripe';

/**
 * Initiates a Stripe Checkout session for purchasing tokens.
 * @param userId - the user id making the purchase
 * @param amountUsd - total amount in USD for the checkout
 * @param tokens - number of tokens being purchased
 */
export async function initiateCheckout(
  userId: string,
  amountUsd: number,
  tokens: number
) {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, amountUsd, tokens }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to create checkout session: ${errText}`);
  }

  const { sessionId } = await res.json();

  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe initialization failed');
  }

  const result = await stripe.redirectToCheckout({ sessionId });
  if (result?.error) {
    throw result.error;
  }
}
