'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiLocationOn, CiUser, CiPhone, CiMail, CiStickyNote, CiWallet } from 'react-icons/ci'
import { IoBedOutline, IoMoonOutline } from 'react-icons/io5'
import { Service } from '@/Services/BookingServices'
import { useGetFurnituresQuery } from '@/RTK_Query/Listing_Query'
import type { BookingDetailResult } from '@/tools/common/types/BookingType'
import noImage from '@/assets/empty.webp'
import styles from './page.module.scss'

interface BookingDetailViewProps {
  bookingCode: string
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Chờ xác nhận',
  CONFIRMED: 'Đã xác nhận',
  UPCOMING: 'Sắp tới',
  COMPLETED: 'Đã hoàn thành',
  CANCELLED: 'Đã hủy',
  CANCELED: 'Đã hủy',
  PAID: 'Đã thanh toán',
  UNPAID: 'Chưa thanh toán',
  FAILED: 'Thất bại',
  EXPIRED: 'Đã hết hạn',
  CHECKED_IN: 'Đã nhận phòng',
  CHECKED_OUT: 'Đã trả phòng',
}

const BATHROOM_LABELS: Record<string, string> = {
  PRIVATE: 'Riêng', OWN: 'Riêng', SHARED: 'Dùng chung', ENSUITE: 'Khép kín',
}

