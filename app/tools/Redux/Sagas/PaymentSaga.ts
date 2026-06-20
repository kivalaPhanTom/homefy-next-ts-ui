import { all, put, call, takeEvery } from 'redux-saga/effects'
import { confirmPayment } from '../Actions/PaymentAction'
import { Service } from '@/Services/PaymentServices'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { clearAuthen } from '../Actions/TokenAction'

function* handleConfirmPaymentApi(action) {
    const { data, navigate } = action.payload
    // let { dataAboutMe, formDataFile, oldFile, isCallUploadApi } = data
    // yield put(setLoadingAboutMe(true))
    try {
          const res = yield call(Service.payment, data)
          if (res.data.code === 200) {
            const bookingId = res?.data?.result?.bookingId
            if(bookingId && navigate) navigate(bookingId)
          }


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

function* confirmPaymentSaga() {
    yield takeEvery(confirmPayment, handleConfirmPaymentApi)
}


export function* paymentSagaList() {
    yield all([
        confirmPaymentSaga()
    ])
}
