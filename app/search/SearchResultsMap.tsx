'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Empty } from 'antd'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { divIcon, latLngBounds } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { SearchRoom } from '@/Services/RoomSearchService'
import { hasRoomCoordinates, type LocatedRoom } from './map-data'
import styles from './page.module.scss'

function FitRooms({ rooms }: { rooms: LocatedRoom[] }) {
  const map = useMap()
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()
      map.fitBounds(latLngBounds(rooms.map((room) => [room.lat, room.lon])), { padding: [40, 40], maxZoom: 15 })
    }, 200)
    return () => clearTimeout(timer)
  }, [map, rooms])
  return null
}

export default function SearchResultsMap({ rooms }: { rooms: SearchRoom[] }) {
  const locatedRooms = useMemo(() => rooms.filter(hasRoomCoordinates), [rooms])
  if (locatedRooms.length === 0) {
    return <div className={styles.mapEmpty}><Empty description={rooms.length ? 'Chưa có thông tin vị trí bản đồ cho các phòng này.' : 'Không có phòng để hiển thị trên bản đồ.'} /></div>
  }
  return (
    <div>
      <p className={styles.mapHint}>
        Hiển thị {locatedRooms.length}/{rooms.length} phòng trên trang kết quả hiện tại.
        {locatedRooms.length < rooms.length && ' Một số phòng chưa có thông tin vị trí.'}
      </p>
      <div className={styles.resultsMap} aria-label='Vị trí các phòng tìm được'>
        <MapContainer center={[locatedRooms[0].lat, locatedRooms[0].lon]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer attribution='Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics' url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}' />
          <FitRooms rooms={locatedRooms} />
          {locatedRooms.map((room) => (
            <Marker
              key={room.id}
              position={[room.lat, room.lon]}
              title={room.name}
              icon={divIcon({ className: styles.priceMarker, html: `<span>${new Intl.NumberFormat('vi-VN').format(room.price)}đ</span>`, iconSize: [100, 32], iconAnchor: [50, 16] })}
            >
              <Popup>
                <div className={styles.mapPopup}>
                  <strong>{room.name}</strong>
                  <span>{room.address}</span>
                  <b>{new Intl.NumberFormat('vi-VN').format(room.price)}đ / đêm</b>
                  <Link href={`/room-detail/${room.id}`}>Xem chi tiết</Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
