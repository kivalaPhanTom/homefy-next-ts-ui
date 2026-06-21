/* eslint-disable no-useless-escape */
// 'use client'
import dayjs from 'dayjs'
import { MONTH_FORMAT, DATE_FORMAT } from '../ParamsCommon/ParamsCommon'
// import { useSearchParams } from 'react-router-dom'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { Notification } from './Notification'
// import { useSearchParams } from 'next/navigation'
import { TOKEN_IN_LOCALSTORAGE, USER_TOKEN, EXPIRED_TIME_TOKEN, REFRESH_TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { Service as UserService } from '@/Services/UserServices'
import { authenNextServer } from '@/Services/NextAuthenServer'
import { getCookie } from '@/common/FunctionCommon/FunctionCommonForClientComponent'

export function vhToPixels(vh:number): number {
    return Math.round(window.innerHeight / (100 / vh))
}

export function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email)
}

export function convertTimeRawValueToTimeStamp(rawValue) {
    const d = new Date(rawValue)
    return d.getTime()
}
export function renderTextMonthValue(timestamp:string, langObject):string {
    const d = new Date(timestamp)
    let month = d.getMonth() + 1
    let monthTxt = ''
    let year = d.getFullYear()
    switch (month) {
        case 1:
            monthTxt = 'Jan'
            break;

        case 2:
            monthTxt = 'Feb'
            break;

        case 3:
            monthTxt = 'Mar'
            break;

        case 4:
            monthTxt = 'Apr'
            break;

        case 5:
            monthTxt = 'May'
            break;

        case 6:
            monthTxt = 'Jun'
            break;

        case 7:
            monthTxt = 'Jul'
            break;

        case 8:
            monthTxt = 'Aug'
            break;

        case 9:
            monthTxt = 'Sep'
            break;

        case 10:
            monthTxt = 'Oct'
            break;

        case 11:
            monthTxt = 'Nov'
            break;

        case 12:
            monthTxt = 'Dec'
            break;
        default:
            break;
    }
    return `${monthTxt} ${year}`
}
export function renderTextDayMonthValue(timestamp, langObject) {
    const d = new Date(timestamp)
    let day = d.getDate()
    if (day < 10) day = `0${day}`

    let month = d.getMonth() + 1
    let monthTxt = ''
    let year = d.getFullYear()
    switch (month) {
        case 1:
            monthTxt = 'Jan'
            break;

        case 2:
            monthTxt = 'Feb'
            break;

        case 3:
            monthTxt = 'Mar'
            break;

        case 4:
            monthTxt = 'Apr'
            break;

        case 5:
            monthTxt = 'May'
            break;

        case 6:
            monthTxt = 'Jun'
            break;

        case 7:
            monthTxt = 'Jul'
            break;

        case 8:
            monthTxt = 'Aug'
            break;

        case 9:
            monthTxt = 'Sep'
            break;

        case 10:
            monthTxt = 'Oct'
            break;

        case 11:
            monthTxt = 'Nov'
            break;

        case 12:
            monthTxt = 'Dec'
            break;
        default:
            break;
    }
    return `${day} ${monthTxt} ${year}`
}
export function converTimeStampToDayJsMonth(timestamp: number) {
    const d = new Date(timestamp)
    let month = d.getMonth() + 1
    if (month < 9) {
        month = `0${month}`
    }
    const year = d.getFullYear()
    return dayjs(`${month}/${year}`, MONTH_FORMAT)
}
export function converTimeStampToDayJsDate(timestamp: number) {
    const d = new Date(timestamp)

    let day = d.getDate()
    if (day < 10) day = `0${day}`

    let month = d.getMonth() + 1
    if (month < 9) {
        month = `0${month}`
    }
    const year = d.getFullYear()
    return dayjs(`${day}/${month}/${year}`, DATE_FORMAT)
}
// export function renderQueryString() {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     // const [searchParams] = useSearchParams()
//     // const searchParams = useSearchParams()
//     // const searchParamsObject = Object.fromEntries([...searchParams])
//     // return searchParamsObject
//     return {}

