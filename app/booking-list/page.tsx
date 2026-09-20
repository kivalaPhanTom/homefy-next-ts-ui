'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { CiLocationOn, CiUser } from 'react-icons/ci'
import { IoBedOutline, IoMoonOutline } from 'react-icons/io5'
import { AiFillCheckCircle } from 'react-icons/ai'
import styles from './page.module.scss'

import noImage from '@/assets/empty.webp'
import { formatNumber } from '@/common/FunctionCommon/FunctionCommon'
import { getBookingHistory } from '@/Redux/Actions/BookingAction'
import { useAppSelector } from '@/Redux/store'
import type { BookingHistoryItem } from '@/tools/common/types/BookingType'

interface BookingBadge {
  label: string
  date?: string
}

interface Booking {
  id: string
  name: string
  location: string
  image: string
  price: string
  status: string
  checkIn: string
  checkOut: string
  numNight: number
  meta: string[]
  badge?: BookingBadge
}

const TABS = ['Sắp tới', 'Đã hoàn thành', 'Đã hủy'] as const

type Tab = (typeof TABS)[number]

const TAB_STATUS: Record<Tab, string> = {
  'Sắp tới': 'UPCOMING',
  'Đã hoàn thành': 'COMPLETED',
  'Đã hủy': 'CANCELLED',
}

const TAB_STATUS_LABEL: Record<Tab, string> = {
  'Sắp tới': 'Đã xác nhận',
  'Đã hoàn thành': 'Hoàn thành',
  'Đã hủy': 'Đã hủy',
}

const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

const META_ICONS = [
  <CiUser key='guest' />,
  <IoBedOutline key='room' />,
  <IoMoonOutline key='night' />,
]

function formatDateWithWeekday(date: string): string {
  const [day, month, year] = date.split('/').map(Number)
  if (!day || !month || !year) return date
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()]
  return `${date} (${weekday})`
}

function formatPrice(price: number): string {
  return `${formatNumber(price).replace(/,/g, '.')}đ`
}

function mapBooking(booking: BookingHistoryItem, tab: Tab): Booking {
  return {
    id: booking.bookingId,
    name: booking.roomName,
    location: booking.address,
    image: booking.imgUrl && booking.imgUrl.trim() ? booking.imgUrl : noImage.src,
    price: formatPrice(booking.totalPrice),
    status: TAB_STATUS_LABEL[tab],
    checkIn: booking.checkin,
    checkOut: booking.checkout,
    numNight: booking.numNight,
    meta: [`${booking.numGuest} khách`, '1 phòng', `${booking.numNight} đêm`],
    badge: tab === 'Sắp tới' ? { label: 'Upcoming', date: booking.checkin } : undefined,
  }
}

function BookingCard({ booking, showCancel }: { booking: Booking; showCancel: boolean }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image src={booking.image} alt={booking.name} fill className={styles.image} sizes='200px' unoptimized />
        {booking.badge && (
          <div className={styles.badges}>
            <span className={styles.badgeUpcoming}>{booking.badge.label}</span>
            {booking.badge.date && <span className={styles.badgeDate}>{booking.badge.date}</span>}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <div className={styles.info}>
            <h3 className={styles.name}>{booking.name}</h3>
            <p className={styles.location}>
              <CiLocationOn />
              {booking.location}
            </p>

            <div className={styles.dateRow}>
              <div>
                <span className={styles.dateLabel}>Check-in</span>
                <strong className={styles.dateValue}>{formatDateWithWeekday(booking.checkIn)}</strong>
              </div>
              <div>
                <span className={styles.dateLabel}>Check-out</span>
                <strong className={styles.dateValue}>
                  {formatDateWithWeekday(booking.checkOut)} ({booking.numNight} đêm)
                </strong>
              </div>
            </div>

            <div className={styles.meta}>
              {booking.meta.map((item, index) => (
                <span key={item}>
                  {META_ICONS[index]}
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.price}>{booking.price}</div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.statusBar}>
            <AiFillCheckCircle className={styles.statusIcon} />
            <span>{booking.status}</span>
          </div>
          <button className={styles.detailBtn}>Xem chi tiết</button>
          {showCancel && <button className={styles.cancelBtn}>Hủy phòng</button>}
        </div>
      </div>
    </div>
  )
}

function Page() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState<Tab>('Sắp tới')
  const bookingHistory = useAppSelector((state) => state.bookingSlice?.bookingHistory ?? {})

  useEffect(() => {
    TABS.forEach((tab) => {
      dispatch(getBookingHistory({ status: TAB_STATUS[tab] }))
    })
  }, [dispatch])

  const statusKey = TAB_STATUS[activeTab]
  const tabData = bookingHistory[statusKey]
  const tabBookings = useMemo(() => (Array.isArray(tabData) ? tabData : []), [tabData])

  const mappedBookings = useMemo(
    () => tabBookings.map((booking) => mapBooking(booking, activeTab)),
    [tabBookings, activeTab]
  )

  const tabBadges = useMemo(() => {
    const badges: Partial<Record<Tab, number>> = {}
    TABS.forEach((tab) => {
      const count = bookingHistory[TAB_STATUS[tab]]?.length ?? 0
      if (count > 0) badges[tab] = count
    })
    return badges
  }, [bookingHistory])

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Danh sách phòng đã đặt</h1>
      <p className={styles.subtitle}>Quản lý và xem lại lịch sử đặt phòng của bạn</p>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tabBadges[tab] && <span className={styles.tabBadge}>{tabBadges[tab]}</span>}
          </button>
        ))}
      </div>

      {tabData === undefined ? null : mappedBookings.length > 0 ? (
        <div className={styles.cardList}>
          {mappedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} showCancel={activeTab === 'Sắp tới'} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Không có đặt phòng nào trong mục này</p>
        </div>
      )}
    </main>
  )
}

export default Page
