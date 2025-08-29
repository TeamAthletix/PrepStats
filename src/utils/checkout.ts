// /workspaces/PrepStats/src/utils/checkout.ts

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { FormEvent } from 'react'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) return

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    })

    if (error) {
      console.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Pay</button>
    </form>
  )
}
