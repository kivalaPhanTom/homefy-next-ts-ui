'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import SliderImg from '@/components/RoomItem/SliderImg'
import Link from 'next/link'
import dayjs, { type Dayjs } from 'dayjs'
import viVN from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'
import { Alert, ConfigProvider, DatePicker, InputNumber, Modal, Pagination, Popover, Select, Slider, Spin } from 'antd'
import { CiLocationOn, CiUser, CiCalendar, CiSettings } from 'react-icons/ci'
import { HiOutlineArrowsUpDown, HiChevronDown, HiCheck } from 'react-icons/hi2'
import { LiaBathSolid } from 'react-icons/lia'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { useGetFurnituresQuery } from '@/RTK_Query/Listing_Query'
import { useSearchRoomsQuery } from '@/RTK_Query/RoomSearch_Query'
import { REGIONS } from '@/common/destinations'
import { buildRoomSearchRequest, type RoomSearchRequest, type SearchRoom } from '@/Services/RoomSearchService'
import { bathroom_type, bed_size } from '@/common/ParamsCommon/ParamsCommon'
import styles from './page.module.scss'

const SearchResultsMap = dynamic(() => import('./SearchResultsMap'), {
  ssr: false,
  loading: () => <div className={styles.mapEmpty} role='status'><Spin /><p>Đang tải bản đồ...</p></div>,
})

const BED_OPTIONS = ['1+', '2+', '3+', '4+']
// const RATING_OPTIONS = ['★ 5', '★ 4+', '★ 3+']
const DEFAULT_CITY = 'Đà Nẵng'

const GUEST_OPTIONS = [
  { label: '1+', min: 1 },
  { label: '2+', min: 2 },
  { label: '3+', min: 3 },
  { label: '4+', min: 4 },
  { label: '5+', min: 5 },
]
const GUEST_LABEL_BY_PARAM: Record<string, string> = {
  '1': '1+',
  '2': '2+',
  '3': '3+',
  '4': '4+',
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
      <div className={styles.img}>
        <div className={styles.roomSlider}>
          <SliderImg data={room.images ?? []} href={`/room-detail/${room.id}`} alt={room.name || 'Ảnh phòng'} />
        </div>
        <button type='button' aria-label='Yêu thích' aria-pressed={liked} className={`${styles.heart} ${liked ? styles.heartOn : ''}`} onClick={onToggleLike}>
          {liked ? <IoHeart /> : <IoHeartOutline />}
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
        <div className={styles.hr} />
        <div className={styles.house}><b>Nhà:</b> {room.num_bedroom} phòng ngủ · {room.num_bathroom} phòng tắm</div>
      </div>
    </div>
  )
}

