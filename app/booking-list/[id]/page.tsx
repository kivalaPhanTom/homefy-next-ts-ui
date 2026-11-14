'use client'

import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

const BookingDetailView = dynamic(() => import('./BookingDetailView'), {
  ssr: false,
  loading: () => <p role='status'>Đang tải chi tiết đặt phòng...</p>,
})

export default function Page() {
  const { id: bookingCode } = useParams<{ id: string }>()
  return <BookingDetailView key={bookingCode} bookingCode={bookingCode} />
}
