'use client'
import { Modal, Button } from 'antd'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './DeletePopup.module.scss'
import WavyLoading from '@/app/tools/components/WavyLoading/WavyLoading'

interface DeletePopupType {
    isOpen: boolean,
    title: string | null,
    subtitle: string | null,
    setOpenPopup: (value: boolean) => void,
    handleOk: () => void,
    isLoading: boolean
}
function DeletePopup(props: DeletePopupType) {
    const { isOpen, title, subtitle, setOpenPopup, handleOk, isLoading } = props
    const handleCancel = () => {
        setOpenPopup(false)
    }
    return (
        <Modal
            title={''}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            className={styles['antDesignModal']}
            footer={[]}
            centered={true}
            closable={false}>
            <div className={styles['myModal']}>
                <div className={styles['modalHeader']}>
                    <div className={styles['modalHeaderContainer']}>
                        <div>
                            <p className={styles['title']}>{title}</p>
                        </div>
                        <div>
                            <AiOutlineClose className={styles['iconClose']} onClick={handleCancel} />
                        </div>
                    </div>
                </div>
                <div className={styles['modalContainerFullWidth']}>
                    <div className={styles['modalContainer']}>
                        <div className={styles['main']}>
                            <p className={styles['subtile']}>{subtitle}</p>
                        </div>
                        <div className={styles['footer']}>
                            <div className={styles['listBtnAction']}>
                                <div className={styles['listBtnActionContainer']}>
                                    <Button className={styles['btnItem'] + ' ' + styles['cancelBtn']} onClick={handleCancel}>Cancel</Button>
                                    <Button onClick={handleOk} className={styles['btnItem'] + ' ' + styles['saveAndBackBtn']}> {isLoading ? <WavyLoading /> : 'Delete'}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default DeletePopup
