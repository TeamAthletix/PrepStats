// /workspaces/PrepStats/src/components/TokenPurchase.tsx

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../utils/checkout'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function TokenPurchase() {
  const [clientSecret, setClientSecret] = useState('')

  // Fetch client secret from backend
  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const appearance = { theme: 'stripe' }
  const options = { clientSecret, appearance }

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
