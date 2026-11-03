import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { DigitalMenu } from "@/components/digital-menu"
import { Hours } from "@/components/hours"
import { Footer } from "@/components/footer"
import { Bubbles } from "@/components/bubbles"
import { readMenu } from "@/lib/menu"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Muselet | Champagne Bar & Kitchen in Downtown Bentonville | Fried Chicken, Oysters, Caviar & Brunch",
  description:
    "Downtown Bentonville champagne bar serving oysters, caviar, fried chicken, and weekend brunch. Reserve your table at Muselet.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Muselet Champagne Bar",
    description: "Bentonville's premier champagne destination. Reserve your table today.",
    type: "website",
    url: "/",
    siteName: "Muselet Champagne Bar",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muselet Champagne Bar",
    description: "Bentonville's premier champagne destination. Reserve your table today.",
  },
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/png",
  },
}

export default async function Home() {
  const menu = await readMenu()

  return (
    <main className="relative min-h-screen">
      <Bubbles />
      <Navigation />
      <Hero />
      <About />
      <DigitalMenu menu={menu} />
      <Hours />
      <Footer />
    </main>
  )
}