function parseBookingDate(value: string): Date | null {
  const match = /^(\d{2})[-/](\d{2})[-/](\d{4})$/.exec(value)
  if (!match) return null
  const [, day, month, year] = match.map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? date
    : null
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

function BookingContent({ detail }: { detail: BookingDetailResult }) {
  const { booking, room, user } = detail
  const [activeImage, setActiveImage] = useState(0)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const { data: furnitureData, isFetching: loadingFurniture, isError: furnitureError, refetch } = useGetFurnituresQuery(undefined, {
    skip: !room.furnitures?.length,
  })
  const amenities = (furnitureData?.result ?? []).filter((item) => room.furnitures?.includes(item.id))
  const images = room.images?.filter((image) => image.path?.trim()) ?? []
  const active = images[activeImage]
  const status = booking.status?.toUpperCase() ?? ''
  const isCancelled = status === 'CANCELLED' || status === 'CANCELED'
  const statusStyle = isCancelled || status === 'FAILED' || status === 'EXPIRED'
    ? styles.pillBad
    : ['CONFIRMED', 'COMPLETED', 'PAID', 'CHECKED_IN', 'CHECKED_OUT'].includes(status)
      ? styles.pillOk
      : styles.pillNeutral
  const checkIn = parseBookingDate(booking.checkIn)
  const checkOut = parseBookingDate(booking.checkOut)
  const nights = checkIn && checkOut && checkOut > checkIn
    ? Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000)
    : null
  const contactName = booking.name || [user?.lastName, user?.firstName].filter(Boolean).join(' ') || 'Chưa cập nhật'

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(booking.bookingCode)
      setCopied(true)
      setCopyError(false)
    } catch {
      setCopyError(true)
    }
  }

  const dateBox = (label: string, value: string, date: Date | null) => (
    <div className={styles.dateBox}>
      <span className={styles.dateLabel}>{label}</span>
      <div className={`${styles.dateValue} ${isCancelled ? styles.dateStrikethrough : ''}`}>
        {date ? new Intl.DateTimeFormat('vi-VN', { timeZone: 'UTC' }).format(date) : value || 'Chưa cập nhật'}
      </div>
      {date && <div className={styles.dateSub}>{new Intl.DateTimeFormat('vi-VN', { weekday: 'long', timeZone: 'UTC' }).format(date)}</div>}
    </div>
  )

  return (
    <>
      <div className={styles.backBar}>
        <Link href='/booking-list' className={styles.back}>← Quay lại danh sách đặt phòng</Link>
        <span className={styles.crumb}>Booking của tôi <b>/ {booking.bookingCode}</b></span>
      </div>

      <div className={styles.top}>
        <div className={styles.gallery}>
          <div className={`${styles.mainImg} ${isCancelled ? styles.greyscale : ''}`}>
            <Image
              key={active?.path ?? 'empty'}
              src={active?.path || noImage.src}
              alt={room.name}
              fill
              sizes='(max-width: 1100px) 100vw, 50vw'
              className={styles.roomImage}
              unoptimized
              onError={(event) => { event.currentTarget.src = noImage.src }}
            />
          </div>
          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type='button'
                  aria-label={`Ảnh ${index + 1} của ${room.name}`}
                  aria-pressed={index === activeImage}
                  className={`${styles.thumb} ${index === activeImage ? styles.thumbOn : ''} ${isCancelled ? styles.greyscale : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image src={image.path} alt={`${room.name} - ảnh ${index + 1}`} fill sizes='92px' className={styles.roomImage} unoptimized
                    onError={(event) => { event.currentTarget.src = noImage.src }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.infoCard}>
            <span className={`${styles.pill} ${statusStyle}`}>{STATUS_LABELS[status] || booking.status || 'Chưa cập nhật trạng thái'}</span>
            <h1 className={styles.roomName}>{room.name}</h1>
            <div className={styles.codeRow}>
              <span className={styles.codePill}>
                <span className={styles.codeLabel}>Mã đặt phòng</span>
                <span className={styles.codeValue}>{booking.bookingCode}</span>
              </span>
              <button type='button' className={styles.copyBtn} onClick={handleCopy}>
                {copied ? 'Đã sao chép ✓' : 'Sao chép'}
              </button>
              {copyError && <span role='status' className={styles.policyText}>Không thể sao chép. Vui lòng sao chép mã thủ công.</span>}
            </div>
            <div className={styles.address}><CiLocationOn /><span>{room.address}</span></div>
            <div className={styles.meta}>
              <span><CiUser /> {booking.numGuest} khách</span>
              <span><IoBedOutline /> {room.num_bedroom} phòng ngủ</span>
              {nights !== null && <span><IoMoonOutline /> {nights} đêm</span>}
              <span><CiWallet /> {formatPrice(room.price)} / đêm</span>
            </div>
            <div className={styles.dateBoxes}>
              {dateBox(isCancelled ? 'Ngày nhận phòng (đã hủy)' : 'Nhận phòng', booking.checkIn, checkIn)}
              {dateBox('Trả phòng', booking.checkOut, checkOut)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Thông tin liên hệ</h3>
          <div className={styles.infoRow}><CiUser /><span className={styles.infoLabel}>Khách</span><span className={styles.infoValue}>{contactName}</span></div>
          <div className={styles.infoRow}><CiPhone /><span className={styles.infoLabel}>Điện thoại</span><span className={styles.infoValue}>{booking.phone || user?.phoneNumber || 'Chưa cập nhật'}</span></div>
          <div className={styles.infoRow}><CiMail /><span className={styles.infoLabel}>Email</span><span className={styles.infoValue}>{booking.email || user?.email || 'Chưa cập nhật'}</span></div>
          {booking.description && <div className={styles.infoRow}><CiStickyNote /><span className={styles.infoLabel}>Ghi chú</span><span className={styles.infoValue}>{booking.description}</span></div>}
        </div>

        <div className={styles.card}>
          <h3>Chi tiết thanh toán</h3>
          <div className={styles.priceRow}>Giá phòng / đêm<b>{formatPrice(room.price)}</b></div>
          {nights !== null && <div className={styles.priceRow}>Số đêm<b>{nights} đêm</b></div>}
          <div className={styles.priceRow}>Phương thức<b>{booking.paymentMethod || 'Chưa cập nhật'}</b></div>
          <div className={styles.hr} />
          <div className={styles.totalRow}><span>Tổng cộng</span><b>{formatPrice(booking.totalPrice)}</b></div>
        </div>

        <div className={styles.card}>
          <h3>Thông tin phòng</h3>
          <div className={styles.priceRow}>Mã phòng<b>{room.code}</b></div>
          <div className={styles.priceRow}>Phòng ngủ<b>{room.num_bedroom}</b></div>
          <div className={styles.priceRow}>Phòng tắm<b>{room.num_bathroom}</b></div>
          {room.bathroom_type && <div className={styles.priceRow}>Loại phòng tắm<b>{BATHROOM_LABELS[room.bathroom_type.toUpperCase()] || room.bathroom_type}</b></div>}
          {room.bed_size && <div className={styles.priceRow}>Loại giường<b>{room.bed_size.replace(/_/g, ' ')}</b></div>}
          <div className={styles.priceRow}>Số khách tối đa<b>{room.max_guests} khách</b></div>
          {room.description && <p className={styles.description}>{room.description}</p>}
        </div>

        <div className={styles.card}>
          <h3>Tiện ích phòng</h3>
          {loadingFurniture ? <p role='status' className={styles.policyText}>Đang tải tiện ích...</p>
            : furnitureError ? <p className={styles.policyText}>Không thể tải tiện ích. <button type='button' className={styles.copyBtn} onClick={() => refetch()}>Thử lại</button></p>
              : amenities.length > 0 ? (
                <div className={styles.amenities}>{amenities.map((item) => <span key={item.id} className={styles.amenity}>{item.name}</span>)}</div>
              ) : <p className={styles.policyText}>Thông tin tiện ích đang được cập nhật.</p>}
        </div>
      </div>
    </>
  )
}

function BookingDetailView({ bookingCode }: BookingDetailViewProps) {
  const [detail, setDetail] = useState<BookingDetailResult | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    async function loadBooking() {
      try {
        const { data } = await Service.getBookingDetail(bookingCode, controller.signal)
        if (data.code !== 200 || !data.result?.booking || !data.result?.room) throw new Error('Booking detail unavailable')
        if (!controller.signal.aborted) setDetail(data.result)
      } catch {
        if (!controller.signal.aborted) setError(true)
      }
    }
    void loadBooking()
    return () => controller.abort()
  }, [bookingCode, attempt])

  return (
    <main className={styles.page}>
      {detail ? <BookingContent key={detail.booking.bookingCode} detail={detail} /> : (
        <>
          <div className={styles.backBar}><Link href='/booking-list' className={styles.back}>← Quay lại danh sách đặt phòng</Link></div>
          <div className={styles.stateCard}>
            {error ? (
              <div role='alert'>
                <h1>Không thể tải chi tiết đặt phòng</h1>
                <p>Vui lòng kiểm tra mã đặt phòng và thử lại.</p>
                <button type='button' className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => { setError(false); setAttempt((value) => value + 1) }}>Thử lại</button>
              </div>
            ) : <p role='status'>Đang tải chi tiết đặt phòng...</p>}
          </div>
        </>
      )}
    </main>
  )
}

export default BookingDetailView
