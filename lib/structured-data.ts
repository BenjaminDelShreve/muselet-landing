import { BRUNCH_HOURS, HOURS } from "@/lib/hours"

export const SITE_URL = "https://www.museletchampagnebar.com"

function to24Hour(value: string): string {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) throw new Error(`Unrecognized time format: ${value}`)
  let hours = Number(match[1]) % 12
  if (match[3].toUpperCase() === "PM") hours += 12
  return `${String(hours).padStart(2, "0")}:${match[2]}`
}

function toSpecification(day: string, time: string, name?: string) {
  const [opens, closes] = time.split(/\s*[–-]\s*/)
  return {
    "@type": "OpeningHoursSpecification",
    ...(name ? { name } : {}),
    dayOfWeek: day,
    opens: to24Hour(opens),
    closes: to24Hour(closes),
  }
}

function buildOpeningHoursSpecification() {
  return [
    ...HOURS.filter((entry) => entry.time !== "Closed").map((entry) => toSpecification(entry.day, entry.time)),
    ...BRUNCH_HOURS.map((entry) => toSpecification(entry.day, entry.time, "Brunch")),
  ]
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["BarOrPub", "Restaurant"],
    name: "Muselet Champagne Bar",
    url: SITE_URL,
    telephone: "+1-479-553-7001",
    address: {
      "@type": "PostalAddress",
      streetAddress: "406 SE 5th St Suite 4",
      addressLocality: "Bentonville",
      addressRegion: "AR",
      postalCode: "72712",
      addressCountry: "US",
    },
    description: "Champagne, caviar, and elegance in the heart of Bentonville.",
    servesCuisine: "American",
    acceptsReservations: true,
    hasMenu: `${SITE_URL}/menu`,
    sameAs: ["https://www.instagram.com/muselet.nwa/"],
    openingHoursSpecification: buildOpeningHoursSpecification(),
    image: `${SITE_URL}/menu/muselet-stemware.HEIC.jpeg`,
    logo: `${SITE_URL}/muselet-logo.png`,
  }
}
