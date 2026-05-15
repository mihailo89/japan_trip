'use client'
import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: number
  size: number
  dur: string
  delay: string
  sway: string
  spin: string
  hue: string
}

const PETAL_COLORS = ['#FFB7C5', '#FF85A1', '#FFC4D0', '#E8A5B5', '#FFCDD9']

function SakuraSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="50" cy="30" rx="12" ry="22"
          fill={color}
          opacity="0.82"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="7" fill="#FFF5A0" opacity="0.9" />
    </svg>
  )
}

export default function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    setPetals(
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        dur: `${7 + Math.random() * 8}s`,
        delay: `${Math.random() * 12}s`,
        sway: `${(Math.random() - 0.5) * 140}px`,
        spin: `${360 + Math.random() * 360}deg`,
        hue: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura-petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            '--dur': p.dur,
            '--delay': p.delay,
            '--sway': p.sway,
            '--spin': p.spin,
          } as React.CSSProperties}
        >
          <SakuraSVG color={p.hue} />
        </div>
      ))}
    </div>
  )
}
