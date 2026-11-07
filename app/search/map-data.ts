import type { SearchRoom } from '@/Services/RoomSearchService'

export type LocatedRoom = SearchRoom & { lat: number; lon: number }

export function hasRoomCoordinates(room: SearchRoom): room is LocatedRoom {
  return typeof room.lat === 'number' && Number.isFinite(room.lat) && Math.abs(room.lat) <= 90 &&
    typeof room.lon === 'number' && Number.isFinite(room.lon) && Math.abs(room.lon) <= 180
}
