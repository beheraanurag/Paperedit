import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from '@/lib/db/index.js'
import { users } from '@/lib/db/schema.js'
import { getAuthUser } from '@/lib/middleware/auth.js'
import { eq } from 'drizzle-orm'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authUser = getAuthUser(req)
    if (!authUser) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const userList = db.select().from(users).where(eq(users.id, authUser.id)).limit(1).all()
    if (userList.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = userList[0]
    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to get profile' })
  }
}
