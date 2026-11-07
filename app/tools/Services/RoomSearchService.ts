import { homefyInstance } from './configAxios'
import type { roomObjectType } from '@/common/types/RoomTypes'

export type SearchRoom = Omit<roomObjectType, 'date_available' | 'lat' | 'lon'> & {
  date_available: string | number | null
  num_bed?: number
  lat?: number | null
  lon?: number | null
}

export interface RoomSearchRequest {
  location: string
  checkIn: string
  checkOut: string
  minPrice: number
  maxPrice: number
  numGuests: number
  numBed: number
  page: number
  pageSize: number
  amenities: string[]
  sort: 'PRICE_ASC' | 'PRICE_DESC'
}

export interface RoomSearchFilters {
  location: string
  checkIn: string
  checkOut: string
  minPrice: number
  maxPrice: number
  guests: string
  beds: string
  amenities: string[]
  sort: 'asc' | 'desc'
}

export function buildRoomSearchRequest(filters: RoomSearchFilters, page: number, pageSize: number): RoomSearchRequest {
  return {
    location: filters.location,
    checkIn: filters.checkIn,
    checkOut: filters.checkOut,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    numGuests: -Number.parseInt(filters.guests, 10),
    numBed: -Number.parseInt(filters.beds, 10),
    page,
    pageSize,
    amenities: [...filters.amenities].sort(),
    sort: filters.sort === 'asc' ? 'PRICE_ASC' : 'PRICE_DESC',
  }
}

export interface RoomSearchResult {
  data: SearchRoom[]
  count: number
}

interface RoomSearchResponse {
  code: number
  message: string
  result: RoomSearchResult
}

export async function searchRooms(request: RoomSearchRequest) {
  const { data } = await homefyInstance.post<RoomSearchResponse>('room/search', request)
  if (!Array.isArray(data.result?.data) || !Number.isFinite(data.result?.count) || data.result.count < 0) {
    throw new Error('Invalid room search response')
  }
  return data.result
}
