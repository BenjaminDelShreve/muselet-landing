"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#063B29]/95 backdrop-blur-sm py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/muselet-wordmark-gold-HZuSjdZS0lkOgC2xLtccmmnimnlG4O.png"
            alt="Muselet"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('home')}
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            Menu
          </button>
          <Link
            href="https://www.exploretock.com/muselet-champagne-bar-bentonville"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            Reservations
          </Link>
          <button
            onClick={() => scrollToSection('hours')}
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            Hours
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-sm tracking-wider uppercase"
          >
            Contact
          </button>
        </div>

        <Button asChild className="bg-[#AF911C] text-[#303030] hover:bg-[#AF911C]/90 font-medium tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#AF911C]/25">
          <Link
            href="https://www.exploretock.com/muselet-champagne-bar-bentonville"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve Now
          </Link>
        </Button>
      </div>
    </nav>
  )
}
