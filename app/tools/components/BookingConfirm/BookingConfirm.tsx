"use client";

import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Grid,
  Input,
  Row,
  Select,
  Tag
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { formatNumber } from '@/common/FunctionCommon/FunctionCommon'
import styles from "./BookingConfirm.module.scss";
import { createBooking } from '@/Redux/Actions/BookingAction'
const { TextArea } = Input;
const { useBreakpoint } = Grid;

interface BookingData {
  roomId: string;
  code: string;
  names: string;
  checkIn: string;
  checkOut: string;
  numGuest: number;
  totalPrice: number;
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
}
export default function BookingConfirm() {
  const dispatch = useDispatch()
  const screens = useBreakpoint();
  const router = useRouter();
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [specialRequest, setSpecialRequest] = useState('')
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.xl;
  const continuePayment = () => {
    const data = Object.assign({}, bookingData || {}, {
      "name": contactName,
      "email": contactEmail,
      "phone": contactPhone,
      "roomId": bookingData?.roomId,
      "checkIn": bookingData?.checkIn,
      "checkOut": bookingData?.checkOut,
      "numGuest": bookingData?.numGuest,
      "totalPrice": bookingData?.totalPrice,
      "description": specialRequest
    })

    const payload = {
      data,
      navigate: handleNavigate
    }
    dispatch(createBooking(payload))
  }

  const handleNavigate = (bookingId:string):void => {
    router.push(`/payment/${bookingId}`);
  }

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.sessionStorage.getItem('BOOKING') : null
      if (!raw) return
      const data = JSON.parse(raw)
      setBookingData(data)
      if (data.name) setContactName(data.name)
      if (data.phone) setContactPhone(data.phone)
      if (data.email) setContactEmail(data.email)
      if (data.description) setSpecialRequest(data.description)
    } catch (e) {
      // ignore parse errors
    }
  }, [])

  const nights = bookingData && bookingData.checkIn && bookingData.checkOut
    ? Math.max(0, dayjs(bookingData.checkOut, 'DD-MM-YYYY').diff(dayjs(bookingData.checkIn, 'DD-MM-YYYY'), 'day'))
    : 0

  const totalPrice:number = bookingData && bookingData.totalPrice ? Number(bookingData.totalPrice) : 0
  const pricePerNight:number = nights > 0 ? Math.round(totalPrice / nights) : 0

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.backBtn}>
          <ArrowLeftOutlined />
          <span>
            {isMobile ? "Quay lại" : "Quay lại chi tiết phòng"}
          </span>
        </div>

        <h1 className={styles.title}>
          Xác nhận đặt phòng
        </h1>

        <p className={styles.subTitle}>
          Vui lòng kiểm tra thông tin và hoàn tất đặt phòng
        </p>

        <Row gutter={[24, 24]}>
          <Col xs={24} xl={15}>
            <Card className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Thông tin liên hệ</h2>

                <div className={styles.accountBadge}>
                  <Tag color="purple" bordered={false}>
                    Đã lấy từ tài khoản
                  </Tag>
                  {/* Đã lấy từ tài khoản của bạn */}
                </div>
              </div>

              <Form layout="vertical">
                <Form.Item
                  label="Họ tên"
                  required
                >
                  <Input value={contactName} onChange={(e) => setContactName(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  required
                >
                  <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label="Email"
                  required
                >
                  <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                </Form.Item>

                <Form.Item label="Giờ nhận phòng dự kiến">
                  <Select
                    defaultValue="Sau 18:00"
                    options={[
                      {
                        label: "Sau 18:00",
                        value: "18",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item label="Yêu cầu đặc biệt (không bắt buộc)">
                  <TextArea
                    rows={5}
                    maxLength={300}
                    placeholder="VD: Phòng tầng cao, gần thang máy..."
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                  />
                </Form.Item>

                <Checkbox defaultChecked>
                  Cập nhật thông tin này vào hồ sơ của tôi
                </Checkbox>

                {!isMobile && (
                  <>
                    <Button
                      type="primary"
                      size="large"
                      block
                      className={styles.paymentBtn}
                      onClick={continuePayment}
                    >
                      Tiếp tục thanh toán
                      <ArrowRightOutlined />
                    </Button>

                    <div className={styles.security}>
                      <LockOutlined />
                      Thông tin của bạn được bảo mật tuyệt đối
                    </div>
                  </>
                )}
              </Form>
            </Card>
          </Col>

          <Col xs={24} xl={9}>
            <Card className={styles.card}>
              <h2 className={styles.summaryTitle}>
                Tóm tắt đặt phòng
              </h2>

              <img
                src="/images/room.jpg"
                alt=""
                className={styles.roomImage}
              />

              <div className={styles.roomInfo}>
                <h3>{bookingData && bookingData.roomId ? `Phòng ${bookingData.code} - ${bookingData.names}` : 'Room'}</h3>

                <div className={styles.meta}>
                  <UserOutlined />
                  <span>
                    {bookingData && bookingData.numGuest ? `${bookingData.numGuest} khách` : '1 khách'} · 1 phòng · {nights > 0 ? `${nights} đêm` : '—'}
                  </span>
                </div>
              </div>

              <div className={styles.dateRow}>
                <span>Check-in</span>
                <strong>{bookingData && bookingData.checkIn ? bookingData.checkIn : '—'}</strong>
              </div>

              <div className={styles.dateRow}>
                <span>Check-out</span>
                <strong>{bookingData && bookingData.checkOut ? bookingData.checkOut : '—'}</strong>
              </div>

              {!isMobile && (
                <>
                  <div className={styles.priceRow}>
                    <span>Giá phòng</span>
                    <span>{formatNumber(pricePerNight)}đ</span>
                  </div>

                  <div className={styles.priceRow}>
                    <span>Phí dịch vụ</span>
                    <span>{formatNumber(0)}đ</span>
                  </div>

                  <div className={styles.priceRow}>
                    <span>VAT</span>
                    <span>{formatNumber(0)}đ</span>
                  </div>
                </>
              )}

              <div className={styles.total}>
                <span>Tổng cộng</span>

                <strong>
                  {formatNumber(totalPrice)}đ
                </strong>
              </div>

              <div className={styles.cancelBox}>
                <strong>
                  Miễn phí huỷ trước 3 ngày
                </strong>

                <p>
                  Bạn có thể huỷ miễn phí trước
                  02/10/2025 23:59
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {isMobile && (
        <div className={styles.mobileFooter}>
          <div>
            <div>Tổng cộng</div>

            <strong>
              {formatNumber(totalPrice)}đ
            </strong>
          </div>

          <Button
            type="primary"
            size="large"
          >
            Tiếp tục thanh toán
          </Button>
        </div>
      )}
    </div>
  );
}