"use client";

import "./room-detail.css";

import { useState } from "react";
import {
  Form,
  DatePicker,
  Select,
  Tabs,
  Button,
  Rate,
} from "antd";

const { Option } = Select;

export default function RoomDetail() {
  const images = [
    "/images/room1.jpg",
    "/images/room2.jpg",
    "/images/room3.jpg",
    "/images/room4.jpg",
    "/images/room5.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="room-page">
      <div className="container">

        {/* Gallery */}

        <div className="gallery">
          <div className="gallery-main">
            <img src={selectedImage} alt="" />
          </div>

          <div className="gallery-thumbnails">
            {images.map((img) => (
              <div
                key={img}
                className={
                  selectedImage === img
                    ? "thumbnail active"
                    : "thumbnail"
                }
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt="" />
              </div>
            ))}

            <div className="thumbnail more-photo">
              +8 ảnh
            </div>
          </div>
        </div>

        {/* Content */}

        <div className="content-wrapper">

          {/* LEFT */}

          <div className="content-left">

            <h1 className="room-title">
              Room 4
            </h1>

            <div className="room-rating">
              <Rate disabled defaultValue={5} />

              <span>4.8 (32 đánh giá)</span>

              <span className="dot">•</span>

              <span>
                Nha Trang, Phường Bắc Nha Trang,
                Tỉnh Khánh Hòa, Việt Nam
              </span>
            </div>

            <div className="room-info-row">
              <div>1 bedroom</div>
              <div>1 bathroom</div>
              <div>Chia sẻ với 0 khách</div>
              <div>Tối đa 1 khách</div>
            </div>

            {/* Search */}

            <div className="booking-search">

              <Form layout="vertical">

                <div className="booking-grid">

                  <div className="booking-item">

                    <Form.Item label="Nhận phòng">
                      <DatePicker
                        className="full-width"
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>

                  </div>

                  <div className="booking-item">

                    <Form.Item label="Trả phòng">
                      <DatePicker
                        className="full-width"
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>

                  </div>

                  <div className="booking-item">

                    <Form.Item label="Số khách">
                      <Select>
                        <Option value={1}>
                          1 khách
                        </Option>

                        <Option value={2}>
                          2 khách
                        </Option>
                      </Select>
                    </Form.Item>

                  </div>

                  <div className="availability-box">
                    <div className="available-title">
                      Còn trống
                    </div>

                    <div className="available-subtitle">
                      Sẵn sàng đặt phòng
                    </div>
                  </div>

                </div>

              </Form>

            </div>

            {/* Description */}

            <section className="section">

              <h2>
                Giới thiệu về phòng
              </h2>

              <p>
                Make this Myspace your home in Sydney.
                You'll love this modern master bedroom
                with ensuite bathroom, spectacular views,
                modern décor, fully equipped kitchen and
                spacious living room.
              </p>

              <a href="#">
                Xem thêm
              </a>

            </section>

            {/* Amenities */}

            <section className="section">

              <h2>
                Tiện ích nổi bật
              </h2>

              <div className="amenities-grid">

                <div>Wi-Fi tốc độ cao</div>
                <div>Máy giặt & máy sấy</div>
                <div>Điều hòa</div>
                <div>Bãi đỗ xe riêng</div>

                <div>Phòng tắm riêng</div>
                <div>Bàn ủi</div>
                <div>TV thông minh</div>
                <div>Bồn rửa</div>

              </div>

            </section>

            {/* Tabs */}

            <div className="room-tabs">

              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    key: "1",
                    label: "Vị trí",
                    children: (
                      <div className="location-grid">

                        <div className="map-box">
                          MAP
                        </div>

                        <div className="location-info">

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

          <div className="content-right">

            <div className="booking-card">

              <div className="price-label">
                Giá mỗi đêm
              </div>

              <div className="price">
                $1
                <span>/ đêm</span>
              </div>

              <div className="summary-row">
                <span>1 đêm</span>
                <span>$1</span>
              </div>

              <div className="summary-row">
                <span>Phí dịch vụ</span>
                <span>$0</span>
              </div>

              <div className="summary-row">
                <span>Thuế & phí</span>
                <span>$0</span>
              </div>

              <div className="total">

                <div>
                  Tổng tiền
                </div>

                <div>$1</div>

              </div>

              <Button
                type="primary"
                size="large"
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

              <div className="fee-note">
                Bạn chưa bị tính phí
              </div>

            </div>

            <div className="cancel-card">

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
      </div>
    </div>
  );
}