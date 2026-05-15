'use client'
import { useEffect, useRef, useState } from 'react'

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  const totalSec = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  }
}

function pad(n: number, len = 2) {
  return String(n).padStart(len, '0')
}

interface FlipDigitProps {
  digit: string
}

function FlipDigit({ digit }: FlipDigitProps) {
  const prevRef = useRef(digit)
  const [display, setDisplay] = useState(digit)
  const [prev, setPrev] = useState(digit)
  const [phase, setPhase] = useState<'idle' | 'down' | 'up'>('idle')

  useEffect(() => {
    if (digit === prevRef.current) return
    setPrev(prevRef.current)
    prevRef.current = digit
    setPhase('down')

    const t1 = setTimeout(() => {
      setDisplay(digit)
      setPhase('up')
    }, 280)
    const t2 = setTimeout(() => setPhase('idle'), 560)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [digit])

  const tileBase =
    'absolute inset-0 flex items-center justify-center text-xl sm:text-4xl md:text-5xl font-mono font-bold text-amber-50 select-none'

  return (
    <div className="relative w-8 h-11 sm:w-12 sm:h-16 md:w-16 md:h-20" style={{ perspective: '250px' }}>
      <div className="absolute inset-0 bg-gray-900 rounded-lg shadow-lg" />

      <div className={tileBase} style={{ clipPath: 'inset(50% 0 0 0)' }}>
        {display}
      </div>

      {phase === 'idle' && (
        <div className={tileBase} style={{ clipPath: 'inset(0 0 50% 0)' }}>
          {display}
        </div>
      )}

      {phase === 'down' && (
        <div
          className={`${tileBase} flap-down bg-gray-900 rounded-t-lg`}
          style={{ clipPath: 'inset(0 0 50% 0)', transformOrigin: 'bottom center' }}
        >
          {prev}
        </div>
      )}

      {phase === 'up' && (
        <div
          className={`${tileBase} flap-up bg-gray-800 rounded-b-lg`}
          style={{ clipPath: 'inset(50% 0 0 0)', transformOrigin: 'top center' }}
        >
          {display}
        </div>
      )}

      <div className="absolute inset-x-0 top-1/2 h-px bg-black/40 z-10 pointer-events-none" />
    </div>
  )
}

function DigitGroup({ value, label, digits = 2 }: { value: number; label: string; digits?: number }) {
  const str = pad(value, digits)
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-3">
      <div className="flex gap-1 sm:gap-1.5">
        {str.split('').map((ch, i) => (
          <FlipDigit key={i} digit={ch} />
        ))}
      </div>
      <span className="text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-400 font-medium">{label}</span>
    </div>
  )
}

function Separator() {
  return (
    <div className="flex flex-col gap-1.5 pb-6 sm:pb-8">
      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-400" />
      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-400" />
    </div>
  )
}

interface CountdownFlipProps {
  targetDate: Date
}

export default function CountdownFlip({ targetDate }: CountdownFlipProps) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null)

  useEffect(() => {
    setTime(getTimeLeft(targetDate))
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (!time) return <div className="flex items-end gap-2 sm:gap-4 md:gap-8 opacity-0 select-none" aria-hidden />

  return (
    <div className="flex items-end gap-2 sm:gap-4 md:gap-8">
      <DigitGroup value={time.days}    label="dana"    digits={3} />
      <Separator />
      <DigitGroup value={time.hours}   label="sati"    digits={2} />
      <Separator />
      <DigitGroup value={time.minutes} label="minuta"  digits={2} />
      <Separator />
      <DigitGroup value={time.seconds} label="sekundi" digits={2} />
    </div>
  )
}
