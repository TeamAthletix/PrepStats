import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import stripe from '../../../lib/stripe'; // default export from lib/stripe.ts

// Disable Next.js body parsing for the webhook endpoint
export const config = {
api: {
bodyParser: false,
},
};

// Webhook endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== 'POST') {
res.setHeader('Allow', 'POST');
return res.status(405).end('Method Not Allowed');
}

const sig = req.headers['stripe-signature'] as string | undefined;
if (!sig) {
return res.status(400).send('Missing Stripe signature header');
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const buf = await buffer(req);
const payload = buf.toString();

let event: stripe.Event;

try {
event = (stripe as any).webhooks.constructEvent(payload, sig, webhookSecret);
} catch (err: any) {
return res
.status(400)
.send(Webhook Error: ${err.message ?? 'Unknown error'});
}

// Handle events you care about
switch (event.type) {
case 'payment_intent.succeeded':
// Implement your logic here
break;

default:
  console.log(`Unhandled event type ${event.type}`);
}

res.json({ received: true });
}
