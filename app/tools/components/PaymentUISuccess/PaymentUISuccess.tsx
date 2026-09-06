'use client';
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
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
import { getLocalStorage } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { BOOKING_CODE_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { getBooking } from '@/Redux/Actions/BookingAction'
import { paymentStatus } from '@/Redux/Actions/PaymentAction'
import { useAppSelector } from '@/Redux/store'
const { Title, Text } = Typography;

type PaymentResultStatus = 'SUCCESS' | 'CANCELLED' | 'FAILED'

function getPaymentResultStatus(responseCode: string | null, transactionStatus: string | null): PaymentResultStatus {
  if (responseCode === '00' && transactionStatus === '00') return 'SUCCESS'
  if (responseCode === '24' && transactionStatus === '02') return 'CANCELLED'
  return 'FAILED'
}

export default function PaymentUISuccess() {
  const dispatch = useDispatch()
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const paymentStatusSent = useRef(false)
  const [bookingCode, setBookingCode] = useState('')
  const bookingDetail = useAppSelector((state) => state.bookingSlice.bookingDetail)
  const resultStatus = getPaymentResultStatus(
    searchParams.get('vnp_ResponseCode'),
    searchParams.get('vnp_TransactionStatus')
  )
  const { data, isFetching, error, refetch } = useGetListingDetailQuery(
    { roomId: bookingDetail?.roomId || '' },
    { skip: !bookingDetail?.roomId }
  )
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setBookingCode(String(getLocalStorage(BOOKING_CODE_IN_LOCALSTORAGE) || ''))
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const bookingId = params.id
    if (!bookingId) return

    dispatch(getBooking({ bookingId }))
  }, [dispatch, params.id])

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
  const isSuccess = resultStatus === 'SUCCESS'
  const isCancelled = resultStatus === 'CANCELLED'
  const handleRetry = () => {
    if (isCancelled) {
      router.push('/booking')
      return
    }

    router.push(`/payment/${params.id}`)
  }
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
            {bookingDetail?.email || '-'}
          </Text>
        </div>

        {/* BOOKING CODE */}

        <div className={`${styles.bookingCode} ${styles[resultStatus.toLowerCase()]}`}>
          <Text className={styles.codeLabel}>
            Mã đặt phòng
          </Text>

          <div className={styles.codeValue}>
            {bookingDetail?.bookingCode || bookingCode || '-'}

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
                {bookingDetail?.numGuest || 0} khách • 1 đêm
              </Text>

              <div className={styles.date}>
                <span>{bookingDetail?.checkIn || '-'}</span>
                <span>→</span>
                <span>{bookingDetail?.checkOut || '-'}</span>
              </div>
            </div>
          </div>

          <Divider />

          <div className={styles.totalRow}>
            <Text strong>Tổng thanh toán</Text>

            <span className={styles.price}>
              {formatNumber(bookingDetail?.totalPrice || 0)}đ
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
                  {bookingDetail?.email || '-'}
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
                  {bookingDetail?.paymentMethod === 'CASH'
                    ? 'Thanh toán tiền mặt'
                    : bookingDetail?.paymentMethod || '-'}
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
            onClick={() => router.push('/')}
          >
            Về trang chủ
          </Button>

          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            className={`${styles.detailBtn} ${styles[resultStatus.toLowerCase()]}`}
            onClick={isSuccess ? undefined : handleRetry}
          >
            {statusContent.detailButton}
          </Button>
        </div>
      </Card>
    </div>
  );
}