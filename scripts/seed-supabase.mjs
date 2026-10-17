/**
 * Re-seed menu_items + specials from scripts/seed-data.json
 *
 * Prerequisites:
 * 1. Env vars in .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * 2. Tables exist (run supabase/schema.sql once, or this will fail)
 *
 * Usage: npm run seed:supabase
 */

import { createClient } from "@supabase/supabase-js"
import { readFileSync, existsSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

function loadEnvLocal() {
  const envPath = resolve(root, ".env.local")
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvLocal()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  )
  process.exit(1)
}

const { menuRows, specialRows } = JSON.parse(
  readFileSync(resolve(root, "scripts/seed-data.json"), "utf8"),
)

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

async function replaceTable(table, rows) {
  const { error: delError } = await supabase.from(table).delete().neq("id", "")
  if (delError) throw new Error(`Clear ${table}: ${delError.message}`)
  if (!rows.length) return
  const { error: insError } = await supabase.from(table).insert(rows)
  if (insError) throw new Error(`Insert ${table}: ${insError.message}`)
}

try {
  await replaceTable("menu_items", menuRows)
  await replaceTable("specials", specialRows)
  console.log(`Seeded ${menuRows.length} menu_items and ${specialRows.length} specials.`)
} catch (err) {
  console.error(err.message || err)
  console.error(
    "\nIf the table is missing, run supabase/schema.sql in the Supabase SQL Editor first.",
  )
  process.exit(1)
}
