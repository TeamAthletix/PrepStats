// pages/api/stripe-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyWebhookSignature } from '@upstash/stripe-webhook';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return res.status(500).send("Server misconfigured");
  }

  const sig = req.headers['stripe-signature'];
  const isValid = verifyWebhookSignature(req.body, sig as string, webhookSecret);

  if (!isValid) {
    return res.status(400).send("Invalid signature");
  }

  return res.status(200).send("Webhook received");
}

