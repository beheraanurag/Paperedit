import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from '@/lib/db/index.js'
import { blogs } from '@/lib/db/schema.js'
import { eq } from 'drizzle-orm'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { id } = req.query

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Blog ID is required' })
    }

    const blogList = db.select().from(blogs).where(eq(blogs.id, id)).limit(1).all()

    if (blogList.length === 0) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    return res.status(200).json({
      success: true,
      data: blogList[0],
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch blog' })
  }
}
