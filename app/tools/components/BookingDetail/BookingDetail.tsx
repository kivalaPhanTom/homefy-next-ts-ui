"use client";

import Image from "next/image";
import styles from "./BookingDetail.module.scss";

const roomImages = [
  "/images/room-1.jpg",
  "/images/room-2.jpg",
  "/images/room-3.jpg",
  "/images/room-4.jpg",
  "/images/room-5.jpg",
];

export default function BookingDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.backBtn}>
        ← Quay lại danh sách đặt phòng
      </div>

      <div className={styles.topSection}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Image
              src={roomImages[0]}
              alt="room"
              fill
              className={styles.image}
            />
          </div>

          <div className={styles.thumbnailList}>
            {roomImages.map((item, index) => (
              <div key={index} className={styles.thumbnail}>
                <Image
                  src={item}
                  alt={`room-${index}`}
                  fill
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={styles.roomInfo}>
          <div className={styles.status}>Đã thanh toán</div>

          <h1>Room 4</h1>

          <div className={styles.bookingCode}>
            BK-20261005-000123
          </div>

          <div className={styles.meta}>
            <span>👤 1 khách</span>
            <span>🛏️ 1 phòng</span>
            <span>🌙 1 đêm</span>
          </div>

          <div className={styles.dateRow}>
            <span>Check-in</span>
            <strong>05/10/2025 (Thứ Bảy)</strong>
          </div>

          <div className={styles.dateRow}>
            <span>Check-out</span>
            <strong>06/10/2025 (Chủ Nhật)</strong>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Contact */}
        <div className={styles.card}>
          <h3>Thông tin liên hệ</h3>

          <div className={styles.infoItem}>
            👤 Nguyễn Văn A
          </div>

          <div className={styles.infoItem}>
            📞 0901234567
          </div>

          <div className={styles.infoItem}>
            ✉️ abc@gmail.com
          </div>
        </div>

        {/* Payment */}
        <div className={styles.card}>
          <h3>Thông tin thanh toán</h3>

          <div className={styles.priceRow}>
            <span>Giá phòng (1 đêm)</span>
            <span>1.000.000đ</span>
          </div>

          <div className={styles.priceRow}>
            <span>Phí dịch vụ</span>
            <span>50.000đ</span>
          </div>

          <div className={styles.priceRow}>
            <span>Thuế VAT (8%)</span>
            <span>80.000đ</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <span>Tổng cộng</span>
            <strong>1.130.000đ</strong>
          </div>
        </div>

        {/* Cancellation */}
        <div className={styles.card}>
          <h3>Chính sách hủy</h3>

          <div className={styles.policyBox}>
            <div className={styles.successText}>
              ✓ Miễn phí hủy trước 3 ngày
            </div>

            <p>
              Bạn có thể hủy miễn phí trước
              <br />
              02/10/2025 23:59.
            </p>
          </div>

          <a href="#">Xem chi tiết chính sách</a>
        </div>

        {/* Amenities */}
        <div className={styles.card}>
          <h3>Tiện ích phòng</h3>

          <div className={styles.amenities}>
            <span>📶 Wi-Fi tốc độ cao</span>
            <span>🧺 Máy giặt & máy sấy</span>
            <span>❄️ Điều hòa</span>
            <span>📺 TV thông minh</span>
            <span>🛁 Bồn tắm</span>
            <span>💼 Bàn làm việc</span>
          </div>
        </div>

        {/* Support */}
        <div className={styles.card}>
          <h3>Bạn cần hỗ trợ?</h3>

          <p className={styles.supportText}>
            Nếu bạn cần hỗ trợ hoặc có yêu cầu đặc biệt,
            đừng ngần ngại liên hệ với chúng tôi.
          </p>

          <button className={styles.outlineBtn}>
            📞 Liên hệ khách sạn
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.secondaryBtn}>
          ⬇ Tải hóa đơn (PDF)
        </button>

        <button className={styles.secondaryBtn}>
          📅 Thay đổi ngày
        </button>

        <button className={styles.dangerBtn}>
          🗑 Hủy đặt phòng
        </button>
      </div>
    </div>
  );
}