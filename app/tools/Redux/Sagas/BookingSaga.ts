import { all, put, call, takeEvery } from 'redux-saga/effects'
import { createBooking } from '../Actions/BookingAction'
import { Service } from '@/Services/BookingServices'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { clearAuthen } from '../Actions/TokenAction'

function* handleCreateBookingApi(action) {
    const { data, navigate } = action.payload
    // let { dataAboutMe, formDataFile, oldFile, isCallUploadApi } = data
    // yield put(setLoadingAboutMe(true))
    try {
         const res = yield call(Service.reservations, data)
          if (res.data.code === 200) {
            const bookingId = res.data.result.booking_id
            if(navigate) navigate(bookingId)
          }
       
        yield put(setLoadingAboutMe(false))
    } catch (error) {
        // const payloadError = {
        //     error: error,
        //     functionDispatch: setAboutMeInfo,
        //     actionPayload: action.payload,
        //     dispatchLoading: setLoadingAboutMe
        // }
        // yield* handleEror(payloadError)
    }
}

function* handleEror(payloadError) {
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


export function* bookingSagaList() {
    yield all([
        createBookingSaga()
    ])
}
