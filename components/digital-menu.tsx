"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { MenuData, MenuItem as MenuItemType, MenuSection as MenuSectionType } from "@/lib/menu-types"

export function DigitalMenu({ menu, className }: { menu: MenuData; className?: string }) {
  return (
    <section id="menu" className={`relative py-24 px-6 bg-background ${className ?? ""}`}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl md:text-6xl text-center mb-16 text-accent"
        >
          The Muselet Menu
        </motion.h2>

        <MenuSubNavigation sections={menu.sections} />

        <div className="max-w-4xl mx-auto space-y-16">
          {menu.sections.map((section) => (
            <MenuSection key={section.id} title={section.title} id={section.id}>
              {section.groups ? (
                section.groups.map((group) => (
                  <div key={group.id} className="space-y-6">
                    <h4 className="font-serif text-xl text-primary border-b border-secondary pb-1 mb-4">
                      {group.title}
                    </h4>
                    {group.subgroups ? (
                      <div className="space-y-4">
                        {group.subgroups.map((subgroup) => (
                          <div key={subgroup.id}>
                            <h5 className="font-serif text-lg text-foreground mb-2">{subgroup.title}</h5>
                            {subgroup.items.map((item) => (
                              <MenuItem
                                key={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : (
                      group.items?.map((item) => (
                        <MenuItem
                          key={item.id}
                          name={item.name}
                          description={item.description}
                          price={item.price}
                        />
                      ))
                    )}
                  </div>
                ))
              ) : (
                section.items?.map((item: MenuItemType) => (
                  <MenuItem
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                  />
                ))
              )}
            </MenuSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function MenuSection({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.h3
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="font-serif text-3xl text-primary border-b-2 border-secondary pb-2 mb-6 relative group cursor-default"
      >
        {title}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
      </motion.h3>
      <div className="space-y-4">{children}</div>
    </motion.div>
  )
}

function MenuItem({ name, description, price }: { name: string; description?: string; price: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className="group cursor-default"
    >
      <div className="flex justify-between items-start gap-4 transition-opacity duration-300 group-hover:opacity-90">
        <div className="flex-1">
          <h4 className="font-serif text-lg text-foreground leading-tight">{name}</h4>
          {description && (
            <p className="font-serif text-sm text-muted-foreground mt-1 italic leading-relaxed">{description}</p>
          )}
        </div>
        <span className="font-serif text-lg text-accent whitespace-nowrap font-medium">{price}</span>
      </div>
    </motion.div>
  )
}

function MenuSubNavigation({ sections }: { sections: MenuSectionType[] }) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (window.innerWidth < 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const mainNavHeight = 100
      const subNavHeight = 100
      const extraPadding = 40
      const totalOffset = mainNavHeight + subNavHeight + extraPadding
      const elementRect = element.getBoundingClientRect()
      const elementPosition = elementRect.top + window.pageYOffset - totalOffset

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`sticky top-20 z-40 mb-16 transition-all duration-500 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "lg:translate-y-0 lg:opacity-100 -translate-y-full opacity-0"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-md border border-secondary/20 rounded-lg p-4 shadow-lg">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="px-3 py-2 text-sm font-serif text-primary hover:text-accent hover:bg-secondary/10 rounded-md transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