// }

export function formatNumber(numberValue: number): string {
    let result = '0'
    if (numberValue) result = numberValue.toLocaleString('en-US')
    return result
}

export function getCountryCodeFromPhoneNumber(value:string): string {
    let result = '0'
    const phoneNumberObj = parsePhoneNumberFromString(value)
    if (phoneNumberObj) {
        const countryCode = phoneNumberObj.countryCallingCode
        result = countryCode
    }
    return result
}
export function getPhoneNumberFromPhoneNumber(value: string): string {
    let result = '0'
    const phoneNumberObj = parsePhoneNumberFromString(value)
    if (phoneNumberObj) {
        const formattedPhoneNumber = phoneNumberObj.nationalNumber
        result = formattedPhoneNumber
    }
    return result
}

// export function checkIsCallGetRefreshToken(errorCode) {
//     let result = false
//     if (errorCode === 401) {
//         result = true
//     }
//     return result
// }

//save to local storage
export function saveLocalStorage(name: string, value: any): void {
    localStorage.setItem(name, JSON.stringify(value))
}

//get value from local storage
// export function getLocalStorage(name_localstorage) {
//     var result = localStorage.getItem(name_localstorage)
//     if (result) {
//         result = JSON.parse(result)
//     } else {
//         result = ''
//     }
//     return result
// }
export function handleError(error, lang):boolean {
    let isErrorAuthen = false;
    const expired_time = getCookie(EXPIRED_TIME_TOKEN)
    if (error.response && error.response.status === 401 && expired_time) {
        isErrorAuthen = true
    } else {
        if (error.response.data) {
            Notification.openNotificationError(error.response.data.message)
        } else {
            Notification.openNotificationError('Failed action. Please try again')
        }
    }
    return isErrorAuthen;
}
// export function handleError(error, lang) {
//     console.log('lang:', lang)
//     console.log('errorLog:', error)
//     let isCallRefreshToken = false
//     if (error.response && error.response.status === 401) {
//         isCallRefreshToken = true
//     } else {
//         if(error.response.data){
//             Notification.openNotificationError(error.response.data.errorMsg)
//         }else{
//             Notification.openNotificationError('Failed action. Please try again')
//         }
//     }
//     return isCallRefreshToken
// }
export function removeVietnameseTones(str: string):string {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    str = str.replace(/đ/g, "d")
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
    str = str.replace(/Đ/g, "D")
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
    str = str.replace(/\u02C6|\u0306|\u031B/g, "")
    str = str.replace(/ + /g, " ")
    str = str.trim()
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ")
    str = str.replace(/\s+/g, '')
    return str.toLowerCase()
}


export function clearLocalStorageByKey(key: string) {
    localStorage.removeItem(key)
}
export async function handleErrorRTKQuery(data, error, refetch, isShowError:boolean, lang) {
    const expired_time = getCookie(EXPIRED_TIME_TOKEN)
    if (error) {
        if (error.response && error.response.status === 401 && expired_time) {
            const refreshToken = getCookie(REFRESH_TOKEN_IN_LOCALSTORAGE)
            const res = await UserService.getRefeshTokenApi({ refresh_token: refreshToken });
            const { access_token, refresh_token, expired_time } = res.data.data
            await authenNextServer({
                token: access_token,
                refreshToken: refresh_token,
                expired_time
            })
            await refetch()
        } else {
            if (isShowError) {
                Notification.openNotificationError('Failed action. Please try again')
            }
        }
    } else {
        if (data && data.isError) {
            if (isShowError) {
                Notification.openNotificationError(data.errorMsg)
            }

        }
    }
}
export function checkExpiredToken(timestamp: number) {
    let result = false;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp > timestamp) {
        result = true
    }
    return result
}

