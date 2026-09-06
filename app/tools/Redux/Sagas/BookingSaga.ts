import { all, put, call, takeEvery } from 'redux-saga/effects'
import { createBooking, getBooking } from '../Actions/BookingAction'
import { Service } from '@/Services/BookingServices'
import { setBookingDetail } from '../slices/BookingSlice'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { clearAuthen } from '../Actions/TokenAction'
import { saveLocalStorage } from '@/common/FunctionCommon/FunctionCommon'
import { BOOKING_CODE_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'

function* handleCreateBookingApi(action: any): Generator<any, void, unknown> {
    const { data, navigate } = action.payload
    // let { dataAboutMe, formDataFile, oldFile, isCallUploadApi } = data
    // yield put(setLoadingAboutMe(true))
    try {
        const res: any = yield call(Service.reservations, data)
        if (res.data.code === 200) {
            const bookingId = res.data.result.booking_id
            saveLocalStorage(BOOKING_CODE_IN_LOCALSTORAGE, res.data.result.booking_code)
            if (navigate) navigate(bookingId)
        }

        // yield put(setLoadingAboutMe(false))
    } catch (error) {
        if (error?.response?.data?.code === 1008 && error?.response?.status === 400) {
            Notification.openNotificationError("Phòng này không còn trống để đặt")
        } else {

        }
        // const payloadError = {
        //     error: error,
        //     functionDispatch: setAboutMeInfo,
        //     actionPayload: action.payload,
        //     dispatchLoading: setLoadingAboutMe
        // }
        // yield* handleEror(payloadError)
    }
}

function* handleGetBookingApi(action: any): Generator<any, void, unknown> {
    const { bookingId } = action.payload

    try {
        const res: any = yield call(Service.getBooking, bookingId)
        if (res.data.code === 200) {
            yield put(setBookingDetail(res.data.result))
        }
    } catch (error) {
        console.error('Failed to get booking detail:', error)
    }
}

function* handleEror(payloadError: any) {
    // const { error, functionDispatch, actionPayload, dispatchLoading } = payloadError
    // const isErrorAuthen = handleError(error)
    // if (isErrorAuthen) {
    //     const payloadSendRefreshToken = {
    //         functionDispatch,
    //         actionPayload,
    //         dispatchLoading
    //     }
    //     yield put(getRefreshToken(payloadSendRefreshToken))
    // }else{
    //     yield put(setLoadingAboutMe(false))
    // }
}

function* createBookingSaga() {
    yield takeEvery(createBooking, handleCreateBookingApi)
}

function* getBookingSaga() {
    yield takeEvery(getBooking, handleGetBookingApi)
}


export function* bookingSagaList() {
    yield all([
        createBookingSaga(),
        getBookingSaga()
    ])
}