function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const city = searchParams.get('city') || DEFAULT_CITY
  const guestsParam = searchParams.get('guests') || ''

  const [hearts, setHearts] = useState<Record<string, boolean>>({})
  const [beds, setBeds] = useState('1+')
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [stayDates, setStayDates] = useState<[Dayjs | null, Dayjs | null] | null>(() => {
    const today = dayjs().startOf('day')
    return [today, today.add(1, 'day')]
  })
  const stayLabel = stayDates?.[0] && stayDates?.[1]
    ? `${stayDates[0].format('DD/MM')} – ${stayDates[1].format('DD/MM')}`
    : 'Chọn ngày nhận – trả phòng'
  const [priceSort, setPriceSort] = useState<'asc' | 'desc'>('asc')
  const { data: furnitureData, isLoading: isLoadingFurniture, isError: isFurnitureError, refetch: refetchFurniture } = useGetFurnituresQuery()
  const furnitureOptions = furnitureData?.result ?? []
  const [amenities, setAmenities] = useState<Set<string>>(() => new Set())
  const [guests, setGuests] = useState(GUEST_LABEL_BY_PARAM[guestsParam] || '1+')
  // const [rating, setRating] = useState('★ 4+')
  const [priceRange, setPriceRange] = useState<[number, number]>([200000, 2500000])

  const [submittedSearch, setSubmittedSearch] = useState<RoomSearchRequest>(() => buildRoomSearchRequest({
    location: city,
    checkIn: stayDates![0]!.format('DD-MM-YYYY'),
    checkOut: stayDates![1]!.format('DD-MM-YYYY'),
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    guests,
    beds,
    amenities: Array.from(amenities),
    sort: priceSort,
  }, 1, 100))
  const { data: cachedResult, currentData: searchResult, isFetching: isSearching, error: apiSearchError, refetch } = useSearchRoomsQuery(submittedSearch)
  const [validationError, setValidationError] = useState('')
  const rooms = searchResult?.data ?? []
  const totalRooms = searchResult?.count ?? cachedResult?.count ?? 0
  const pageSize = submittedSearch.pageSize
  const appliedSearch = submittedSearch
  const hasSearched = Boolean(cachedResult)
  const lastRequest = validationError ? null : submittedSearch
  const searchError = validationError || (apiSearchError
    ? 'status' in apiSearchError && apiSearchError.status === 401
      ? 'Vui lòng đăng nhập để tìm kiếm phòng.'
      : 'Không thể tải kết quả tìm kiếm. Vui lòng thử lại.'
    : '')
  const resultSummary = `${appliedSearch.checkIn.replaceAll('-', '/')} – ${appliedSearch.checkOut.replaceAll('-', '/')} · ${Math.abs(appliedSearch.numGuests)}+ khách`

  const executeSearch = (request: RoomSearchRequest, preferCacheValue = true) => {
    setValidationError('')
    if (!preferCacheValue && request === submittedSearch) {
      void refetch()
    } else {
      setSubmittedSearch(request)
    }
  }

  const handleSearch = () => {
    const [checkIn, checkOut] = stayDates ?? []
    if (!checkIn || !checkOut || !checkIn.isValid() || !checkOut.isValid() ||
        checkIn.isBefore(dayjs().startOf('day'), 'day') || !checkOut.isAfter(checkIn, 'day')) {
      setValidationError('Vui lòng chọn ngày nhận phòng và trả phòng hợp lệ (ít nhất 1 đêm).')
      return
    }
    void executeSearch(buildRoomSearchRequest({
      location: city,
      checkIn: checkIn.format('DD-MM-YYYY'),
      checkOut: checkOut.format('DD-MM-YYYY'),
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      guests,
      beds,
      amenities: Array.from(amenities),
      sort: priceSort,
    }, 1, pageSize))
  }

  const handlePriceChange = (index: 0 | 1, value: number | null): void => {
    if (value === null) return
    setPriceRange((prev) => {
      if (index === 0) {
        return [Math.min(Math.max(value, PRICE_MIN), prev[1]), prev[1]]
      }
      return [prev[0], Math.max(Math.min(value, PRICE_MAX), prev[0])]
    })
  }


  return (
    <main className={styles.page}>
      <div className={styles.searchbar}>
        <div className={`${styles.field} ${styles.destinationField}`}>
          <label htmlFor='search-destination' className={styles.fieldLabel}>Điểm đến</label>
          <ConfigProvider locale={viVN} theme={{ token: { colorPrimary: PRIMARY, borderRadius: 12 } }}>
            <Select
              id='search-destination'
              aria-label='Chọn điểm đến'
              className={styles.destinationSelect}
              variant='borderless'
              showSearch={{
                optionFilterProp: 'label',
                filterOption: (input, option) => {
                  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()
                  return normalize(String(option?.label ?? '')).includes(normalize(input))
                },
              }}
              value={city}
              prefix={<CiLocationOn aria-hidden='true' />}
              suffixIcon={<HiChevronDown />}
              onChange={(value: string) => {
                const params = new URLSearchParams(searchParams.toString())
                params.set('city', value)
                router.replace(`/search?${params.toString()}`, { scroll: false })
              }}
              options={REGIONS.map((group) => ({
                label: group.region,
                options: group.destinations.map((destination) => ({
                  value: destination.value,
                  label: destination.value,
                })),
              }))}
              notFoundContent='Không tìm thấy địa điểm'
              classNames={{ popup: { root: styles.sortMenu } }}
            />
          </ConfigProvider>
        </div>
        <div className={styles.sep} />
        <div className={`${styles.field} ${styles.dateField}`}>
          <label htmlFor='stay-check-in' className={styles.fieldLabel}>Nhận phòng — Trả phòng</label>
          <ConfigProvider locale={viVN} theme={{ token: { colorPrimary: PRIMARY, borderRadius: 12 } }}>
            <DatePicker.RangePicker
              id={{ start: 'stay-check-in', end: 'stay-check-out' }}
              className={styles.datePicker}
              value={stayDates}
              onChange={setStayDates}
              format='DD/MM/YYYY'
              placeholder={['Ngày nhận phòng', 'Ngày trả phòng']}
              variant='borderless'
              suffixIcon={<CiCalendar />}
              separator={<span aria-hidden='true'>→</span>}
              disabledDate={(current, { from }) =>
                current.isBefore(dayjs().startOf('day'), 'day') ||
                Boolean(from && current.isBefore(from.add(1, 'day'), 'day'))
              }
            />
          </ConfigProvider>
        </div>
        <div className={styles.sep} />
        <ConfigProvider locale={viVN} theme={{ token: { colorPrimary: PRIMARY, borderRadius: 14 } }}>
          <Popover
            trigger='click'
            placement='bottomRight'
            arrow={false}
            open={isGuestPickerOpen}
            onOpenChange={setIsGuestPickerOpen}
            content={
              <div id='search-guest-picker' className={styles.guestPicker}>
                <div className={styles.guestPickerGroup} role='group' aria-label='Số khách'>
                  <h3>Số khách</h3>
                  <div className={styles.chips}>
                    {GUEST_OPTIONS.map((option) => (
                      <button
                        key={option.label}
                        type='button'
                        aria-pressed={guests === option.label}
                        className={`${styles.chip} ${guests === option.label ? styles.chipOn : ''}`}
                        onClick={() => setGuests(option.label)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.guestPickerGroup} role='group' aria-label='Số giường ngủ'>
                  <h3>Số giường ngủ</h3>
                  <div className={styles.chips}>
                    {BED_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type='button'
                        aria-pressed={beds === option}
                        className={`${styles.chip} ${beds === option ? styles.chipOn : ''}`}
                        onClick={() => setBeds(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <button type='button' className={styles.guestPickerDone} onClick={() => setIsGuestPickerOpen(false)}>Xong</button>
              </div>
            }
          >
            <button
              type='button'
              className={`${styles.field} ${styles.guestField}`}
              aria-label='Chọn số khách và số giường ngủ'
              aria-expanded={isGuestPickerOpen}
              aria-controls='search-guest-picker'
            >
              <span className={styles.fieldLabel}>Khách và giường ngủ</span>
              <span className={styles.fieldValue}>
                <CiUser aria-hidden='true' />
                {guests} khách · {beds} giường
                <HiChevronDown className={styles.guestChevron} aria-hidden='true' />
              </span>
            </button>
          </Popover>
        </ConfigProvider>
        <button type='button' className={styles.cta} disabled={isSearching} onClick={handleSearch}>{isSearching ? 'Đang tìm...' : 'Tìm kiếm'}</button>
      </div>

      <div className={styles.mPill}>
        <div className={styles.mPillTxt}>
          <div className={styles.mPillT1}>
            <CiLocationOn />
            {city}
          </div>
          <div className={styles.mPillT2}>{stayLabel} · {guests} khách · {beds} giường</div>
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
            <h3>Số giường ngủ</h3>
            <div className={styles.chips}>
              {BED_OPTIONS.map((option) => (
                <button
                  key={option}
                  type='button'
                  className={`${styles.chip} ${beds === option ? styles.chipOn : ''}`}
                  onClick={() => setBeds(option)}
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

          <button type='button' className={styles.apply} disabled={isSearching} onClick={handleSearch}>Áp dụng bộ lọc</button>
        </aside>

        <div className={styles.main}>
          <div className={styles.toolbar}>
            <div>
              <h2>{hasSearched ? `${totalRooms} chỗ nghỉ tại ${appliedSearch?.location || 'mọi điểm đến'}` : 'Tìm chỗ nghỉ phù hợp'}</h2>
              <div className={styles.sub}>{resultSummary}</div>
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
                  disabled={isSearching}
                  onChange={(value: 'asc' | 'desc') => {
                    setPriceSort(value)
                    if (appliedSearch) void executeSearch({ ...appliedSearch, page: 1, sort: value === 'asc' ? 'PRICE_ASC' : 'PRICE_DESC' })
                  }}
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

          {searchError && <Alert className={styles.searchAlert} type='error' showIcon title={searchError} action={lastRequest && <button type='button' onClick={() => { if (lastRequest) void executeSearch(lastRequest, false) }} disabled={isSearching}>Thử lại</button>} />}
          <div className={styles.grid} aria-busy={isSearching}>
            {isSearching ? (
              <div className={styles.empty} role='status'><Spin /><p>Đang tìm phòng...</p></div>
            ) : searchError ? null : rooms.map((room) => (
              <SearchCard
                key={room.id}
                room={room}
                liked={hearts[room.id] ?? room.hasLike ?? false}
                onToggleLike={() => setHearts((prev) => ({ ...prev, [room.id]: !(prev[room.id] ?? room.hasLike ?? false) }))}
              />
            ))}
            {!isSearching && !searchError && rooms.length === 0 && (
              <p className={styles.empty}>{hasSearched ? 'Không có chỗ nghỉ phù hợp với bộ lọc đã chọn.' : 'Chọn ngày và bộ lọc, sau đó bấm Tìm kiếm để xem phòng.'}</p>
            )}
          </div>

          {appliedSearch && (
            <ConfigProvider locale={viVN} theme={{ token: { colorPrimary: PRIMARY, borderRadius: 10 } }}>
              <div className={styles.pageNav}>
                <Pagination
                  current={appliedSearch.page}
                  pageSize={appliedSearch.pageSize}
                  total={totalRooms}
                  showSizeChanger
                  pageSizeOptions={[12, 24, 48, 100]}
                  disabled={isSearching}
                  showTotal={(total) => `Tổng ${total} chỗ nghỉ`}
                  onChange={(page, size) => void executeSearch({ ...appliedSearch, page: size === appliedSearch.pageSize ? page : 1, pageSize: size })}
                />
              </div>
            </ConfigProvider>
          )}

          <button type='button' className={styles.mapBtn} aria-haspopup='dialog' onClick={() => setIsMapOpen(true)}>🗺️ Bản đồ</button>
          <Modal
            title='Bản đồ chỗ nghỉ'
            open={isMapOpen}
            onCancel={() => setIsMapOpen(false)}
            footer={null}
            width={1000}
            centered
            destroyOnHidden
          >
            {isSearching ? (
              <div className={styles.mapEmpty} role='status'><Spin /><p>Đang tải vị trí phòng...</p></div>
            ) : searchError ? (
              <Alert type='error' showIcon title={searchError} />
            ) : isMapOpen && <SearchResultsMap rooms={rooms} />}
          </Modal>
        </div>
      </div>

      <div className={styles.mBottom}>
        <button type='button' disabled={isSearching} onClick={handleSearch}>{isSearching ? 'Đang tìm...' : 'Tìm kiếm'}</button>
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
