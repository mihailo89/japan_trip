'use client'
import { useState } from 'react'
import SakuraPetals from '@/components/SakuraPetals'
import CountdownFlip from '@/components/CountdownFlip'
import BoardingPass from '@/components/BoardingPass'
import CursorTrail from '@/components/CursorTrail'
import { flights, type FlightId } from '@/lib/flights'

export default function Home() {
  const [selectedId, setSelectedId] = useState<FlightId>('beg')
  const flight = flights[selectedId]

  return (
    <main className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Falling petals (behind everything) */}
      <SakuraPetals />

      {/* Cursor petal trail */}
      <CursorTrail />

      {/* Japanese sun motif */}
      <div
        aria-hidden
        className="fixed top-0 right-0 rounded-full bg-red-600/75 -translate-y-1/3 translate-x-1/3 pointer-events-none"
        style={{ width: 'min(420px, 42vw)', height: 'min(420px, 42vw)' }}
      />
      <div
        aria-hidden
        className="fixed top-0 right-0 rounded-full border border-red-600/10 -translate-y-1/4 translate-x-1/4 pointer-events-none"
        style={{ width: 'min(280px, 28vw)', height: 'min(280px, 28vw)' }}
      />

      {/* ── Hero / Countdown ── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 gap-10">
        {/* Route title */}
        <div className="text-center space-y-2">
          <h1 className="mb-5 text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: '"Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif' }}>
            日本旅行
          </h1>

          {/* Flight selector toggle */}
          <div className="flex justify-center mb-2">
            <div className="flex bg-gray-100 p-1 rounded-full gap-1">
              {(['beg', 'ams'] as FlightId[]).map((id) => (
                <button
                  key={id}
                  onClick={() => setSelectedId(id)}
                  className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                    selectedId === id
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {flights[id].origin}
                </button>
              ))}
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-6xl font-light text-gray-800 tracking-tight">
            {flight.originCity}{' '}
            <span className="text-red-600 font-normal">→</span>{' '}
            Tokyo
          </h2>
          <p className="text-sm text-gray-500 font-light tracking-widest">
            11. novembar 2026 &nbsp;·&nbsp; {flight.departure} {flight.origin}
          </p>
        </div>

        {/* Countdown */}
        <CountdownFlip targetDate={flight.targetDate} />

        <p className="text-[11px] uppercase tracking-[0.4em] text-gray-600">do poletanja</p>

        {/* Scroll hint */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1 text-red-600 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">boarding pass</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ── Boarding Pass ── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24 gap-8">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Karta za avion</p>
          <h2 className="text-2xl font-light text-gray-700">Boarding Pass</h2>
        </div>

        <BoardingPass flight={flight} />

        <p className="text-rose-300 text-2xl select-none">🌸 🌸 🌸</p>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-gray-300 text-xs tracking-widest">
        ✈ {flight.origin} → IST → NRT &nbsp;·&nbsp; Turkish Airlines {flight.flight1} / {flight.flight2}
      </footer>
    </main>
  )
}
