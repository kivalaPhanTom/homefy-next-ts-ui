'use client'
import { useEffect } from 'react'
import { MdMailOutline } from 'react-icons/md'
import 'react-responsive-modal/styles.css'
import Image from 'next/image'
import { Form, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from 'react-responsive-modal'
import styles from './ForgotPasswordPopup.module.scss'
import logo from '@/assets/Homefy-logo.webp'
import { setOpenPopup } from '@/Redux/slices/ForgotPasswordSlice'
import { setOpenPopupSignIn } from '@/Redux/slices/SignInSlice'
import { forgotPassword } from '@/Redux/Actions/UserAction'
import EmailInput from '@/components/Controlls/EmailInput/EmailInput'
import WavyLoading from '@/components/WavyLoading/WavyLoading'
import type { RootState } from '@/Redux/store'

function ForgotPasswordPopup() {
    const dispatch = useDispatch()
    const { isOpenPop } = useSelector((state: RootState) => state.forgotPasswordSlice)
    const { isLoading } = useSelector((state: RootState) => state.loadingSlice)

    const [form] = Form.useForm()

    useEffect(() => {
        if (isOpenPop) {
            form.resetFields()
        }
    }, [isOpenPop, form])

    const onCloseModal = (): void => {
        dispatch(setOpenPopup(false))
    }

    const handleOpenSignInPopup = (): void => {
        dispatch(setOpenPopupSignIn(true))
        onCloseModal()
    }

    const onFinish = (values: { email: string }): void => {
        const payload = {
            data: values,
            language: ''
        }
        dispatch(forgotPassword(payload))
    }

    return (
        <Modal
            classNames={{
                modal: styles.modalLogin,
            }}
            open={isOpenPop}
            onClose={onCloseModal}
            center>
            <Form
                onFinish={onFinish}
                form={form}
            >
                <div className={styles['loginPopup']}>
                    <div className={styles['loginPopupContainer']}>
                        <div className={styles['logo']}>
                            <div className={styles['logoContainer']}>
                                <Image src={logo} alt='logo' />
                            </div>
                        </div>
                        <div className={styles['headerPopup']}>
                            <p className={styles['headerTitle']}>Quên mật khẩu</p>
                            <p className={styles['headerDescription']}>Nhập địa chỉ email của bạn, chúng tôi sẽ gửi liên kết đặt lại mật khẩu</p>
                        </div>

                        {/* EMAIL */}
                        <div className={styles['inputItem']}>
                            <EmailInput
                                name='email'
                                placeholder='Địa chỉ email'
                                prefix={<MdMailOutline className={styles['iconInputControl']} />}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ email'
                                    },
                                ]}
                            />
                        </div>

                        <div className={styles['loginBtnArea']}>
                            <div className={styles['loginBtn']}>
                                <Button type='primary' htmlType='submit' onClick={() => { }}>{isLoading ? <WavyLoading /> : 'Gửi liên kết đặt lại'}</Button>
                            </div>
                        </div>
                        <p className={styles['textBackToSignIn']}>Đã nhớ mật khẩu? <span onClick={handleOpenSignInPopup}> Đăng nhập</span></p>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ForgotPasswordPopup
