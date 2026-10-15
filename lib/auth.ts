import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export const ADMIN_SESSION_COOKIE = "muselet_admin_session"

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    throw new Error("ADMIN_PASSWORD environment variable is not set")
  }
  return password
}

export function createSessionToken(): string {
  return createHmac("sha256", getAdminPassword()).update("muselet-admin-session").digest("hex")
}

export function verifyPassword(password: string): boolean {
  try {
    const expected = getAdminPassword()
    const a = Buffer.from(password)
    const b = Buffer.from(expected)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false
  try {
    const expected = createSessionToken()
    const a = Buffer.from(token)
    const b = Buffer.from(expected)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  return verifySessionToken(token)
}
