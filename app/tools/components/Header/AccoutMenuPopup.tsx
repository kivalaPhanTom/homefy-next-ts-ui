'use client'
import { FiLogOut } from 'react-icons/fi'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import Link from 'next/link'
import { HiOutlineUser } from 'react-icons/hi2'
import { CiCircleList } from "react-icons/ci";
import { useDispatch } from 'react-redux'
import styles from './Header.module.scss'
import { logOut } from '@/Redux/Actions/UserAction'
import computerIcon from '@/assets/computer.png'

interface AccoutMenuPopupProps {
    setOpenPopover: (open: boolean) => void;
    username: string;
}
function AccoutMenuPopup(props: AccoutMenuPopupProps) {
    const dispatch = useDispatch()
    const router = useRouter();
    const { setOpenPopover, username } = props
    const handleClosePopover = (): void => {
        setOpenPopover(false)
    }
    const handleLogout = (): void => {
        const payload = {
            router
        }
        dispatch(logOut(payload))
        handleClosePopover()
    }

    return (
        <div className={styles.accoutMenuPopup}>
            <Link href={'/profile'} className={styles.menuAccItem} onClick={handleClosePopover}>
                <HiOutlineUser className={styles.accIcon} />
                <p>Thông tin</p>
            </Link>
            <Link href={'/booking-list'} className={styles.menuAccItem} onClick={handleClosePopover}>
                <CiCircleList className={styles.accIcon} />
                <p>Danh sách đặt phòng</p>
            </Link>
            <Link href={'/admin'} className={styles.menuAccItem} onClick={handleClosePopover}>
                <Image src={computerIcon} alt='iconAdmin' className={styles.iconComputer} />
                <p>Quản trị</p>
            </Link>
            <div className={styles.menuAccItem} onClick={handleLogout}>
                <FiLogOut className={styles.accIcon} />
                <p>Đăng xuất</p>
            </div>
        </div>
    )
}

export default AccoutMenuPopup
