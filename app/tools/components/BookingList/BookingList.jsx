'use client';

import React from 'react';
import { Tabs, Button } from 'antd';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import styles from './BookingList.module.scss';

// Mock dữ liệu hiển thị từ ảnh của bạn
const bookingData = [
  {
    id: '1',
    roomName: 'Room 4',
    code: 'BK-20261005-000123',
    checkIn: '05/10/2025',
    checkOut: '06/10/2025',
    guests: 1,
    nights: 1,
    price: '1.130.000đ',
    status: 'success',
    statusText: 'Đã thanh toán',
    imageUrl: 'https://images.unsplash.com/photo-1611891405258-48a308d7d49c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    roomName: 'Room 8',
    code: 'BK-20261110-000456',
    checkIn: '10/11/2025',
    checkOut: '12/11/2025',
    guests: 2,
    nights: 2,
    price: '2.450.000đ',
    status: 'warning',
    statusText: 'Chờ thanh toán',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    roomName: 'Room 2',
    code: 'BK-20260901-000789',
    checkIn: '01/09/2025',
    checkOut: '02/09/2025',
    guests: 1,
    nights: 1,
    price: '950.000đ',
    status: 'info',
    statusText: 'Đã hoàn thành',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    roomName: 'Room 6',
    code: 'BK-20260815-000321',
    checkIn: '15/08/2025',
    checkOut: '16/08/2025',
    guests: 2,
    nights: 1,
    price: '1.300.000đ',
    status: 'error',
    statusText: 'Đã hủy',
    imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=400&q=80',
  },
];

export default function BookingList() {
  
  // Hàm tạo danh sách card phòng đặt
  const renderBookingCards = () => {
    return (
      <div className={styles.bookingList}>
        {bookingData.map((item) => (
          <div key={item.id} className={styles.bookingCard}>
            
            {/* Ảnh đại diện phòng */}
            <div className={styles.roomImageWrapper}>
              <img src={item.imageUrl} alt={item.roomName} className={styles.roomImage} />
            </div>

            {/* Khối chứa thông tin phòng */}
            <div className={styles.roomInfo}>
              <h3 className={styles.roomName}>{item.roomName}</h3>
              <span className={styles.bookingCode}>{item.code}</span>
              
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <CalendarOutlined style={{ color: '#808191' }} />
                  <span>{item.checkIn}</span>
                  <span style={{ margin: '0 4px' }}>➔</span>
                  <span>{item.checkOut}</span>
                </div>
                <div className={styles.detailItem}>
                  <UserOutlined style={{ color: '#808191' }} />
                  <span>{item.guests} khách</span>
                  <span style={{ margin: '0 6px', color: '#cbd5e1' }}>•</span>
                  <span>{item.nights} đêm</span>
                </div>
              </div>
            </div>

            {/* Khối xử lý Giá, Trạng thái & Nút hành động */}
            <div className={styles.cardActions}>
              
              {/* Mobile View: Badge hiển thị cạnh giá */}
              <div className={styles.mobileStatus}>
                <span className={`${styles.statusBadge} ${styles[item.status]}`}>
                  {item.statusText}
                </span>
              </div>

              <div className={styles.price}>{item.price}</div>

              <div className={styles.actionButtons}>
                {/* Desktop View: Badge hiển thị thẳng hàng với nút */}
                <div className={styles.desktopStatus}>
                  <span className={`${styles.statusBadge} ${styles[item.status]}`}>
                    {item.statusText}
                  </span>
                </div>

                {item.status === 'warning' ? (
                  <Button type="primary">Thanh toán</Button>
                ) : (
                  <Button type="default">Xem chi tiết</Button>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    );
  };

  // Cấu hình các Tabs tương thích với Ant Design v5+
  const tabItems = [
    { key: 'all', label: 'Tất cả', children: renderBookingCards() },
    { key: 'upcoming', label: 'Sắp tới', children: renderBookingCards() },
    { key: 'completed', label: 'Đã hoàn thành', children: renderBookingCards() },
    { key: 'cancelled', label: 'Đã hủy', children: renderBookingCards() },
  ];

  return (
    <div className={styles.bookingContainer}>
      <h2 className={styles.desktopHeader}>Đặt phòng của tôi</h2>
      <Tabs defaultActiveKey="all" items={tabItems} />
    </div>
  );
}