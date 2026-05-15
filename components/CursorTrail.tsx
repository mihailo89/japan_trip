'use client'
import { useEffect } from 'react'

const COLORS = ['#FFB7C5', '#FF85A1', '#FFC4D0', '#E8A5B5']

function spawnPetal(x: number, y: number) {
  const el = document.createElement('div')
  el.className = 'cursor-petal'
  const size = 10 + Math.random() * 12
  el.style.cssText = `
    left: ${x - size / 2}px;
    top: ${y - size / 2}px;
    width: ${size}px;
    height: ${size}px;
  `
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  const angle = Math.random() * 360

  el.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(${angle}deg)">
    ${[0,72,144,216,288].map(a => `<ellipse cx="50" cy="30" rx="12" ry="22" fill="${color}" opacity="0.8" transform="rotate(${a} 50 50)"/>`).join('')}
    <circle cx="50" cy="50" r="7" fill="#FFF5A0" opacity="0.9"/>
  </svg>`

  document.body.appendChild(el)
  setTimeout(() => el.remove(), 900)
}

export default function CursorTrail() {
  useEffect(() => {
    let last = 0
    const onMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - last < 60) return
      last = now
      spawnPetal(e.clientX, e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return null
}
