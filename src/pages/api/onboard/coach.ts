// src/pages/api/onboard/coach.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { name, team, email } = req.body

  if (!name || !team || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // TODO: Inject DB logic here
  console.log('Coach onboarded:', { name, team, email })

  return res.status(200).json({ success: true })
}
