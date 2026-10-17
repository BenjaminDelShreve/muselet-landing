import { NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { readSpecials, writeSpecials, type SpecialsData } from "@/lib/specials"

export async function GET() {
  try {
    const specials = await readSpecials()
    return NextResponse.json(specials)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load specials"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = (await request.json()) as SpecialsData

    if (!body || !Array.isArray(body.items)) {
      return NextResponse.json({ error: "Invalid specials data" }, { status: 400 })
    }

    await writeSpecials(body)
    return NextResponse.json({ ok: true, specials: body })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save specials"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
