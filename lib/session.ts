import { cookies } from 'next/headers'
import { createHmac } from 'crypto'

const SESSION_COOKIE_NAME = 'veda_session'
const SESSION_MAX_AGE = 30 * 24 * 60 * 60 // 30 days in seconds

export interface SessionPayload {
  userId: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  loginAt: string
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters')
  }
  return secret
}

function sign(payload: string): string {
  const secret = getSessionSecret()
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

function encodePayload(payload: SessionPayload): string {
  const jsonString = JSON.stringify(payload)
  const base64Payload = Buffer.from(jsonString).toString('base64url')
  const signature = sign(base64Payload)
  return `${base64Payload}.${signature}`
}

function decodeSession(token: string): SessionPayload | null {
  try {
    const [base64Payload, signature] = token.split('.')
    if (!base64Payload || !signature) {
      return null
    }

    // Verify signature
    const expectedSignature = sign(base64Payload)
    if (signature !== expectedSignature) {
      return null
    }

    // Decode payload
    const jsonString = Buffer.from(base64Payload, 'base64url').toString('utf-8')
    const payload = JSON.parse(jsonString) as SessionPayload

    // Validate required fields
    if (!payload.userId || !payload.email || !payload.role) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export async function setSessionCookie(payload: SessionPayload): Promise<void> {
  const token = encodePayload(payload)
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
}

export async function getSessionFromCookie(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!token) {
      return null
    }

    return decodeSession(token)
  } catch {
    return null
  }
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
