"use client"

import { useEffect, useState } from "react"

export function Bubbles() {
  const [bubbles, setBubbles] = useState<
    Array<{ id: number; left: number; delay: number; duration: number; size: number }>
  >([])

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      size: 2 + Math.random() * 4,
    }))
    setBubbles(newBubbles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble absolute rounded-full bg-[#AF911C]/20 backdrop-blur-sm"
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
