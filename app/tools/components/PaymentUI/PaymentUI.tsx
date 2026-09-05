"use client";

import {
  Button,
  Card,
  Checkbox,
  Input,
  Radio,
  Steps,
} from "antd";

import {
  LockOutlined,
  BankOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'
import styles from "./PaymentUI.module.scss";
import { confirmPayment } from '@/Redux/Actions/PaymentAction'
import { useGetListingDetailQuery } from '@/RTK_Query/Listing_Query'
import noImage from '@/assets/empty.webp'
import { BookingData } from '@/tools/common/types/BookingType'
import { formatNumber } from '@/common/FunctionCommon/FunctionCommon'
interface PaymentUIProps {
  bookingId: string;
}
export default function PaymentUI(props: PaymentUIProps) {
  const { bookingId } = props

  const dispatch = useDispatch()
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false)
  const { data, isFetching, error, refetch } = useGetListingDetailQuery(
    { roomId: bookingData?.roomId || '' },
    { skip: !bookingData?.roomId }
  )
  const roomInfo = data ? data.result : null

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

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/');
  }

  const paymentHandler = (): void => {
    const payload = {
      data: {
        "bookingId": bookingId,
        "paymentMethod": paymentMethod,
        "bankCode": "VCB"
      },
      navigate: handleNavigate
    }
    dispatch(confirmPayment(payload))
  }

  const handleNavigate = (bookingId: String): void => {
    router.push(`/payment-result/${bookingId}`);
  }

  const imageSrc = roomInfo?.images && roomInfo.images.length > 0 ? roomInfo.images[0].path : noImage;
  const totalPrice: number = roomInfo && roomInfo.price ? Number(roomInfo.price) : 0
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.back} onClick={handleBack}>
        ← Quay lại xác nhận đặt phòng
      </div>

      {/* <div className={styles.stepWrapper}>
        <Steps
          current={1}
          items={[
            {
              title: "Thông tin đặt phòng",
            },
            {
              title: "Thanh toán",
            },
            {
              title: "Hoàn tất",
            },
          ]}
        />
      </div> */}

      <h1 className={styles.title}>Thanh toán</h1>

      <p className={styles.subTitle}>
        Vui lòng chọn phương thức thanh toán và hoàn tất đặt phòng
      </p>

      <div className={styles.content}>
        {/* LEFT */}
        <div className={styles.left}>
          <Card className={styles.card}>
            <h3>Chọn phương thức thanh toán</h3>

            <p className={styles.secureText}>
              🔒 Thông tin thanh toán của bạn được bảo mật tuyệt đối
            </p>

            <Radio.Group
              className={styles.paymentMethods}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {/* <Radio value="card">
                Thẻ tín dụng / Thẻ ghi nợ
              </Radio> */}

              <Radio value="vnpay">
                VNPay
              </Radio>

              {/* <Radio value="momo">
                MoMo
              </Radio>

              <Radio value="bank">
                Chuyển khoản ngân hàng
              </Radio> */}
            </Radio.Group>

            {/* <div className={styles.form}>
              <h4>Thông tin thẻ</h4>

              <Input
                placeholder="1234 5678 9012 3456"
                suffix={<CreditCardOutlined />}
              />

              <Input
                placeholder="NGUYEN VAN A"
              />

              <div className={styles.row}>
                <Input placeholder="MM / YY" />

                <Input placeholder="123" />
              </div>

              <div className={styles.pci}>
                🔒 Giao dịch được mã hóa và bảo mật
                theo tiêu chuẩn PCI DSS
              </div>
            </div> */}
          </Card>

          <Checkbox
            className={styles.checkbox}
            checked={hasAgreedToTerms}
            onChange={(e) => setHasAgreedToTerms(e.target.checked)}
          >
            Tôi đã đọc và đồng ý với
            <span> Điều khoản đặt phòng </span>
            và
            <span> Chính sách hủy phòng</span>
          </Checkbox>

          <Button
            type="primary"
            size="large"
            block
            className={styles.payButton}
            onClick={paymentHandler}
            disabled={!hasAgreedToTerms || !paymentMethod}
          >
            Thanh toán ngay - 1.130.000đ
          </Button>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <Card className={styles.summary}>
            <h3>Tóm tắt đặt phòng</h3>

            <div className={styles.roomInfo}>
              <img
                src={imageSrc}
                alt=""
              />

              <div>
                <h4>{roomInfo?.name}</h4>

                <span>
                  1 khách · 1 phòng · 1 đêm
                </span>
              </div>
            </div>

            <div className={styles.bookingInfo}>
              <div>
                <span>Check-in</span>
                <strong>05/10/2025</strong>
              </div>

              <div>
                <span>Check-out</span>
                <strong>06/10/2025</strong>
              </div>
            </div>

            <div className={styles.priceRow}>
              <span>Giá phòng</span>
              <span>{roomInfo?.price ? formatNumber(roomInfo.price) : '0'}đ</span>
            </div>

            {/* <div className={styles.priceRow}>
              <span>Phí dịch vụ</span>
              <span>50.000đ</span>
            </div> */}

            {/* <div className={styles.priceRow}>
              <span>Thuế VAT</span>
              <span>80.000đ</span>
            </div> */}

            <div className={styles.total}>
              <span>Tổng cộng</span>

              <strong>{formatNumber(totalPrice)}đ</strong>
            </div>

            <div className={styles.freeCancel}>
              ✅ Miễn phí hủy trước 3 ngày
            </div>

            <div className={styles.benefits}>
              <div>
                <LockOutlined />
                Xác nhận tức thì
              </div>

              <div>
                <LockOutlined />
                Thanh toán an toàn
              </div>

              <div>
                <BankOutlined />
                Hỗ trợ 24/7
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile sticky */}
      <div className={styles.mobileBar}>
        <div>
          <span>Tổng cộng</span>
          <strong>1.130.000đ</strong>
        </div>

        <Button
          type="primary"
          className={styles.payButton}
          onClick={paymentHandler}
          disabled={!hasAgreedToTerms || !paymentMethod}
        >
          Thanh toán ngay
        </Button>
      </div>
    </div>
  );
}