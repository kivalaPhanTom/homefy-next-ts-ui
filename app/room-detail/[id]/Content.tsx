"use client";
import { useEffect, useState, JSX } from 'react'
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux'
import {
  Form,
  DatePicker,
  Select,
  Tabs,
  Button,
  Rate,
} from "antd";
import dayjs, { type Dayjs } from 'dayjs';
import { message } from 'antd';
import parse from "html-react-parser";

import styles from './RoomDetail.module.scss'
import { useGetFurnituresQuery } from '@/RTK_Query/Listing_Query'
import { setSessionStorage } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { formatNumber, renderTextDayMonthValue } from '@/common/FunctionCommon/FunctionCommon'
import { checkRoomAvailability } from '@/Redux/Actions/ProductionAction'
import { checkRoomAvailabilityType } from '@/common/types/RoomTypes'
import type { RootState } from '@/Redux/store';
import SpinLoader from '@/app/tools/components/SpinLoader/SpinLoader';
import RoomUnavailable from './RoomUnavailable';

const { Option } = Select;
interface FunitureOption {
  id: string,
  name: string,
  icon: JSX.Element | null
}
type funituresFromApiType = Pick<FunitureOption, "id" | "name">;
interface ContentProps {
  roomId: string;
  code: string;
  name: string;
  address: string;
  price: number;
  description: string;
  num_bedroom: number;
  num_bathroom: number;
  max_guests: number;
  furnitures: string[];
}
function Content(props: ContentProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isFetching, error, refetch } = useGetFurnituresQuery(undefined)
  const funituresOptions: funituresFromApiType[] = (data as any)?.result ?? [];
  const { isRoomAvailable, conflictDates, isCheckingRoomAvailability } = useSelector((state: RootState) => state.filterProductPageSlice)
  const { roomId, code, name, price, description, num_bedroom, num_bathroom, max_guests, address, furnitures } = props
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null)
  const [guestCount, setGuestCount] = useState<number>(1)

  useEffect(() => {
    const today = dayjs();
    const nextDay = today.add(1, 'day');
    setCheckInDate(today);
    setCheckOutDate(nextDay);
  }, [roomId])

  useEffect(() => {
    if (checkInDate && checkOutDate && roomId) {
      const handleCheckRoomAvailability = setTimeout(() => {
        const fromDate: string = checkInDate.format('DD-MM-YYYY')
        const toDate: string = checkOutDate.format('DD-MM-YYYY')
        const payload: checkRoomAvailabilityType = {
          roomId: roomId,
          fromDate: fromDate,
          toDate: toDate,
        }
        dispatch(checkRoomAvailability(payload))
      }, 700)
      return () => clearTimeout(handleCheckRoomAvailability)
    }
  }, [checkInDate, checkOutDate, roomId])


  const handleCheckInChange = (value: Dayjs | null) => {
    setCheckInDate(value || null)
  }

  const handleCheckOutChange = (value: Dayjs | null) => {
    setCheckOutDate(value || null)
  }

  const handleGuestChange = (value: number) => {
    setGuestCount(value)
  }

  const disabledCheckOutDate = (current: Dayjs) => {
    if (!checkInDate) return false
    return current && (current.isSame(checkInDate, 'day') || current.isBefore(checkInDate, 'day'))
  }

  const disabledCheckInDate = (current: Dayjs) => {
    if (!checkOutDate) return false
    return current && (current.isSame(checkOutDate, 'day') || current.isAfter(checkOutDate, 'day'))
  }

  const calcNights = () => {
    if (!checkInDate || !checkOutDate) return 0
    const diff = checkOutDate.diff(checkInDate, 'day')
    return diff > 0 ? diff : 0
  }

  const nightsCount = calcNights()
  const subtotal = nightsCount > 0 ? nightsCount * (Number(price) || 0) : 0

  const booking = () => {
    if (nightsCount <= 0) {
      message.error('Ngày trả phòng phải lớn hơn ngày nhận phòng')
      return
    }
    const payload = {
      "code": code,
      "name": name,
      "email": "duy199982@gmail.com",
      "phone": "0986622074",
      "roomId": roomId,
      "checkIn": checkInDate ? checkInDate.format('DD-MM-YYYY') : "",
      "checkOut": checkOutDate ? checkOutDate.format('DD-MM-YYYY') : "",
      "numGuest": guestCount,
      "totalPrice": subtotal,
      "paymentMethod": "CONFIRMED",
      "description": ""
    }
    setSessionStorage("BOOKING", payload)
    router.push("/booking");
  }

  return (
    <div className={styles["content-wrapper"]}>

      {/* LEFT */}

      <div className={styles["content-left"]}>

        <h1 className={styles["room-title"]}>
          {`${code} - ${name}`}
        </h1>

        <div className={styles["room-rating"]}>
          <Rate disabled defaultValue={5} />

          <span>4.8 (32 đánh giá)</span>

          <span className={styles["dot"]}>•</span>

          <span>
            {address}
          </span>
        </div>

        <div className={styles["room-info-row"]}>
          <div>{formatNumber(num_bedroom)} bedroom</div>
          <div>{formatNumber(num_bathroom)} bathroom</div>
          <div>Tối đa {formatNumber(max_guests)} khách</div>
        </div>

        {/* Search */}

        <div className={styles["booking-search"]}>

          <Form layout="vertical">

            <div className={styles["booking-grid"]}>

              <div className={styles["booking-item"]}>

                <Form.Item label="Nhận phòng">
                  <DatePicker
                    className={styles["full-width"]}
                    format="DD-MM-YYYY"
                    value={checkInDate}
                    onChange={handleCheckInChange}
                    disabledDate={disabledCheckInDate}
                  />
                </Form.Item>

              </div>

              <div className={styles["booking-item"]}>

                <Form.Item label="Trả phòng">
                  <DatePicker
                    className={styles["full-width"]}
                    format="DD-MM-YYYY"
                    value={checkOutDate}
                    onChange={handleCheckOutChange}
                    disabledDate={disabledCheckOutDate}
                  />
                </Form.Item>

              </div>

              <div className={styles["booking-item"]}>

                <Form.Item label="Số khách">
                  <Select
                    value={guestCount}
                    onChange={handleGuestChange}
                  >
                    {Array.from({ length: max_guests }, (_, index) => (
                      <Option key={index + 1} value={index + 1}>
                        {index + 1} khách
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

              </div>

              <div className={`${styles["availability-box"]} ${isRoomAvailable ? styles["available-bg"] : styles["notAvailable-bg"]}`}>
                <div className={styles["available-title"]}>
                  {
                    isCheckingRoomAvailability ?
                      <div className={styles["spiner"]}>
                        <SpinLoader />
                      </div>
                      : isRoomAvailable ? "Phòng có sẵn" : <p className={styles["notAvailable-text"]}>Phòng không có sẵn</p>
                  }
                </div>

                <div className={styles["available-subtitle"]}>
                  {
                    isCheckingRoomAvailability ? <p className={styles["checking-text"]}>Đang kiểm tra phòng</p> : isRoomAvailable ? " Sẵn sàng đặt phòng" : ""
                  }
                </div>
              </div>

            </div>

          </Form>

        </div>
        {
          !isRoomAvailable && conflictDates.length > 0 && <RoomUnavailable unavailableDates={conflictDates} />
        }


        {/* Description */}

        <section className={styles["section"]}>

          <h2>
            Giới thiệu về phòng
          </h2>

          <p>{parse(description || "")}</p>

          <a href="#">
            Xem thêm
          </a>

        </section>

        {/* Amenities */}

        <section className={styles["section"]}>

          <h2>
            Tiện ích nổi bật
          </h2>

          <div className={styles["amenities-grid"]}>
            {
              furnitures.map((furnitureId) => {
                const furnitureOption = funituresOptions.find((option) => option.id === furnitureId);
                return furnitureOption ? <div>{furnitureOption.name}</div>: "";
              })
            }
          </div>

        </section>

        {/* Tabs */}

        <div className={styles["room-tabs"]}>

          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Vị trí",
                children: (
                  <div className={styles["location-grid"]}>

                    <div className={styles["map-box"]}>
                      MAP
                    </div>

                    <div className={styles["location-info"]}>

                      <h3>Vị trí</h3>

                      <p>
                        Ashfield, Sydney, Australia
                      </p>

                      <p>
                        Nằm ở khu vực yên tĩnh,
                        gần các tiện ích và phương
                        tiện di chuyển.
                      </p>

                    </div>

                  </div>
                ),
              },
              {
                key: "2",
                label: "Phòng của bạn",
                children: "Thông tin phòng"
              },
              {
                key: "3",
                label: "Quy định",
                children: "Quy định"
              },
              {
                key: "4",
                label: "Đánh giá",
                children: "Đánh giá"
              },
            ]}
          />

        </div>

      </div>

      {/* RIGHT */}

      <div className={styles["content-right"]}>

        <div className={styles["booking-card"]}>

          <div className={styles["price-label"]}>
            Giá mỗi đêm
          </div>

          <div className={styles["price"]}>
            {formatNumber(price)}
            <span>đ/ đêm</span>
          </div>

          <div className={styles["summary-row"]}>
            <span>{nightsCount > 0 ? `${nightsCount} đêm` : '—'}</span>
            <span>{formatNumber(subtotal)}đ</span>
          </div>

          <div className={styles["summary-row"]}>
            <span>Phí dịch vụ</span>
            <span>{formatNumber(0)}đ</span>
          </div>

          <div className={styles["summary-row"]}>
            <span>Thuế & phí</span>
            <span>{formatNumber(0)}đ</span>
          </div>

          <div className={styles["total"]}>

            <div>
              Tổng tiền
            </div>

            <div>{formatNumber(subtotal)}đ</div>

          </div>

          <Button
            type="primary"
            size="large"
            onClick={booking}
            disabled={nightsCount <= 0}
            block
          >
            Đặt phòng ngay
          </Button>

          <Button
            size="large"
            block
            style={{ marginTop: 12 }}
          >
            Lưu phòng này
          </Button>

          <div className={styles["fee-note"]}>
            Bạn chưa bị tính phí
          </div>

        </div>

        <div className={styles["cancel-card"]}>

          <h4>
            Chính sách hủy
          </h4>

          <p>
            Hủy miễn phí trước 3 ngày
            nhận phòng.
          </p>

        </div>

      </div>

    </div>
  )
}

Content.propTypes = {

}

export default Content
