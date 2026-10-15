"use client"

import { motion } from "framer-motion"
import type { SpecialItem } from "@/lib/specials-types"

export function WeekendSpecials({ items }: { items: SpecialItem[] }) {
  if (!items.length) return null

  return (
    <section className="relative px-6 pt-28 pb-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative overflow-hidden border border-accent/50 bg-primary text-primary-foreground">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--accent) 0%, transparent 45%, transparent 55%, var(--accent) 100%)",
            }}
          />
          <div className="relative px-6 py-8 md:px-10 md:py-10">
            <p className="font-serif text-xs md:text-sm uppercase tracking-[0.25em] text-accent mb-2">
              Limited · This Weekend Only
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-accent mb-8">This Weekend&apos;s Specials</h2>

            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start gap-4 border-t border-accent/25 pt-5 first:border-t-0 first:pt-0">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg md:text-xl text-primary-foreground leading-tight">{item.name}</h3>
                    {item.description && (
                      <p className="font-serif text-sm text-primary-foreground/70 mt-1 italic leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="font-serif text-lg md:text-xl text-accent whitespace-nowrap font-medium">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
