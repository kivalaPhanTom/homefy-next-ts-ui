'use client';
import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Divider,
  Typography,
} from 'antd';
import {
  CheckOutlined,
  CopyOutlined,
  HomeOutlined,
  MailOutlined,
  CreditCardOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import styles from './PaymentUISuccess.module.scss';
import { useGetListingDetailQuery } from '@/RTK_Query/Listing_Query'
import noImage from '@/assets/empty.webp'
import { formatNumber } from '@/common/FunctionCommon/FunctionCommon'
import { BookingData } from '@/tools/common/types/BookingType'
const { Title, Text } = Typography;

export default function PaymentUISuccess() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const { data, isFetching, error, refetch } = useGetListingDetailQuery(
    { roomId: bookingData?.roomId || '' },
    { skip: !bookingData?.roomId }
  )
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.sessionStorage.getItem('BOOKING') : null
      if (!raw) return
      const data = JSON.parse(raw)
      setBookingData(data)
    } catch (e) {
      // ignore parse errors
    }
  }, [])
  const roomInfo = data ? data.result : null
  const imageSrc = roomInfo?.images && roomInfo.images.length > 0 ? roomInfo.images[0].path : noImage;
  return (
    <div className={styles.container}>
      <Card className={styles.wrapper}>
        {/* SUCCESS ICON */}

        <div className={styles.successSection}>
          <div className={styles.successIcon}>
            <CheckOutlined />
          </div>

          <Title level={2} className={styles.title}>
            Đặt phòng thành công!
          </Title>

          <Text className={styles.description}>
            Cảm ơn bạn đã đặt phòng tại Mysa House.
            <br />
            Thông tin xác nhận đã được gửi đến email của bạn.
          </Text>

          <Text className={styles.email}>
            abc@gmail.com
          </Text>
        </div>

        {/* BOOKING CODE */}

        <div className={styles.bookingCode}>
          <Text className={styles.codeLabel}>
            Mã đặt phòng
          </Text>

          <div className={styles.codeValue}>
            BK-20261005-000123

            <CopyOutlined className={styles.copyIcon} />
          </div>
        </div>

        {/* ROOM */}

        <div className={styles.bookingCard}>
          <div className={styles.roomSection}>
            <img
              src={imageSrc}
              alt="room"
              className={styles.roomImage}
            />

            <div className={styles.roomContent}>
              <Title level={4}>{roomInfo?.name}</Title>

              <Text type="secondary">
                1 khách • 1 đêm
              </Text>

              <div className={styles.date}>
                <span>{ bookingData?.checkIn}</span>
                <span>→</span>
                <span>{ bookingData?.checkOut}</span>
              </div>
            </div>
          </div>

          <Divider />

          <div className={styles.totalRow}>
            <Text strong>Tổng thanh toán</Text>

            <span className={styles.price}>
              1.130.000đ
            </span>
          </div>

          <Divider />

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <MailOutlined />

              <div>
                <div className={styles.infoTitle}>
                  Email xác nhận
                </div>

                <div className={styles.infoDesc}>
                  Đã gửi đến
                </div>

                <div className={styles.infoValue}>
                  abc@gmail.com
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <CreditCardOutlined />

              <div>
                <div className={styles.infoTitle}>
                  Phương thức thanh toán
                </div>

                <div className={styles.infoValue}>
                  Thẻ Visa •••• 4242
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTON */}

        <div className={styles.actionGroup}>
          <Button
            icon={<HomeOutlined />}
            size="large"
            className={styles.homeBtn}
          >
            Về trang chủ
          </Button>

          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            className={styles.detailBtn}
          >
            Xem chi tiết đặt phòng
          </Button>
        </div>
      </Card>
    </div>
  );
}