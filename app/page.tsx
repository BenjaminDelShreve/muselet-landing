import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { DigitalMenu } from "@/components/digital-menu"
import { Hours } from "@/components/hours"
import { Footer } from "@/components/footer"
import { Bubbles } from "@/components/bubbles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Muselet Champagne Bar - Bentonville's Premier Champagne Destination",
  description: "Experience the finest champagne and caviar in Bentonville, Arkansas. Reserve your table for an intimate champagne experience.",
  openGraph: {
    title: "Muselet Champagne Bar",
    description: "Bentonville's premier champagne destination. Reserve your table today.",
    type: "website",
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

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Bubbles />
      <Navigation />
      <Hero />
      <About />
      <DigitalMenu />
      <Hours />
      <Footer />
    </main>
  )
}
