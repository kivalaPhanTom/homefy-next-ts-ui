'use client'
import { memo } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import styles from './PhoneNumberInput.module.scss'
import styleCommon from "../controller.module.scss";

// import { isPossiblePhoneNumber } from 'react-phone-number-input'
interface PhoneNumberInputProps {
    value: string;
    onSetValue: (value: string) => void;
    isError?: boolean;
    label?: string;
}
function PhoneNumberInput(props: PhoneNumberInputProps) {
    const { value, onSetValue, isError, label } = props
    const hanleChangeValue = (value: string) => {
        onSetValue(value)
    }
    return (
        <>
            {label && <p className={styleCommon['titleSection']}>{label}</p>}
            <PhoneInput
                className={styles['inputControl'] + ' ' + styles[isError === true ? 'error' : '']}
                international
                defaultCountry="RU"
                value={value}
                onChange={hanleChangeValue} />
            {
                isError ? (<p className={styles['errTxt']}>The phone number is not in the correct format</p>) : ''
            }
        </>

    )
}



export default memo(PhoneNumberInput)
