import { NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { readMenu, writeMenu, type MenuData } from "@/lib/menu"

export async function GET() {
  try {
    const menu = await readMenu()
    return NextResponse.json(menu)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load menu"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = (await request.json()) as MenuData

    if (!body || !Array.isArray(body.sections)) {
      return NextResponse.json({ error: "Invalid menu data" }, { status: 400 })
    }

    await writeMenu(body)
    return NextResponse.json({ ok: true, menu: body })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save menu"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
