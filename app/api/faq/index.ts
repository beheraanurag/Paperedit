import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from '@/lib/db/index.js'
import { faqs } from '@/lib/db/schema.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const faqsList = db.select().from(faqs).all()
    return res.status(200).json({
      success: true,
      data: faqsList,
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch FAQs' })
  }
}
