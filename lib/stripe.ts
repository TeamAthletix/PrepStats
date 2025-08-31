import Stripe from 'stripe';
// Server-side Stripe client using the Node SDK
// STRIPE_SECRET_KEY must be set in your environment (Vercel Production/Preview)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
apiVersion: '2023-08-16',
}) as unknown as Stripe;

export default stripe;
