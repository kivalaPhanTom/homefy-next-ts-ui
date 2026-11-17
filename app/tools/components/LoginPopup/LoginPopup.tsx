'use client'
import 'react-responsive-modal/styles.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Modal } from 'react-responsive-modal'
import { useSelector, useDispatch } from 'react-redux'
import { MdMailOutline } from 'react-icons/md'
import { Form, Button } from 'antd'
import { TfiLock } from 'react-icons/tfi'
import styles from './LoginPopup.module.scss'
import logo from '@/assets/Homefy-logo.webp'
import googleIcon from '@/assets/googleIcon.svg'
import appleIcon from '@/assets/appleIcon.svg'
import facebookIcon from '@/assets/facebookIcon.svg'
import { setOpenPopup } from '@/Redux/slices/SignUpSlice'
import { setOpenPopupSignIn } from '@/Redux/slices/SignInSlice'
import { loginAction } from '@/Redux/Actions/LoginActions'
import { setOpenPopup as setOpenPopupForgotPassword } from '@/Redux/slices/ForgotPasswordSlice'
import TextInput from '@/components/Controlls/TextInput/TextInput'
import PasswordInput from '@/components/Controlls/PasswordInput/PasswordInput'
import WavyLoading from '@/app/tools/components/WavyLoading/WavyLoading'
import type { RootState } from '@/Redux/store'

function LoginPopup() {
    // const { cookieStore } = props
    const dispatch = useDispatch()
    const router = useRouter()
    const { isOpenPop } = useSelector((state: RootState) => state.signInSlice)
    const { isLoading } = useSelector((state: RootState) => state.loadingSlice)
    const [form] = Form.useForm()

    const onCloseModal = (): void => {
        dispatch(setOpenPopupSignIn(false))
    }
    const handleOpenSignUpPopup = (): void => {
        dispatch(setOpenPopup(true))
        onCloseModal()
    }
    const onFinish = (values: any) => {
        const payload = {
            data: values,
            language: '',
            cookieStore:null,
            router
        }
        dispatch(loginAction(payload))
    }
    const handleOpenForgotPasswordPopup = (): void => {
        dispatch(setOpenPopupForgotPassword(true))
        onCloseModal()
    }

    return (
        <Modal
            classNames={{
                modal: styles.modalLogin,
            }}
            open={isOpenPop}
            onClose={onCloseModal}
            center
        >
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
                            <p className={styles['headerTitle']}>Đăng nhập</p>
                            <p className={styles['headerDescription']}>Đăng nhập bằng tên người dùng và mật khẩu của bạn</p>
                        </div>

                        {/* USERNAME */}
                        <TextInput
                            name='username'
                            placeholder='Tên người dùng'
                            prefix={<MdMailOutline className={styles['iconInputControl']} />}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên người dùng'
                                },
                            ]}
                        />

                        {/* PASSWORD */}
                        <div className={styles['passwordInput']}>
                            <PasswordInput
                                name='password'
                                placeholder='Mật khẩu'
                                prefix={<TfiLock className={styles['iconInputControl']} />}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu'
                                    },
                                ]}
                            />
                        </div>
                        <p className={styles['txtForgotPassword']} onClick={handleOpenForgotPasswordPopup}>Quên mật khẩu ?</p>

                        <div className={styles['loginBtnArea']}>
                            <div className={styles['loginBtn']}>
                                <Button type='primary' htmlType='submit'>{!isLoading ? 'Đăng nhập' : <WavyLoading />}</Button >
                            </div>
                            <p className={styles['orTxt']}>Hoặc</p>
                            <div className={styles['socialLoginBtn']}>
                                <div className={styles['socialLoginBtnItem']}>
                                    <div>
                                        <Image src={googleIcon} alt='social icon' />
                                    </div>
                                </div>
                                <div className={styles['socialLoginBtnItem']}>
                                    <div>
                                        <Image src={appleIcon} alt='social icon' />
                                    </div>
                                </div>
                                <div className={styles['socialLoginBtnItem']}>
                                    <div>
                                        <Image src={facebookIcon} alt='social icon' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className={styles['textNoAccount']}>Chưa có tài khoản? <span onClick={handleOpenSignUpPopup}> Đăng ký</span></p>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default LoginPopup
