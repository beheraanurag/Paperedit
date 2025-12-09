import type { VercelRequest } from '@vercel/node'
import jwt from 'jsonwebtoken'

export interface AuthUser {
  id: string
  email: string
  role: string
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const secret = process.env.JWT_SECRET || ''
    const decoded = jwt.verify(token, secret) as AuthUser
    return decoded
  } catch (error) {
    return null
  }
}

export function getAuthUser(request: VercelRequest): AuthUser | null {
  const authHeader = request.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  const token = authHeader.substring(7)
  return verifyToken(token)
}

export function requireAuth(request: VercelRequest): AuthUser {
  const user = getAuthUser(request)
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export function requireAdmin(request: VercelRequest): AuthUser {
  const user = requireAuth(request)
  if (user.role !== 'admin') {
    throw new Error('Forbidden')
  }
  return user
}
