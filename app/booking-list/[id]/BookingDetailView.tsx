'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CiLocationOn, CiUser, CiPhone, CiMail, CiStickyNote, CiWallet, CiCalendar } from 'react-icons/ci'
import { IoBedOutline, IoMoonOutline } from 'react-icons/io5'
import { FiDownload, FiSearch, FiTrash2 } from 'react-icons/fi'
import styles from './page.module.scss'

interface BookingDetailViewProps {
  status: 'upcoming' | 'cancelled'
}

const BOOKING = {
  code: 'BK-20261024-000123',
  roomName: 'Homestay Biển Emerald — Đà Nẵng',
  address: 'Sơn Trà, Đà Nẵng, Việt Nam',
  guests: 2,
  rooms: 1,
  nights: 3,
  pricePerNight: 1250000,
  checkIn: '24/10/2026',
  checkInDay: 'Thứ Bảy',
  checkOut: '27/10/2026',
  checkOutDay: 'Thứ Ba',
  contact: {
    name: 'Nguyễn Văn A',
    phone: '0901 234 567',
    email: 'nguyenvana@gmail.com',
    note: 'Check-in muộn ~20:00',
  },
  payment: {
    roomTotal: 3750000,
    serviceFee: 150000,
    discount: 200000,
    total: 3700000,
  },
  refund: {
    paid: 3900000,
    refundAmount: 2730000,
    penalty: 1170000,
    refundStatus: 'Đã chuyển — dự kiến 22/10',
    cancelledAt: '19/10/2026 14:32',
  },
  freeCancelUntil: '21/10/2026 23:59',
}

const GALLERY = [
  { gradient: 'g1', emoji: '🏖️' },
  { gradient: 'g2', emoji: '🛏️' },
  { gradient: 'g3', emoji: '🛁' },
  { gradient: 'g4', emoji: '🌴' },
  { gradient: 'g5', emoji: '🏊' },
]

const AMENITIES = [
  '📶 Wifi tốc độ cao',
  '❄️ Điều hòa',
  '🏊 Hồ bơi',
  '🍳 Bếp đầy đủ',
  '📺 TV thông minh',
  '🚗 Chỗ đậu xe',
]

