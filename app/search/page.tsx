'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ConfigProvider, InputNumber, Select, Slider } from 'antd'
import { CiLocationOn, CiUser, CiCalendar, CiSettings } from 'react-icons/ci'
import { HiOutlineHome, HiOutlineArrowsUpDown, HiChevronDown, HiCheck } from 'react-icons/hi2'
import { LiaBathSolid } from 'react-icons/lia'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { useGetFurnituresQuery } from '@/RTK_Query/Listing_Query'
import styles from './page.module.scss'

interface SearchRoom {
  id: number
  gradient: string
  emoji: string
  typeBadge: string
  price: number
  bed: string
  address: string
  available: string
  type: string
  bath: string
  sleeps: number
  bedrooms: number
  bathrooms: number
}

const ROOMS: SearchRoom[] = [
  { id: 1, gradient: 'g1', emoji: '🏖️', typeBadge: 'Homestay', price: 1250000, bed: 'King bed', address: 'Sơn Trà, Đà Nẵng', available: '24/10', type: 'homestay', bath: 'Private bath', sleeps: 2, bedrooms: 2, bathrooms: 2 },
  { id: 2, gradient: 'g2', emoji: '🏢', typeBadge: 'Căn hộ', price: 980000, bed: 'Queen bed', address: 'Mỹ An, Ngũ Hành Sơn', available: '24/10', type: 'apartment', bath: 'Private bath', sleeps: 2, bedrooms: 1, bathrooms: 1 },
  { id: 3, gradient: 'g3', emoji: '🛏️', typeBadge: 'Nhà riêng', price: 750000, bed: 'Double bed', address: 'Hải Châu, Đà Nẵng', available: '25/10', type: 'private house', bath: 'Private bath', sleeps: 2, bedrooms: 1, bathrooms: 1 },
  { id: 4, gradient: 'g4', emoji: '🌴', typeBadge: 'Biệt thự', price: 1690000, bed: 'King bed', address: 'An Thượng, Sơn Trà', available: '24/10', type: 'private villa', bath: 'Private bath', sleeps: 4, bedrooms: 2, bathrooms: 2 },
  { id: 5, gradient: 'g5', emoji: '🏡', typeBadge: 'Homestay', price: 620000, bed: 'Single bed', address: 'Hội An, Quảng Nam', available: '26/10', type: 'homestay', bath: 'Shared bath', sleeps: 1, bedrooms: 1, bathrooms: 1 },
  { id: 6, gradient: 'g6', emoji: '🌇', typeBadge: 'Căn hộ', price: 2400000, bed: 'King bed', address: 'Bắc Mỹ An, Ngũ Hành Sơn', available: '24/10', type: 'apartment', bath: 'Private bath', sleeps: 3, bedrooms: 2, bathrooms: 2 },
]

const BEDROOM_OPTIONS = ['1+', '2+', '3+', '4+']
// const RATING_OPTIONS = ['★ 5', '★ 4+', '★ 3+']
const DEFAULT_CITY = 'Đà Nẵng'

const GUEST_OPTIONS = [
  { label: '1+', min: 1 },
  { label: '2+', min: 2 },
  { label: '3+', min: 3 },
  { label: '5+', min: 5 },
]
const GUEST_LABEL_BY_PARAM: Record<string, string> = {
  '1': '1+',
  '2': '2+',
  '3': '3+',
  '5': '5+',
}

const PRICE_MIN = 0
const PRICE_MAX = 5000000
const PRICE_STEP = 50000
const PRIMARY = '#5b21b6'
const PRIMARY_DARK = '#4c1d95'
const LINE_SOFT = '#ececed'

