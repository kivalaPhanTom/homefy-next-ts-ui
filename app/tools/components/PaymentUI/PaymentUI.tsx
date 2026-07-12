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
import { useState } from 'react'
import styles from "./PaymentUI.module.scss";
import { confirmPayment } from '@/Redux/Actions/PaymentAction'

interface PaymentUIProps {
  bookingId: string;
}
export default function PaymentUI(props: PaymentUIProps) {
  const { bookingId } = props
  const dispatch = useDispatch()
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('card')
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
    router.push(`/payment-success/${bookingId}`);
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.back}>
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
              <Radio value="card">
                Thẻ tín dụng / Thẻ ghi nợ
              </Radio>

              <Radio value="vnpay">
                VNPay
              </Radio>

              <Radio value="momo">
                MoMo
              </Radio>

              <Radio value="bank">
                Chuyển khoản ngân hàng
              </Radio>
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

          <Checkbox className={styles.checkbox}>
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
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
                alt=""
              />

              <div>
                <h4>Room 4</h4>

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
              <span>1.000.000đ</span>
            </div>

            <div className={styles.priceRow}>
              <span>Phí dịch vụ</span>
              <span>50.000đ</span>
            </div>

            <div className={styles.priceRow}>
              <span>Thuế VAT</span>
              <span>80.000đ</span>
            </div>

            <div className={styles.total}>
              <span>Tổng cộng</span>

              <strong>1.130.000đ</strong>
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

        <Button type="primary">
          Thanh toán ngay
        </Button>
      </div>
    </div>
  );
}