function formatPrice(value: number): string {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`
}

function BookingDetailView({ status }: BookingDetailViewProps) {
  const isCancelled = status === 'cancelled'
  const [activeImage, setActiveImage] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(BOOKING.code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  const active = GALLERY[activeImage]

  return (
    <main className={styles.page}>
      <div className={styles.backBar}>
        <Link href='/booking-list' className={styles.back}>← Quay lại danh sách đặt phòng</Link>
        <span className={styles.crumb}>
          Booking của tôi <b>/ {BOOKING.code}</b>
        </span>
      </div>

      <div className={styles.top}>
        <div className={styles.gallery}>
          <div className={`${styles.mainImg} ${styles[active.gradient]} ${isCancelled ? styles.greyscale : ''}`}>
            {active.emoji}
          </div>
          <div className={styles.thumbs}>
            {GALLERY.map((item, index) => (
              <button
                key={item.gradient}
                type='button'
                aria-label={`Ảnh ${index + 1}`}
                className={`${styles.thumb} ${styles[item.gradient]} ${index === activeImage ? styles.thumbOn : ''} ${isCancelled ? styles.greyscale : ''}`}
                onClick={() => setActiveImage(index)}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.infoCard}>
            {isCancelled ? (
              <span className={`${styles.pill} ${styles.pillBad}`}>✕ Đã hủy</span>
            ) : (
              <span className={`${styles.pill} ${styles.pillOk}`}>✓ Đã xác nhận · Đã thanh toán</span>
            )}
            <h1 className={styles.roomName}>{BOOKING.roomName}</h1>
            <div className={styles.codeRow}>
              <span className={styles.codePill}>
                <span className={styles.codeLabel}>Mã đặt phòng</span>
                <span className={styles.codeValue}>{BOOKING.code}</span>
              </span>
              <button type='button' className={styles.copyBtn} onClick={handleCopy}>
                {copied ? 'Đã sao chép ✓' : 'Sao chép'}
              </button>
            </div>
            <div className={styles.address}>
              <CiLocationOn />
              {BOOKING.address}
            </div>
            <div className={styles.meta}>
              <span><CiUser /> {BOOKING.guests} khách</span>
              <span><IoBedOutline /> {BOOKING.rooms} phòng</span>
              <span><IoMoonOutline /> {BOOKING.nights} đêm</span>
              {!isCancelled && <span><CiWallet /> {formatPrice(BOOKING.pricePerNight)} / đêm</span>}
            </div>
            <div className={styles.dateBoxes}>
              <div className={styles.dateBox}>
                <span className={styles.dateLabel}>
                  {isCancelled ? 'Ngày nhận phòng (đã hủy)' : 'Nhận phòng'}
                </span>
                <div className={`${styles.dateValue} ${isCancelled ? styles.dateStrikethrough : ''}`}>
                  {BOOKING.checkIn}
                </div>
                <div className={styles.dateSub}>
                  {BOOKING.checkInDay}{isCancelled ? '' : ' · sau 14:00'}
                </div>
              </div>
              <div className={styles.dateBox}>
                <span className={styles.dateLabel}>Trả phòng</span>
                <div className={`${styles.dateValue} ${isCancelled ? styles.dateStrikethrough : ''}`}>
                  {BOOKING.checkOut}
                </div>
                <div className={styles.dateSub}>
                  {BOOKING.checkOutDay}{isCancelled ? '' : ' · trước 12:00'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Thông tin liên hệ</h3>
          <div className={styles.infoRow}>
            <CiUser />
            <span>Khách</span>
            {BOOKING.contact.name}
          </div>
          <div className={styles.infoRow}>
            <CiPhone />
            <span>Điện thoại</span>
            {BOOKING.contact.phone}
          </div>
          <div className={styles.infoRow}>
            <CiMail />
            <span>Email</span>
            {BOOKING.contact.email}
          </div>
          {!isCancelled && (
            <div className={styles.infoRow}>
              <CiStickyNote />
              <span>Ghi chú</span>
              {BOOKING.contact.note}
            </div>
          )}
        </div>

        <div className={styles.card}>
          <h3>Chi tiết thanh toán</h3>
          {isCancelled ? (
            <>
              <div className={styles.priceRow}>
                Đã thanh toán qua VNPAY
                <b>{formatPrice(BOOKING.refund.paid)}</b>
              </div>
              <div className={`${styles.priceRow} ${styles.refund}`}>
                Hoàn tiền (70%)
                <b>−{formatPrice(BOOKING.refund.refundAmount)}</b>
              </div>
              <div className={styles.priceRow}>
                Đã khấu trừ phí hủy (30%)
                <b>{formatPrice(BOOKING.refund.penalty)}</b>
              </div>
              <div className={styles.hr} />
              <div className={styles.priceRow}>
                Trạng thái hoàn tiền
                <b>
                  <span className={`${styles.pill} ${styles.pillOk} ${styles.pillSm}`}>
                    {BOOKING.refund.refundStatus}
                  </span>
                </b>
              </div>
            </>
          ) : (
            <>
              <div className={styles.priceRow}>
                Giá phòng
                <span className={styles.priceNote}>{BOOKING.nights} đêm × {formatPrice(BOOKING.pricePerNight)}</span>
                <b>{formatPrice(BOOKING.payment.roomTotal)}</b>
              </div>
              <div className={styles.priceRow}>
                Phí dịch vụ
                <b>{formatPrice(BOOKING.payment.serviceFee)}</b>
              </div>
              <div className={`${styles.priceRow} ${styles.discount}`}>
                Mã giảm giá — HOMEFY10
                <b>−{formatPrice(BOOKING.payment.discount)}</b>
              </div>
              <div className={styles.hr} />
              <div className={styles.priceRow}>
                Phương thức
                <b>
                  VNPAY
                  <span className={`${styles.pill} ${styles.pillOk} ${styles.pillSm}`}>Đã thanh toán</span>
                </b>
              </div>
              <div className={styles.hr} />
              <div className={styles.totalRow}>
                <span>Tổng cộng</span>
                <b>{formatPrice(BOOKING.payment.total)}</b>
              </div>
            </>
          )}
        </div>

        <div className={styles.card}>
          <h3>{isCancelled ? 'Thông tin hủy phòng' : 'Chính sách hủy'}</h3>
          {isCancelled ? (
            <>
              <div className={`${styles.policyBox} ${styles.policyWarn}`}>
                ✕ Bạn đã hủy vào {BOOKING.refund.cancelledAt}
                <p className={styles.policyText}>
                  Lý do: Thay đổi kế hoạch chuyến đi. Vì hủy sau thời điểm miễn phí ({BOOKING.freeCancelUntil})
                  nên áp dụng phí 30% theo chính sách.
                </p>
              </div>
              <span className={styles.policyLink}>Xem chi tiết chính sách</span>
            </>
          ) : (
            <>
              <div className={`${styles.policyBox} ${styles.policyOk}`}>
                ✓ Miễn phí hủy trước {BOOKING.freeCancelUntil}
                <p className={styles.policyText}>
                  Hủy sau thời điểm này sẽ bị tính phí 30% tổng giá trị đặt phòng. Hoàn tiền qua phương thức
                  thanh toán ban đầu trong 3–5 ngày làm việc.
                </p>
              </div>
              <span className={styles.policyLink}>Xem chi tiết chính sách</span>
            </>
          )}
        </div>

        <div className={styles.card}>
          <h3>Tiện ích phòng</h3>
          <div className={styles.amenities}>
            {AMENITIES.map((item) => (
              <span key={item} className={styles.amenity}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.support}`}>
        <div>
          <span className={styles.supportTitle}>
            {isCancelled ? 'Cần hỗ trợ về đặt phòng này?' : 'Bạn cần hỗ trợ?'}
          </span>
          <p>
            {isCancelled
              ? 'Liên hệ Hotline nếu bạn có câu hỏi về hoàn tiền hoặc muốn đặt lại phòng.'
              : 'Nếu bạn cần hỗ trợ hoặc có yêu cầu đặc biệt, đừng ngần ngại liên hệ với chúng tôi.'}
            {' '}Hotline <span className={styles.supportHotline}>1900 6868</span> · support@homefy.vn
          </p>
        </div>
        <button type='button' className={`${styles.btn} ${styles.btnOutline}`}>
          📞 Liên hệ hỗ trợ
        </button>
      </div>

      <div className={styles.actions}>
        {isCancelled ? (
          <>
            <span className={styles.cancelNote}>Mã đặt phòng này không thể chỉnh sửa</span>
            <button type='button' className={`${styles.btn} ${styles.btnOutline}`}>
              <FiDownload /> Tải hóa đơn (PDF)
            </button>
            <button type='button' className={`${styles.btn} ${styles.btnPrimary}`}>
              <FiSearch /> Tìm & đặt lại phòng
            </button>
          </>
        ) : (
          <>
            <span className={styles.cancelNote}>Miễn phí hủy đến {BOOKING.freeCancelUntil}</span>
            <button type='button' className={`${styles.btn} ${styles.btnOutline}`}>
              <FiDownload /> Tải hóa đơn (PDF)
            </button>
            <button type='button' className={`${styles.btn} ${styles.btnOutline}`}>
              <CiCalendar /> Thay đổi ngày
            </button>
            <button type='button' className={`${styles.btn} ${styles.btnDanger}`}>
              <FiTrash2 /> Hủy đặt phòng
            </button>
          </>
        )}
      </div>

      <div className={styles.mBottomBar}>
        {isCancelled ? (
          <button type='button' className={`${styles.btn} ${styles.btnPrimary}`}>
            <FiSearch /> Tìm & đặt lại phòng
          </button>
        ) : (
          <>
            <button type='button' className={`${styles.btn} ${styles.btnDanger}`}>
              ✕ Hủy phòng
            </button>
            <button type='button' className={`${styles.btn} ${styles.btnPrimary}`}>
              <FiDownload /> Tải hóa đơn
            </button>
          </>
        )}
      </div>
    </main>
  )
}

export default BookingDetailView
