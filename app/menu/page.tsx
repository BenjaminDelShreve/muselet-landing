import { DigitalMenu } from "@/components/digital-menu"
import { WeekendSpecials } from "@/components/weekend-specials"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { readMenu } from "@/lib/menu"
import { readSpecials } from "@/lib/specials"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Menu | Muselet Champagne Bar",
  description: "Explore the champagne, caviar, and kitchen menu at Muselet Champagne Bar in downtown Bentonville.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menu | Muselet Champagne Bar",
    description: "Explore the champagne, caviar, and kitchen menu at Muselet Champagne Bar in downtown Bentonville.",
    type: "website",
    url: "/menu",
    siteName: "Muselet Champagne Bar",
    locale: "en_US",
  },
}

export const dynamic = "force-dynamic"

export default async function MenuPage() {
  const [menu, specials] = await Promise.all([readMenu(), readSpecials()])

  return (
    <main className="relative min-h-screen">
      <Navigation />
      <WeekendSpecials items={specials.items} />
      <DigitalMenu menu={menu} className={specials.items.length ? "pt-12" : undefined} />
      <Footer />
    </main>
  )
}
