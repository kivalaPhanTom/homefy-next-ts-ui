'use client'

import { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { CiLocationOn, CiUser } from 'react-icons/ci'
import { IoBedOutline, IoMoonOutline } from 'react-icons/io5'
import { AiFillCheckCircle } from 'react-icons/ai'
import styles from './page.module.scss'

import room1 from '@/assets/demo-room.jpeg'
import room2 from '@/assets/demo-room2.jpg'
import room3 from '@/assets/demo-room3.jpg'

interface BookingBadge {
  label: string
  date?: string
}

interface BookingBase {
  id: string
  name: string
  location: string
  image: StaticImageData
  price: string
  status: string
  badge?: BookingBadge
}

interface StackedDateBooking extends BookingBase {
  layout: 'stacked'
  checkInLabel: string
  dateLines: string[]
  meta: string[]
}

interface SplitDateBooking extends BookingBase {
  layout: 'split'
  columns: {
    label: string
    value: string
  }[]
}

type Booking = StackedDateBooking | SplitDateBooking

const TABS = ['Sắp tới', 'Đã hoàn thành', 'Đã hủy'] as const

type Tab = (typeof TABS)[number]

const TAB_BADGES: Partial<Record<Tab, number>> = {
  'Sắp tới': 3,
}

const META_ICONS = [
  <CiUser key='guest' />,
  <IoBedOutline key='room' />,
  <IoMoonOutline key='night' />,
]

const BOOKINGS: Booking[] = [
  {
    id: 'BK-001',
    name: 'Room 4',
    location: 'Nha Trang, Việt Nam',
    image: room1,
    price: '1.130.000đ',
    status: 'Đã xác nhận - Miễn phí hủy trước 02/10/2026',
    layout: 'stacked',
    checkInLabel: 'Check-in',
    dateLines: ['05/10/2026 (Thứ Bảy)', '06/10/2026 (Chủ Nhật)'],
    meta: ['1 khách', '1 phòng', '1 đêm'],
  },
  {
    id: 'BK-002',
    name: 'Ocean View Suite',
    location: 'Đà Nẵng, Việt Nam',
    image: room2,
    price: '3.400.000đ',
    status: 'Đã xác nhận',
    badge: { label: 'Upcoming', date: '25/10/2025' },
    layout: 'split',
    columns: [
      { label: 'Check-in', value: '25/10/2026' },
      { label: 'Check-out', value: '27/10/2026 (2 đêm)' },
    ],
  },
  {
    id: 'BK-003',
    name: 'Deluxe King Room',
    location: 'Hà Nội, Việt Nam',
    image: room3,
    price: '1.850.000đ',
    status: 'Đã xác nhận - Thanh toán khi nhận phòng',
    badge: { label: 'Upcoming' },
    layout: 'split',
    columns: [
      { label: 'Check-in', value: '15/11/2026' },
      { label: 'Check-out', value: '16/11/2026 (1 đêm)' },
    ],
  },
]

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image src={booking.image} alt={booking.name} fill className={styles.image} sizes='200px' />
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

            {booking.layout === 'stacked' ? (
              <>
                <div className={styles.dateRow}>
                  <span className={styles.dateLabel}>{booking.checkInLabel}</span>
                  <div className={styles.dateLines}>
                    {booking.dateLines.map((line) => (
                      <strong key={line}>{line}</strong>
                    ))}
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
              </>
            ) : (
              <div className={styles.dateRow}>
                {booking.columns.map((col) => (
                  <div key={col.label}>
                    <span className={styles.dateLabel}>{col.label}</span>
                    <strong className={styles.dateValue}>{col.value}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.price}>{booking.price}</div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.statusBar}>
            <AiFillCheckCircle className={styles.statusIcon} />
            <span>{booking.status}</span>
          </div>
          <button className={styles.detailBtn}>Xem chi tiết</button>
          <button className={styles.cancelBtn}>Hủy phòng</button>
        </div>
      </div>
    </div>
  )
}

function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('Sắp tới')

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
            {TAB_BADGES[tab] && <span className={styles.tabBadge}>{TAB_BADGES[tab]}</span>}
          </button>
        ))}
      </div>

      {activeTab === 'Sắp tới' ? (
        <div className={styles.cardList}>
          {BOOKINGS.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
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
