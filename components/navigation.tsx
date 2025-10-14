"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      const navHeight = 100 // Account for fixed navigation bar
      const elementPosition = element.offsetTop - navHeight
      
      // Slower, more elegant scroll with custom timing
      const startPosition = window.pageYOffset
      const distance = elementPosition - startPosition
      const duration = 1200 // Slower scroll duration (1.2 seconds)
      let startTime: number | null = null
      
      const easeOutSine = (t: number): number => {
        return Math.sin((t * Math.PI) / 2)
      }
      
      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeOutSine(progress)
        
        window.scrollTo(0, startPosition + distance * ease)
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }
      
      requestAnimationFrame(animateScroll)
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

        {/* Desktop Navigation */}
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

        {/* Desktop Reserve Button */}
        <Button asChild className="hidden md:flex bg-[#AF911C] text-[#303030] hover:bg-[#AF911C]/90 font-medium tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#AF911C]/25">
          <Link
            href="https://www.exploretock.com/muselet-champagne-bar-bentonville"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve Now
          </Link>
        </Button>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`w-6 h-0.5 bg-[#FDF8F0] transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#FDF8F0] transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#FDF8F0] transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#063B29]/98 backdrop-blur-md border-t border-[#AF911C]/20">
          <div className="container mx-auto px-6 py-6 space-y-4">
            <button
              onClick={() => {
                scrollToSection('home')
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
            >
              Home
            </button>
            <button
              onClick={() => {
                scrollToSection('about')
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
            >
              About
            </button>
            <button
              onClick={() => {
                scrollToSection('menu')
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
            >
              Menu
            </button>
            <Link
              href="https://www.exploretock.com/muselet-champagne-bar-bentonville"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reservations
            </Link>
            <button
              onClick={() => {
                scrollToSection('hours')
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
            >
              Hours
            </button>
            <button
              onClick={() => {
                scrollToSection('contact')
                setIsMobileMenuOpen(false)
              }}
              className="block w-full text-left text-[#FDF8F0] hover:text-[#AF911C] transition-colors text-lg tracking-wider uppercase py-2"
            >
              Contact
            </button>
            <div className="pt-4 border-t border-[#AF911C]/20">
              <Button asChild className="w-full bg-[#AF911C] text-[#303030] hover:bg-[#AF911C]/90 font-medium tracking-wide transition-all duration-300">
                <Link
                  href="https://www.exploretock.com/muselet-champagne-bar-bentonville"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reserve Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
