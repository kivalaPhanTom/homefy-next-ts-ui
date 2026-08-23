import { all, put, call, takeEvery } from 'redux-saga/effects'
import { confirmPayment, paymentStatus } from '../Actions/PaymentAction'
import { Service } from '@/Services/PaymentServices'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { clearAuthen } from '../Actions/TokenAction'

function* handleConfirmPaymentApi(action:any): Generator<any, void, unknown> {
    const { data, navigate } = action.payload
    // let { dataAboutMe, formDataFile, oldFile, isCallUploadApi } = data
    // yield put(setLoadingAboutMe(true))
    try {
          const res:any = yield call(Service.payment, data)
          if (res.data.code === 200) {
            const paymentRedirectUrl = res?.data?.result?.paymentUrl
                        if (paymentRedirectUrl && typeof window !== 'undefined') {
                            window.location.assign(paymentRedirectUrl)
                        }
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

function* handlePaymentStatusApi(action: {
    payload: {
        data: {
            bookingId: string
            paymentStatus: string
        }
    }
}): Generator<unknown, void, unknown> {
    const { data } = action.payload
    try {
        yield call(Service.paymentStatus, data)
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

function* handleEror(payloadError:any) {
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

function* paymentStatusSaga() {
    yield takeEvery(paymentStatus, handlePaymentStatusApi)
}


export function* paymentSagaList() {
    yield all([
        confirmPaymentSaga(),
        paymentStatusSaga()
    ])
}
