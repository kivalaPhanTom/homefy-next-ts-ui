'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ConfigProvider, Select } from 'antd'
import { CiLocationOn, CiUser, CiCalendar } from 'react-icons/ci'
import { LiaBathSolid } from 'react-icons/lia'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { HiOutlineArrowsUpDown, HiChevronDown, HiCheck } from 'react-icons/hi2'
import dayjs from 'dayjs'
import { bathroom_type, bed_size } from '@/common/ParamsCommon/ParamsCommon'
import styles from './page.module.scss'

const PRIMARY = '#5b21b6'

type FavRoom = {
  id: string
  name: string
  price: number
  bed_size: string
  address: string
  date_available: string
  num_bed: number
  bathroom_type: string
  max_guests: number
  num_bedroom: number
  num_bathroom: number
  savedAt: string
  placeholder: string
  gradient: string
}

// TODO: thay bằng useLazyGetFavouriteRoomsQuery khi nối API
const FAVOURITE_ROOMS: FavRoom[] = [
  {
    id: 'fav-1',
    name: 'Ocean View Homestay Đà Nẵng',
    price: 850000,
    bed_size: 'double',
    address: '12 Bạch Đằng, Hải Châu, Đà Nẵng',
    date_available: '2026-12-01',
    num_bed: 2,
    bathroom_type: 'own',
    max_guests: 4,
    num_bedroom: 2,
    num_bathroom: 1,
    savedAt: '2026-11-17T09:00:00',
    placeholder: '🏠',
    gradient: 'g1',
  },
  {
    id: 'fav-2',
    name: 'Villa Hồ Tây Nghỉ Dưỡng',
    price: 2400000,
    bed_size: 'king',
    address: '05 Xuân Diệu, Tây Hồ, Hà Nội',
    date_available: '2026-11-15',
    num_bed: 3,
    bathroom_type: 'ensuite',
    max_guests: 6,
    num_bedroom: 3,
    num_bathroom: 2,
    savedAt: '2026-11-16T15:30:00',
    placeholder: '🏡',
    gradient: 'g2',
  },
  {
    id: 'fav-3',
    name: 'Căn Hộ Trung Tâm Sài Gòn',
    price: 1250000,
    bed_size: 'queen',
    address: '27 Nguyễn Huệ, Quận 1, TP.HCM',
    date_available: '2026-11-20',
    num_bed: 1,
    bathroom_type: 'own',
    max_guests: 2,
    num_bedroom: 1,
    num_bathroom: 1,
    savedAt: '2026-11-15T20:10:00',
    placeholder: '🏢',
    gradient: 'g3',
  },
  {
    id: 'fav-4',
    name: 'Bungalow Rừng Dừa Bến Tre',
    price: 780000,
    bed_size: 'single',
    address: 'Ấp 5, Châu Thành, Bến Tre',
    date_available: '2026-11-25',
    num_bed: 1,
    bathroom_type: 'own',
    max_guests: 3,
    num_bedroom: 1,
    num_bathroom: 1,
    savedAt: '2026-11-14T08:45:00',
    placeholder: '🌴',
    gradient: 'g4',
  },
  {
    id: 'fav-5',
    name: 'Khách Sạn View Biển Nha Trang',
    price: 1600000,
    bed_size: 'double',
    address: '28 Trần Phú, Nha Trang, Khánh Hòa',
    date_available: '2026-12-01',
    num_bed: 1,
    bathroom_type: 'ensuite',
    max_guests: 2,
    num_bedroom: 1,
    num_bathroom: 1,
    savedAt: '2026-11-13T19:20:00',
    placeholder: '🌊',
    gradient: 'g5',
  },
  {
    id: 'fav-6',
    name: 'Biệt Thự Đồi Sam Sơn',
    price: 3200000,
    bed_size: 'king',
    address: 'Hoa Hướng Dương, Sầm Sơn, Thanh Hóa',
    date_available: '2026-12-05',
    num_bed: 4,
    bathroom_type: 'own',
    max_guests: 8,
    num_bedroom: 4,
    num_bathroom: 3,
    savedAt: '2026-11-12T11:05:00',
    placeholder: '⛰️',
    gradient: 'g6',
  },
]

type SortKey = 'saved-desc' | 'price-asc' | 'price-desc'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'saved-desc', label: 'Mới lưu nhất' },
  { value: 'price-asc', label: 'Giá từ thấp đến cao' },
  { value: 'price-desc', label: 'Giá từ cao đến thấp' },
]

