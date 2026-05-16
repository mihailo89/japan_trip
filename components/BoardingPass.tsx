'use client'
import Image from 'next/image'
import type { Flight } from '@/lib/flights'

function PlaneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
      <path d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  )
}

function TALogo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/turkishlogo.jpg" alt="Turkish Airlines" width={32} height={32} className="object-contain" />
      <div>
        <p className="text-[10px] font-bold tracking-[0.2em] text-gray-800 leading-none">TURKISH</p>
        <p className="text-[10px] font-bold tracking-[0.2em] text-gray-800 leading-none">AIRLINES</p>
      </div>
    </div>
  )
}

function Barcode() {
  const bars = Array.from({ length: 28 }, (_, i) => ({
    h: i % 4 === 0 ? 40 : i % 3 === 0 ? 30 : i % 2 === 0 ? 20 : 35,
    w: i % 5 === 0 ? 2 : 1,
  }))
  return (
    <div className="flex items-end gap-[2px] mt-auto pt-4">
      {bars.map((b, i) => (
        <div key={i} className="bg-gray-700" style={{ width: b.w, height: b.h }} />
      ))}
    </div>
  )
}

interface BoardingPassProps {
  flight: Flight
}

export default function BoardingPass({ flight }: BoardingPassProps) {
  return (
    <div className="group w-full max-w-2xl cursor-default">
      <div
        className="
          bg-white rounded-2xl shadow-xl overflow-hidden
          transition-all duration-500
          group-hover:-translate-y-2
          group-hover:shadow-2xl group-hover:shadow-rose-200/60
        "
      >
        {/* Top red stripe */}
        <div className="h-1.5 bg-gradient-to-r from-red-700 via-red-600 to-red-700" />

        <div className="flex flex-col sm:flex-row">
          {/* ── Left: main ticket ── */}
          <div className="flex-1 p-5 sm:p-7 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <TALogo />
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Class</p>
                <p className="text-sm font-semibold text-gray-700">Economy (V)</p>
              </div>
            </div>

            {/* Route */}
            <div className="flex items-center gap-3">
              {/* Origin */}
              <div className="text-center min-w-[72px]">
                <p className="text-4xl font-bold text-gray-900 leading-none">{flight.origin}</p>
                <p className="text-[10px] text-gray-400 mt-1">{flight.originCity}</p>
                <p className="text-xl font-light text-gray-700 mt-2">{flight.departure}</p>
              </div>

              {/* Route line */}
              <div className="flex-1 flex flex-col items-center gap-1">
                <p className="text-[10px] text-gray-400 tracking-wider">1 stop · Istanbul</p>
                <div className="flex items-center w-full gap-2">
                  <div className="w-2 h-2 rounded-full border-2 border-gray-400 shrink-0" />
                  <div className="flex-1 border-t border-dashed border-gray-300 relative">
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                      <PlaneIcon />
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                </div>
                <p className="text-[10px] text-gray-400">{flight.flight1} · {flight.flight2}</p>
              </div>

              {/* Destination */}
              <div className="text-center min-w-[72px]">
                <p className="text-4xl font-bold text-gray-900 leading-none">NRT</p>
                <p className="text-[10px] text-gray-400 mt-1">Tokyo Narita</p>
                <p className="text-xl font-light text-gray-700 mt-2">
                  19:10
                  <span className="text-xs text-red-500 ml-1 align-super">+1</span>
                </p>
              </div>
            </div>

            {/* Detail row */}
            <div className="flex gap-5 text-sm border-t border-gray-100 pt-4">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Date</p>
                <p className="font-medium text-gray-800">{flight.date}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Duration</p>
                <p className="font-medium text-gray-800">{flight.duration}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Via</p>
                <p className="font-medium text-gray-800">Istanbul (IST)</p>
              </div>
            </div>
          </div>

          {/* ── Perforated divider ── */}
          <div className="relative flex flex-row sm:flex-col items-center h-6 w-full sm:h-auto sm:w-6 sm:shrink-0">
            <div className="absolute -left-3 sm:left-auto sm:-top-3 w-6 h-6 rounded-full bg-gray-50 border border-gray-100" />
            <div className="h-0 w-full border-t-2 border-dashed border-gray-200 sm:h-full sm:w-0 sm:border-t-0 sm:border-l-2" />
            <div className="absolute -right-3 sm:right-auto sm:-bottom-3 w-6 h-6 rounded-full bg-gray-50 border border-gray-100" />
          </div>

          {/* ── Right: stub ── */}
          <div className="w-full sm:w-44 p-5 sm:p-6 flex flex-col bg-white">
            <div className="mb-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Boarding</p>
              <p className="font-bold text-gray-800 text-lg">{flight.boarding}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Flight 1</p>
                <p className="font-bold text-gray-800">{flight.flight1}</p>
                <p className="text-[10px] text-gray-500">{flight.origin} → IST</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Flight 2</p>
                <p className="font-bold text-gray-800">{flight.flight2}</p>
                <p className="text-[10px] text-gray-500">IST → NRT</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Class</p>
                <p className="font-bold text-red-600">ECONOMY (V)</p>
              </div>
            </div>

            <Barcode />
          </div>
        </div>

        {/* Bottom stripe */}
        <div className="h-1.5 bg-gradient-to-r from-red-700 via-red-600 to-red-700" />
      </div>
    </div>
  )
}
