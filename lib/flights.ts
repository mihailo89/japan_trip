export type FlightId = 'beg' | 'ams'

export interface Flight {
  id: FlightId
  label: string
  origin: string
  originCity: string
  targetDate: Date
  departure: string
  boarding: string
  date: string
  duration: string
  flight1: string
  flight2: string
}

export const flights: Record<FlightId, Flight> = {
  beg: {
    id: 'beg',
    label: 'Belgrade',
    origin: 'BEG',
    originCity: 'Belgrade',
    targetDate: new Date('2026-11-11T20:15:00+01:00'),
    departure: '20:15',
    boarding: '19:45',
    date: 'Wed, 11 Nov 2026',
    duration: '14h 55m',
    flight1: 'TK1084',
    flight2: 'TK0300',
  },
  ams: {
    id: 'ams',
    label: 'Amsterdam',
    origin: 'AMS',
    originCity: 'Amsterdam',
    targetDate: new Date('2026-11-11T18:45:00+01:00'),
    departure: '18:45',
    boarding: '18:15',
    date: 'Wed, 11 Nov 2026',
    duration: '16h 25m',
    flight1: 'TK1954',
    flight2: 'TK0300',
  },
}
