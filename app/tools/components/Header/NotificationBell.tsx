'use client'

import { useState } from 'react';
import { Popover } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { IoNotificationsOutline } from 'react-icons/io5';
import {
    HiOutlineCalendarDays,
    HiOutlineCreditCard,
    HiOutlineGift,
    HiOutlineInformationCircle,
} from 'react-icons/hi2';
import styles from './NotificationBell.module.scss';
import { handleCheckUserTokenExits } from '@/common/FunctionCommon/FunctionCommonForClientComponent';

dayjs.extend(relativeTime);
dayjs.locale('vi');

type NotificationType = 'booking' | 'payment' | 'promo' | 'system';

interface AppNotification {
    id: number;
    type: NotificationType;
    title: string;
    description: string;
    time: string;
    isRead: boolean;
}

const TYPE_ICON: Record<NotificationType, React.ReactNode> = {
    booking: <HiOutlineCalendarDays />,
    payment: <HiOutlineCreditCard />,
    promo: <HiOutlineGift />,
    system: <HiOutlineInformationCircle />,
};

// TODO: thay bằng API thật khi backend có bảng notifications
const MOCK_NOTIFICATIONS: AppNotification[] = [
    {
        id: 1,
        type: 'booking',
        title: 'Đặt phòng thành công',
        description: 'Bạn đã đặt phòng "Ocean View Homestay" cho 2 khách. Kiểm tra email để xem chi tiết.',
        time: dayjs().subtract(15, 'minutes').toISOString(),
        isRead: false,
    },
    {
        id: 2,
        type: 'payment',
        title: 'Thanh toán hoàn tất',
        description: 'Giao dịch 1.200.000đ cho booking #HF1024 đã được xác nhận.',
        time: dayjs().subtract(2, 'hours').toISOString(),
        isRead: false,
    },
    {
        id: 3,
        type: 'promo',
        title: 'Ưu đãi cuối tuần',
        description: 'Giảm 20% cho các đặt phòng từ thứ Sáu đến Chủ Nhật này. Nhập mã HOMEFY20.',
        time: dayjs().subtract(1, 'day').toISOString(),
        isRead: false,
    },
    {
        id: 4,
        type: 'system',
        title: 'Chào mừng đến HOMEFY',
        description: 'Tài khoản của bạn đã sẵn sàng. Khám phá các chỗ nghỉ tuyệt vời ngay!',
        time: dayjs().subtract(3, 'days').toISOString(),
        isRead: true,
    },
];

function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);

    if (!handleCheckUserTokenExits()) return null;

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const handleMarkAllRead = (): void => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    };

    const handleClickItem = (id: number): void => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    };

    const panel = (
        <div className={styles['panel']}>
            <div className={styles['panelHeader']}>
                <p className={styles['panelTitle']}>Thông báo</p>
                {unreadCount > 0 && (
                    <button className={styles['markAllBtn']} type='button' onClick={handleMarkAllRead}>
                        Đánh dấu đã đọc
                    </button>
                )}
            </div>
            <div className={styles['panelList']}>
                {notifications.length === 0 ? (
                    <div className={styles['empty']}>
                        <IoNotificationsOutline />
                        <p>Chưa có thông báo nào</p>
                    </div>
                ) : (
                    notifications.map((item) => (
                        <button
                            key={item.id}
                            type='button'
                            className={`${styles['item']} ${item.isRead ? '' : styles['itemUnread']}`}
                            onClick={() => handleClickItem(item.id)}
                        >
                            <span className={`${styles['itemIcon']} ${styles[`icon_${item.type}`]}`}>
                                {TYPE_ICON[item.type]}
                            </span>
                            <span className={styles['itemContent']}>
                                <span className={styles['itemTitle']}>{item.title}</span>
                                <span className={styles['itemDescription']}>{item.description}</span>
                                <span className={styles['itemTime']}>{dayjs(item.time).fromNow()}</span>
                            </span>
                            {!item.isRead && <span className={styles['unreadDot']} />}
                        </button>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger='click'
            placement='bottomRight'
            arrow={false}
            content={panel}
        >
            <button className={styles['bellBtn']} type='button' aria-label='Thông báo'>
                <IoNotificationsOutline />
                {unreadCount > 0 && <span className={styles['badge']}>{unreadCount > 9 ? '9+' : unreadCount}</span>}
            </button>
        </Popover>
    );
}

export default NotificationBell;
