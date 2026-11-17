'use client'
import { useState, useEffect } from 'react'
import { MdMailOutline } from 'react-icons/md'
import 'react-responsive-modal/styles.css'
import Image from 'next/image'
import { Form, Button } from 'antd'
import { TfiLock } from 'react-icons/tfi'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from 'react-responsive-modal'
import { LuUser } from 'react-icons/lu'
import styles from './SignUpPopup.module.scss'
import logo from '@/assets/Homefy-logo.webp'
import { setOpenPopup } from '@/Redux/slices/SignUpSlice'
import { setOpenPopupSignIn } from '@/Redux/slices/SignInSlice'
// import PhoneNumberInputComponent from '../PhoneNumberInput/PhoneNumberInput.jsx'
// import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { sigupAccount } from '@/Redux/Actions/UserAction'
import { USER_ROLE } from '@/common/ParamsCommon/ParamsCommon'
import TextInput from '@/components/Controlls/TextInput/TextInput'
import EmailInput from '@/components/Controlls/EmailInput/EmailInput'
import PasswordInput from '@/components/Controlls/PasswordInput/PasswordInput'
import WavyLoading from '@/components/WavyLoading/WavyLoading'
import type { RootState } from '@/Redux/store'
import type { FormInstance } from 'antd';

function SignUpPopup() {
    const dispatch = useDispatch()
    const { isOpenPop } = useSelector((state: RootState) => state.signUpSlice)
    const { isLoading } = useSelector((state: RootState) => state.loadingSlice)
    const [passwordVisible, setPasswordVisible] = useState(false)

    const [form] = Form.useForm()

    useEffect(() => {
        if (isOpenPop) {
            form.resetFields()
        }
    }, [isOpenPop])

    // const handeSetPhoneNumber = (value) => {
    //     if (value) {
    //         if (isPossiblePhoneNumber(value)) {
    //             setIsErrorPhoneNumber(false)
    //         } else {
    //             setIsErrorPhoneNumber(true)
    //         }
    //     } else {
    //         setIsErrorPhoneNumber(true)
    //     }
    //     setPhoneNumber(value)
    // }

    const onCloseModal = (): void => {
        dispatch(setOpenPopup(false))
    }

    const handleOpenSignInPopup = (): void => {
        dispatch(setOpenPopupSignIn(true))
        onCloseModal()
    }

    const onFinish = (values: any): void => {
        // let checkManual = handleValidateManual()
        // if (checkManual) {
        //     let data = JSON.parse(JSON.stringify(values))
        //     data.phone = phoneNumber
        //     const payload = {
        //         data,
        //         langguage: ''
        //     }
        //     dispatch(sigupAccount(payload))
        // }
        let data = JSON.parse(JSON.stringify(values))
        // data.role = USER_ROLE.normalUser
        delete data.confirmPassword
        // data.phone = phoneNumber
        const payload = {
            data,
            langguage: ''
        }
        dispatch(sigupAccount(payload))
    }

    // const handleValidateManual = () => {
    //     let result = true
    //     if (phoneNumber) {
    //         if (isPossiblePhoneNumber(phoneNumber)) {
    //             setIsErrorPhoneNumber(false)
    //         } else {
    //             setIsErrorPhoneNumber(true)
    //             result = false
    //         }
    //     } else {
    //         setIsErrorPhoneNumber(true)
    //     }
    //     return result
    // }

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
                            <p className={styles['headerTitle']}>Đăng ký</p>
                            <p className={styles['headerDescription']}>Tạo tài khoản và bắt đầu khám phá</p>
                        </div>

                        {/* USERNAME */}
                        <div className={styles['inputItem']}>
                            <TextInput
                                name='username'
                                placeholder='Tên người dùng'
                                prefix={<LuUser className={styles['iconInputControl']} />}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên người dùng'
                                    }
                                ]}
                            />
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


                        {/* PHONE NUMBER */}
                        {/* <div className={styles['inputItem']}> */}
                        {/* <PhoneNumberInputComponent
                                value={phoneNumber}
                                onSetValue={handeSetPhoneNumber}
                                isError={isErrorPhoneNumber}
                            /> */}
                        {/* </div> */}
                        {/* <Form.Item
                            style={{
                                marginTop: 0,
                                marginBottom: 0,
                            }}
                            name='phone'
                            rules={[
                                {
                                    required: true,
                                    message: 'Phone number is required'
                                }
                            ]}
                        >
                            <div className={styles['inputItem']}>
                                <PhoneNumberInputComponent
                                    value={phoneNumber}
                                    onSetValue={handeSetPhoneNumber}
                                    isError={isErrorPhoneNumber}
                                />
                            </div>
                        </Form.Item> */}

                        {/* PASSWORD */}
                        <div className={styles['inputItem']}>
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



                        {/* CONFIRM PASSWORD */}
                        <div className={styles['inputItem']}>
                            <PasswordInput
                                name='confirmPassword'
                                placeholder='Xác nhận mật khẩu'
                                prefix={<TfiLock className={styles['iconInputControl']} />}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng xác nhận mật khẩu'
                                    },
                                    ({ getFieldValue }: FormInstance) => ({
                                        validator(_: unknown, value: string) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                        },
                                    }),
                                ]}
                            />
                        </div>



                        <div className={styles['loginBtnArea']}>
                            <div className={styles['loginBtn']}>
                                <Button type='primary' htmlType='submit' onClick={() => { }}>{isLoading ? <WavyLoading /> : 'Tạo tài khoản'}</Button>
                            </div>
                        </div>
                        <p className={styles['textNoAccount']}>Đã có tài khoản? <span onClick={handleOpenSignInPopup}> Đăng nhập</span></p>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default SignUpPopup
