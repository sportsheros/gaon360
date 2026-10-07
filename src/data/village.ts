/**
 * Static village data (Phase 1).
 * Replace the placeholder values below with real village details.
 * In Phase 2 this shape will be returned by the API (see services/dataService.ts).
 */
export type Localized = { hi: string; en: string }

export interface VillageProfile {
  name: Localized
  district: Localized
  block: Localized
  gramPanchayat: Localized
  state: Localized
  pincode: string
  areaHectares: number
  population: number
  families: number
  students: number
  seniorCitizens: number
  farmers: number
  youth: number
  literacyRate: number
  coordinates: { lat: number; lng: number }
}

export const village: VillageProfile = {
  name: { hi: 'सुंदरपुर', en: 'Sundarpur' },
  district: { hi: 'जिला का नाम', en: 'District Name' },
  block: { hi: 'ब्लॉक का नाम', en: 'Block Name' },
  gramPanchayat: { hi: 'ग्राम पंचायत सुंदरपुर', en: 'Gram Panchayat Sundarpur' },
  state: { hi: 'राज्य', en: 'State' },
  pincode: '000000',
  areaHectares: 860,
  population: 5240,
  families: 1120,
  students: 780,
  seniorCitizens: 310,
  farmers: 640,
  youth: 1450,
  literacyRate: 72,
  coordinates: { lat: 26.9124, lng: 75.7873 },
}

export type StatKey = 'population' | 'families' | 'students' | 'seniorCitizens' | 'farmers' | 'youth'

export const statKeys: StatKey[] = ['population', 'families', 'students', 'seniorCitizens', 'farmers', 'youth']

export type LandmarkId = 'school' | 'panchayat' | 'health' | 'pond' | 'farms' | 'playground' | 'market' | 'community'

/** Clickable landmarks in the 3D village. Text lives in locales under village3d.locations.<id>. */
export interface Landmark {
  id: LandmarkId
  position: [number, number, number]
  color: string
  facts: { key: string; value: string | number }[]
}

export const landmarks: Landmark[] = [
  {
    id: 'school',
    position: [-6, 0, -4],
    color: '#f59e0b',
    facts: [
      { key: 'students', value: 186 },
      { key: 'teachers', value: 7 },
      { key: 'rooms', value: 8 },
    ],
  },
  {
    id: 'panchayat',
    position: [0, 0, -7],
    color: '#38bdf8',
    facts: [
      { key: 'wards', value: 11 },
      { key: 'meetings', value: 12 },
    ],
  },
  {
    id: 'health',
    position: [6.5, 0, -4],
    color: '#f43f5e',
    facts: [
      { key: 'staff', value: 3 },
      { key: 'beds', value: 4 },
    ],
  },
  {
    id: 'pond',
    position: [-7, 0, 5],
    color: '#22d3ee',
    facts: [{ key: 'area', value: '1.2 ha' }],
  },
  {
    id: 'farms',
    position: [9, 0, 7],
    color: '#84cc16',
    facts: [
      { key: 'farmers', value: 640 },
      { key: 'crops', value: 4 },
    ],
  },
  {
    id: 'playground',
    position: [1, 0, 7],
    color: '#10b981',
    facts: [{ key: 'area', value: '0.8 ha' }],
  },
  {
    id: 'market',
    position: [6, 0, 1.5],
    color: '#fb923c',
    facts: [{ key: 'shops', value: 24 }],
  },
  {
    id: 'community',
    position: [-2.5, 0, 2.5],
    color: '#a78bfa',
    facts: [{ key: 'capacity', value: 300 }],
  },
]

export const galleryItems = [
  { id: 'village', hue: 35, icon: 'Home' },
  { id: 'school', hue: 200, icon: 'School' },
  { id: 'roads', hue: 220, icon: 'Route' },
  { id: 'fields', hue: 95, icon: 'Wheat' },
  { id: 'events', hue: 15, icon: 'PartyPopper' },
  { id: 'community', hue: 270, icon: 'Users' },
] as const