function formatPrice(value: number): string {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`
}

function FavCard({ room, onRemove }: { room: FavRoom; onRemove: () => void }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.img} ${styles[room.gradient]}`}>
        <span aria-hidden='true'>{room.placeholder}</span>
        <button type='button' aria-label='Bỏ yêu thích' className={styles.heart} onClick={onRemove}>
          <IoHeart />
        </button>
      </div>
      <div className={styles.cbody}>
        <Link href={`/room-detail/${room.id}`} className={styles.roomName}>{room.name}</Link>
        <div className={styles.pr}>{formatPrice(room.price)} <span>/ đêm</span></div>
        <div className={styles.bed}>{bed_size.find((item) => item.code === room.bed_size)?.name ?? room.bed_size}</div>
        <div className={styles.addr}><CiLocationOn />{room.address}</div>
        <div className={styles.hr} />
        <div className={styles.meta}>
          {room.date_available != null && <span className={styles.mi}><CiCalendar />Có từ {dayjs(room.date_available).format('DD/MM/YYYY')}</span>}
          {room.num_bed != null && <span className={styles.mi}>{room.num_bed} giường ngủ</span>}
          {room.bathroom_type && <span className={styles.mi}><LiaBathSolid />{bathroom_type.find((item) => item.code === room.bathroom_type)?.name ?? room.bathroom_type}</span>}
          <span className={styles.mi}><CiUser />Tối đa {room.max_guests} khách</span>
        </div>
        <div className={styles.house}><b>Nhà:</b> {room.num_bedroom} phòng ngủ · {room.num_bathroom} phòng tắm</div>
      </div>
    </div>
  )
}

function FavoritesContent() {
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set(FAVOURITE_ROOMS.map((room) => room.id)))
  const [sort, setSort] = useState<SortKey>('saved-desc')
  const [isMobile, setIsMobile] = useState(false)
  const [mbVisible, setMbVisible] = useState(2)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const rooms = useMemo(() => FAVOURITE_ROOMS.filter((room) => savedIds.has(room.id)), [savedIds])

  const sorted = useMemo(() => {
    const next = [...rooms]
    if (sort === 'price-asc') next.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') next.sort((a, b) => b.price - a.price)
    else next.sort((a, b) => dayjs(b.savedAt).valueOf() - dayjs(a.savedAt).valueOf())
    return next
  }, [rooms, sort])

  const visibleRooms = isMobile ? sorted.slice(0, mbVisible) : sorted
  const remaining = sorted.length - mbVisible

  const removeSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const clearAll = () => {
    setSavedIds(new Set())
    setMbVisible(2)
  }

  return (
    <main className={styles.page}>
      <div className={styles.body}>
        <div className={styles.toolbar}>
          <div>
            <h2 className={styles.pageTitle}>Phòng đã thích</h2>
            <div className={styles.sub}>
              {rooms.length > 0 ? `${rooms.length} chỗ nghỉ đã lưu · Cập nhật ${dayjs().format('DD/MM/YYYY')}` : 'Danh sách trống'}
            </div>
          </div>
          {rooms.length > 0 && (
            <ConfigProvider theme={{ token: { colorPrimary: PRIMARY, borderRadius: 12, fontFamily: 'inherit' } }}>
              <div className={styles.toolbarRight}>
                <button type='button' className={styles.clear} onClick={clearAll}>Xóa tất cả</button>
                <div className={styles.sort}>
                  <HiOutlineArrowsUpDown className={styles.sortIcon} aria-hidden='true' />
                  <label htmlFor='fav-sort' className={styles.sortLabel}>Sắp xếp</label>
                  <Select
                    id='fav-sort'
                    aria-label='Sắp xếp danh sách yêu thích'
                    className={styles.sortSelect}
                    variant='borderless'
                    value={sort}
                    onChange={(value: SortKey) => setSort(value)}
                    suffixIcon={<HiChevronDown />}
                    options={SORT_OPTIONS}
                    classNames={{ popup: { root: styles.sortMenu } }}
                    optionRender={(option) => (
                      <span className={styles.sortOption}>
                        {option.label}
                        {option.value === sort && <HiCheck aria-hidden='true' />}
                      </span>
                    )}
                    placement='bottomRight'
                  />
                </div>
              </div>
            </ConfigProvider>
          )}
        </div>

        {rooms.length === 0 ? (
          <div className={styles.emptyWrap}>
            <div className={styles.bigHeart}><IoHeartOutline aria-hidden='true' /></div>
            <h3>Chưa có phòng nào được lưu</h3>
            <p>Nhấn vào biểu tượng trái tim ở góc ảnh phòng để lưu lại những chỗ nghỉ bạn thích. Danh sách của bạn sẽ xuất hiện tại đây.</p>
            <Link href='/search' className={styles.cta}>Khám phá chỗ nghỉ</Link>
          </div>
        ) : (
          <>
            <div className={styles.mChips} role='tablist' aria-label='Sắp xếp'>
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  aria-pressed={sort === option.value}
                  className={`${styles.mChip} ${sort === option.value ? styles.mChipOn : ''}`}
                  onClick={() => setSort(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className={styles.grid}>
              {visibleRooms.map((room) => (
                <FavCard key={room.id} room={room} onRemove={() => removeSaved(room.id)} />
              ))}
            </div>

            {!isMobile && (
              <div className={styles.pageNav}>
                <span className={styles.pgTotal}>Tổng {rooms.length} chỗ nghỉ</span>
              </div>
            )}

            {isMobile && remaining > 0 && (
              <div className={styles.mBottom}>
                <button type='button' onClick={() => setMbVisible(sorted.length)}>
                  Tải thêm {remaining} chỗ nghỉ nữa
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default function Page() {
  return <FavoritesContent />
}
