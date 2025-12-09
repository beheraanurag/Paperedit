import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from '@/lib/db/index.js'
import { blogs } from '@/lib/db/schema.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const blogsList = await db.select().from(blogs).orderBy(blogs.createdAt)
    return res.status(200).json({
      success: true,
      data: blogsList,
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch blogs' })
  }
}
