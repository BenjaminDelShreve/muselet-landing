import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

import "./globals.css"
import { buildLocalBusinessSchema } from "@/lib/structured-data"

export const metadata = {
  metadataBase: new URL("https://www.museletchampagnebar.com"),
  title: "Muselet Champagne Bar",
  description: "Champagne, caviar, and elegance in the heart of Bentonville.",
  openGraph: {
    title: "Muselet Champagne Bar",
    description: "Explore our curated champagne menu and reserve your table.",
    type: "website",
    locale: "en_US",
    siteName: "Muselet Champagne Bar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muselet Champagne Bar",
    description: "Bentonville's premiere champagne destination.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-serif antialiased" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()).replace(/</g, "\\u003c") }}
        />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
