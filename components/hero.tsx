"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/muselet-video-1-vtECnqr85wnVLeXkx5COPlVDCEtz4n.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[#063B29]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          className="text-6xl md:text-8xl font-light mb-6 text-[#FDF8F0] tracking-wide"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          Muselet
        </h1>
        <p className="text-xl md:text-2xl text-[#FDF8F0] mb-4 tracking-wider uppercase font-light">Champagne Bar</p>
        <p className="text-lg text-[#FDF8F0]/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          An intimate champagne experience in the heart of Bentonville, Arkansas
        </p>
        <Button
          asChild
          size="lg"
          className="bg-[#AF911C] text-[#303030] hover:bg-[#AF911C]/90 font-medium tracking-wide text-lg px-12 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#AF911C]/25"
        >
          <Link
            href="/reservations"
          >
            Reserve Your Table
          </Link>
        </Button>
      </div>
    </section>
  )
}
