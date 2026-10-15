import { NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, createSessionToken, verifyPassword } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const password = typeof body.password === "string" ? body.password : ""

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Admin password is not configured. Set ADMIN_PASSWORD in your environment." },
        { status: 500 },
      )
    }

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
    }

    const response = NextResponse.json({ ok: true })
    response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // Session cookie — cleared when the browser session ends
    })
    return response
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
