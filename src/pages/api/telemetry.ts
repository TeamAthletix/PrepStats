import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { userId, sessionId, eventType } = req.body

  if (!userId || !sessionId || !eventType) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  console.log('[Telemetry]', { userId, sessionId, eventType })

  res.status(200).json({ status: 'ok' })
}