function formatPrice(value: number): string {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`
}

function shortPrice(value: number): string {
  if (value >= 1000000) {
    const tr = value / 1000000
    return `${Number.isInteger(tr) ? tr : tr.toFixed(1).replace('.', ',')}tr`
  }
  return `${Math.round(value / 1000)}k`
}

function toggleInSet(set: Set<string>, value: string): Set<string> {
  const next = new Set(set)
  if (next.has(value)) {
    next.delete(value)
  } else {
    next.add(value)
  }
  return next
}

function SearchCard({ room, liked, onToggleLike }: { room: SearchRoom; liked: boolean; onToggleLike: () => void }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.img} ${styles[room.gradient]}`}>
        {room.emoji}
        <button
          type='button'
          aria-label='Yêu thích'
          className={`${styles.heart} ${liked ? styles.heartOn : ''}`}
          onClick={onToggleLike}
        >
          {liked ? <IoHeart /> : <IoHeartOutline />}
        </button>
        <span className={styles.typeBadge}>{room.typeBadge}</span>
      </div>

      <div className={styles.cbody}>
        <div className={styles.pr}>
          {formatPrice(room.price)} <span>/ đêm</span>
        </div>
        <div className={styles.bed}>{room.bed}</div>
        <div className={styles.addr}>
          <CiLocationOn />
          {room.address}
        </div>
        <div className={styles.hr} />
        <div className={styles.meta}>
          <span className={styles.mi}>
            <CiCalendar />
            available {room.available}
          </span>
          <span className={styles.mi}>
            <HiOutlineHome />
            {room.type}
          </span>
          <span className={styles.mi}>
            <LiaBathSolid />
            {room.bath}
          </span>
          <span className={styles.mi}>
            <CiUser />
            sleeps max {room.sleeps}
          </span>
        </div>
        <div className={styles.hr} />
        <div className={styles.house}>
          <b>Nhà:</b> {room.bedrooms} phòng ngủ · {room.bathrooms} phòng tắm
        </div>
      </div>
    </div>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const city = searchParams.get('city') || DEFAULT_CITY
  const guestsParam = searchParams.get('guests') || ''

  const [hearts, setHearts] = useState<Set<number>>(() => new Set([1]))
  const [bedrooms, setBedrooms] = useState('2+')
  const [priceSort, setPriceSort] = useState<'asc' | 'desc'>('asc')
  const { data: furnitureData, isLoading: isLoadingFurniture, isError: isFurnitureError, refetch: refetchFurniture } = useGetFurnituresQuery()
  const furnitureOptions = furnitureData?.result ?? []
  const [amenities, setAmenities] = useState<Set<string>>(() => new Set())
  const [guests, setGuests] = useState(GUEST_LABEL_BY_PARAM[guestsParam] || '2+')
  // const [rating, setRating] = useState('★ 4+')
  const [priceRange, setPriceRange] = useState<[number, number]>([200000, 2500000])

  const handlePriceChange = (index: 0 | 1, value: number | null): void => {
    if (value === null) return
    setPriceRange((prev) => {
      if (index === 0) {
        return [Math.min(Math.max(value, PRICE_MIN), prev[1]), prev[1]]
      }
      return [prev[0], Math.max(Math.min(value, PRICE_MAX), prev[0])]
    })
  }

  const minGuests = GUEST_OPTIONS.find((option) => option.label === guests)?.min ?? 1
  const visibleRooms = ROOMS.filter(
    (room) =>
      room.sleeps >= minGuests && room.price >= priceRange[0] && room.price <= priceRange[1]
  ).sort((a, b) => priceSort === 'asc' ? a.price - b.price : b.price - a.price)

  return (
    <main className={styles.page}>
      <div className={styles.searchbar}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Điểm đến</span>
          <span className={styles.fieldValue}>
            <CiLocationOn />
            {city}, Việt Nam
          </span>
        </div>
        <div className={styles.sep} />
        <div className={styles.field} style={{ flex: 1.25 }}>
          <span className={styles.fieldLabel}>Nhận phòng — Trả phòng</span>
          <span className={styles.fieldValue}>
            <CiCalendar />
            24/10/2026 <span style={{ color: '#616066' }}>→</span> 27/10/2026
          </span>
        </div>
        <div className={styles.sep} />
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Khách và phòng</span>
          <span className={styles.fieldValue}>
            <CiUser />
            {guests.replace('+', '')} khách · 1 phòng
          </span>
        </div>
        <button type='button' className={styles.cta}>Tìm kiếm</button>
      </div>

      <div className={styles.mPill}>
        <div className={styles.mPillTxt}>
          <div className={styles.mPillT1}>
            <CiLocationOn />
            {city}
          </div>
          <div className={styles.mPillT2}>24 – 27/10 · {guests.replace('+', '')} khách · 1 phòng</div>
        </div>
        <div className={styles.mFBtn}>
          <CiSettings />
        </div>
      </div>

      <div className={styles.mChips}>
        <span className={`${styles.mChip} ${styles.mChipOn}`}>Giá {shortPrice(priceRange[0])} – {shortPrice(priceRange[1])} ✕</span>
        <span className={`${styles.mChip} ${styles.mChipOn}`}>Số khách {guests} ✕</span>
        {furnitureOptions.filter((item) => amenities.has(item.id)).map((item) => (
          <button
            key={item.id}
            type='button'
            className={`${styles.mChip} ${styles.mChipOn}`}
            aria-label={`Bỏ chọn ${item.name}`}
            onClick={() => setAmenities((prev) => toggleInSet(prev, item.id))}
          >
            {item.name} ✕
          </button>
        ))}
      </div>

      <div className={styles.body}>
        <aside className={styles.side}>
          <div className={styles.sideHead}>
            <h2>Bộ lọc</h2>
            <button type='button' className={styles.clear}>Xóa tất cả</button>
          </div>

          <div className={`${styles.sec} ${styles.secFirst}`}>
            <h3>Khoảng giá (mỗi đêm)</h3>
            <ConfigProvider
              theme={{
                token: { colorPrimary: PRIMARY },
                components: {
                  Slider: {
                    railBg: LINE_SOFT,
                    railHoverBg: LINE_SOFT,
                    trackBg: PRIMARY,
                    trackHoverBg: PRIMARY_DARK,
                    handleColor: PRIMARY,
                    dotActiveBorderColor: PRIMARY,
                  },
                },
              }}
            >
              <Slider
                range
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={priceRange}
                onChange={(value) => setPriceRange([value[0], value[1]])}
                tooltip={{ formatter: (v) => formatPrice(v ?? 0) }}
              />
            </ConfigProvider>
            <div className={styles.priceInputs}>
              <InputNumber
                value={priceRange[0]}
                min={PRICE_MIN}
                max={priceRange[1]}
                step={PRICE_STEP}
                controls={false}
                formatter={(v) => formatPrice(v ?? 0)}
                parser={(v) => Number(String(v ?? '').replace(/\D/g, ''))}
                onChange={(v) => handlePriceChange(0, v)}
              />
              <InputNumber
                value={priceRange[1]}
                min={priceRange[0]}
                max={PRICE_MAX}
                step={PRICE_STEP}
                controls={false}
                formatter={(v) => formatPrice(v ?? 0)}
                parser={(v) => Number(String(v ?? '').replace(/\D/g, ''))}
                onChange={(v) => handlePriceChange(1, v)}
              />
            </div>
          </div>

          <div className={styles.sec}>
            <h3>Số phòng ngủ</h3>
            <div className={styles.chips}>
              {BEDROOM_OPTIONS.map((option) => (
                <button
                  key={option}
                  type='button'
                  className={`${styles.chip} ${bedrooms === option ? styles.chipOn : ''}`}
                  onClick={() => setBedrooms(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sec}>
            <h3>Tiện ích</h3>
            {isLoadingFurniture ? (
              <p role='status'>Đang tải tiện ích...</p>
            ) : isFurnitureError ? (
              <div role='alert'>
                <p>Không thể tải danh sách tiện ích.</p>
                <button type='button' onClick={() => refetchFurniture()}>Thử lại</button>
              </div>
            ) : furnitureOptions.length === 0 ? (
              <p>Chưa có tiện ích.</p>
            ) : (
              <div className={styles.checks}>
                {furnitureOptions.map((item) => (
                  <span
                    key={item.id}
                    role='checkbox'
                    aria-checked={amenities.has(item.id)}
                    tabIndex={0}
                    className={styles.ck}
                    onClick={() => setAmenities((prev) => toggleInSet(prev, item.id))}
                    onKeyDown={(event) => {
                      if (event.key === ' ' || event.key === 'Enter') {
                        event.preventDefault()
                        setAmenities((prev) => toggleInSet(prev, item.id))
                      }
                    }}
                  >
                    <span aria-hidden='true' className={`${styles.box} ${amenities.has(item.id) ? styles.boxOn : ''}`}>
                      {amenities.has(item.id) ? '✓' : ''}
                    </span>
                    {item.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.sec}>
            <h3>Số khách</h3>
            <div className={styles.chips}>
              {GUEST_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  type='button'
                  className={`${styles.chip} ${guests === option.label ? styles.chipOn : ''}`}
                  onClick={() => setGuests(option.label)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/*
          <div className={styles.sec}>
            <h3>Đánh giá</h3>
            <div className={styles.chips}>
              {RATING_OPTIONS.map((option) => (
                <button
                  key={option}
                  type='button'
                  className={`${styles.chip} ${rating === option ? styles.chipOn : ''}`}
                  onClick={() => setRating(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          */}

          <button type='button' className={styles.apply}>Áp dụng bộ lọc</button>
        </aside>

        <div className={styles.main}>
          <div className={styles.toolbar}>
            <div>
              <h2>{visibleRooms.length} chỗ nghỉ tại {city}</h2>
              <div className={styles.sub}>24/10 – 27/10 · {guests.replace('+', '')} khách · 3 đêm</div>
            </div>
            <ConfigProvider theme={{ token: { colorPrimary: PRIMARY, borderRadius: 12, fontFamily: 'inherit' } }}>
              <div className={styles.sort}>
                <HiOutlineArrowsUpDown className={styles.sortIcon} aria-hidden='true' />
                <label htmlFor='price-sort' className={styles.sortLabel}>Sắp xếp</label>
                <Select
                  id='price-sort'
                  aria-label='Sắp xếp theo giá'
                  className={styles.sortSelect}
                  variant='borderless'
                  value={priceSort}
                  onChange={(value: 'asc' | 'desc') => setPriceSort(value)}
                  suffixIcon={<HiChevronDown />}
                  options={[
                    { value: 'asc', label: 'Giá từ thấp đến cao' },
                    { value: 'desc', label: 'Giá từ cao đến thấp' },
                  ]}
                  classNames={{ popup: { root: styles.sortMenu } }}
                  optionRender={(option) => (
                    <span className={styles.sortOption}>
                      {option.label}
                      {option.value === priceSort && <HiCheck aria-hidden='true' />}
                    </span>
                  )}
                  placement='bottomRight'
                />
              </div>
            </ConfigProvider>
          </div>

          <div className={styles.grid}>
            {visibleRooms.map((room) => (
              <SearchCard
                key={room.id}
                room={room}
                liked={hearts.has(room.id)}
                onToggleLike={() =>
                  setHearts((prev) => {
                    const next = new Set(prev)
                    if (next.has(room.id)) {
                      next.delete(room.id)
                    } else {
                      next.add(room.id)
                    }
                    return next
                  })
                }
              />
            ))}
            {visibleRooms.length === 0 && (
              <p className={styles.empty}>Không có chỗ nghỉ nào phù hợp bộ lọc số khách</p>
            )}
          </div>

          <div className={styles.pageNav}>
            <span className={styles.pg}>←</span>
            <span className={`${styles.pg} ${styles.pgOn}`}>1</span>
            <span className={styles.pg}>2</span>
            <span className={styles.pg}>3</span>
            <span className={styles.pg}>4</span>
            <span className={styles.dots}>…</span>
            <span className={styles.pg}>42</span>
            <span className={styles.pg}>→</span>
          </div>

          <button type='button' className={styles.mapBtn}>🗺️ Bản đồ</button>
        </div>
      </div>

      <div className={styles.mBottom}>
        <button type='button'>Hiện {visibleRooms.length} kết quả</button>
      </div>
    </main>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<main className={styles.page} />}>
      <SearchContent />
    </Suspense>
  )
}
