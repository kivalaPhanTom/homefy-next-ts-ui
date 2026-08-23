'use client';
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useSearchParams } from 'next/navigation'
import {
  Button,
  Card,
  Divider,
  Typography,
} from 'antd';
import {
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  CreditCardOutlined,
  HomeOutlined,
  MailOutlined,
  MinusOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import styles from './PaymentUISuccess.module.scss';
import { useGetListingDetailQuery } from '@/RTK_Query/Listing_Query'
import noImage from '@/assets/empty.webp'
import { formatNumber } from '@/common/FunctionCommon/FunctionCommon'
import { BookingData } from '@/tools/common/types/BookingType'
import { paymentStatus } from '@/Redux/Actions/PaymentAction'
const { Title, Text } = Typography;

type PaymentResultStatus = 'SUCESS' | 'CANCELLED' | 'FAILED'

function getPaymentResultStatus(responseCode: string | null, transactionStatus: string | null): PaymentResultStatus {
  if (responseCode === '00' && transactionStatus === '00') return 'SUCESS'
  if (responseCode === '24' && transactionStatus === '02') return 'CANCELLED'
  return 'FAILED'
}

export default function PaymentUISuccess() {
  const dispatch = useDispatch()
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const paymentStatusSent = useRef(false)
  const resultStatus = getPaymentResultStatus(
    searchParams.get('vnp_ResponseCode'),
    searchParams.get('vnp_TransactionStatus')
  )
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

  useEffect(() => {
    const bookingId = params.id
    const responseCode = searchParams.get('vnp_ResponseCode')
    const transactionStatus = searchParams.get('vnp_TransactionStatus')

    if (!bookingId || !responseCode || !transactionStatus || paymentStatusSent.current) return

    dispatch(paymentStatus({
      data: {
        bookingId,
        paymentStatus: getPaymentResultStatus(responseCode, transactionStatus),
      },
    }))
    paymentStatusSent.current = true
  }, [dispatch, params.id, searchParams])

  const roomInfo = data ? data.result : null
  const imageSrc = roomInfo?.images && roomInfo.images.length > 0 ? roomInfo.images[0].path : noImage;
  const isSuccess = resultStatus === 'SUCESS'
  const isCancelled = resultStatus === 'CANCELLED'
  const statusContent = isSuccess
    ? {
        icon: <CheckOutlined />,
        title: 'Đặt phòng thành công!',
        description: <>Cảm ơn bạn đã đặt phòng tại Mysa House.<br />Thông tin xác nhận đã được gửi đến email của bạn.</>,
        detailButton: 'Xem chi tiết đặt phòng',
      }
    : isCancelled
      ? {
          icon: <MinusOutlined />,
          title: 'Đã hủy thanh toán',
          description: <>Bạn đã hủy giao dịch thanh toán.<br />Đặt phòng này chưa được xác nhận.</>,
          detailButton: 'Đặt phòng lại',
        }
      : {
          icon: <CloseOutlined />,
          title: 'Thanh toán thất bại!',
          description: <>Giao dịch của bạn không thể hoàn tất.<br />Vui lòng kiểm tra thông tin thanh toán và thử lại.</>,
          detailButton: 'Thử thanh toán lại',
        }
  return (
    <div className={styles.container}>
      <Card className={styles.wrapper}>
        {/* SUCCESS ICON */}

        <div className={`${styles.successSection} ${styles[resultStatus.toLowerCase()]}`}>
          <div className={styles.successIcon}>
            {statusContent.icon}
          </div>

          <Title level={2} className={styles.title}>
            {statusContent.title}
          </Title>

          <Text className={styles.description}>
            {statusContent.description}
          </Text>

          <Text className={styles.email}>
            abc@gmail.com
          </Text>
        </div>

        {/* BOOKING CODE */}

        <div className={`${styles.bookingCode} ${styles[resultStatus.toLowerCase()]}`}>
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

          {!isSuccess && (
            <div className={styles.statusNotice}>
              <WarningOutlined />
              <div>
                <div className={styles.infoTitle}>
                  {isCancelled ? 'Thanh toán chưa được xác nhận' : 'Thanh toán không thành công'}
                </div>
                <div className={styles.infoDesc}>
                  {isCancelled ? 'Bạn có thể đặt phòng lại bất cứ lúc nào.' : 'Vui lòng kiểm tra thông tin thẻ hoặc liên hệ ngân hàng.'}
                </div>
              </div>
            </div>
          )}
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
            className={`${styles.detailBtn} ${styles[resultStatus.toLowerCase()]}`}
          >
            {statusContent.detailButton}
          </Button>
        </div>
      </Card>
    </div>
  );
}