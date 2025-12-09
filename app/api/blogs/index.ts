import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from '@/lib/db/index.js'
import { blogs } from '@/lib/db/schema.js'
import { desc } from 'drizzle-orm'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const blogsList = db.select().from(blogs).orderBy(desc(blogs.createdAt)).all()
    return res.status(200).json({
      success: true,
      data: blogsList,
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch blogs' })
  }
}
