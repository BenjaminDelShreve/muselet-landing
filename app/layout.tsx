import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

import "./globals.css"

export const metadata = {
  metadataBase: new URL("https://your-vercel-domain.vercel.app"), // 👈 we'll update this later
  title: "Muselet Champagne Bar",
  description: "Champagne, caviar, and elegance in the heart of Bentonville.",
  openGraph: {
    title: "Muselet Champagne Bar",
    description: "Explore our curated champagne menu and reserve your table.",
    type: "website",
    locale: "en_US",
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
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
