'use client';

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

const { Title, Text } = Typography;

export default function PaymentUISuccess() {
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
              src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200"
              alt="room"
              className={styles.roomImage}
            />

            <div className={styles.roomContent}>
              <Title level={4}>Room 4</Title>

              <Text type="secondary">
                1 khách • 1 đêm
              </Text>

              <div className={styles.date}>
                <span>05/10/2025</span>
                <span>→</span>
                <span>06/10/2025</span>
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