"use client";

import { CalendarOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./RoomUnavailable.module.scss";

interface RoomUnavailableProps {
  unavailableDates: string[];
}

export default function RoomUnavailable({
  unavailableDates,
}: RoomUnavailableProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <ExclamationCircleOutlined />
          </div>

          <div>
            <h2>Phòng không có sẵn</h2>
            <p>
              Khoảng thời gian bạn chọn có những ngày đã được đặt bởi khách khác.
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <CalendarOutlined />
            <span>Các ngày không thể đặt</span>
          </div>

          <div className={styles.dateList}>
            {unavailableDates.map((date) => (
              <div key={date} className={styles.dateItem}>
                <CalendarOutlined />
                <span>{date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <p className={styles.footer}>
          Vui lòng chọn ngày khác hoặc liên hệ chúng tôi để được hỗ trợ.
        </p>
      </div>
    </div>

  );
}