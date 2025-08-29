'use client';

import { useState } from 'react';

export default function StripeButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ priceId }),
    });

    const { sessionId } = await res.json();
    window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Redirecting…' : 'Subscribe'}
    </button>
  );
}
