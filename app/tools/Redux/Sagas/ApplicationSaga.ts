import { all, takeLatest, put, call } from 'redux-saga/effects'
import { Service } from '@/Services/ApplicationsServices'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { getApplication, createApplication } from '../Actions/ApplicationAction'
import { setLoading } from '../slices/LoadingSlice'
import {setApplicationInfo} from '../slices/ApplicationSlice'
import { Service as ProductServices } from '@/Services/ProductServices'

function* handleCreateApplicationApi(action) {
    const { data } = action.payload
    yield put(setLoading(true))
    try {
        const res = yield call(Service.createApplicationApi, data)
        if (res.data.isError === false) {
            yield put(setLoading(false))
        } else {
            Notification.openNotificationError(res.data.errorMsg)
            yield put(setLoading(false))
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: createApplication,
            actionPayload: action.payload,
            dispatchLoading: setLoading
        }
        yield* handleEror(payloadError)
    }
}

function* handleGetApplicationApi(action) {
    const { data } = action.payload
    yield put(setLoading(true))
    try {
        const resProductDetail = yield call(ProductServices.getDetailProductApi, data)
        if (resProductDetail.data.isError === false) {
            let productInfo = resProductDetail.data.data
            // const resApplicationDetail = yield call(Service.getApplicationApi, data)
            // if (resApplicationDetail.data.isError === false) {

            // }else{

            // }
            // console.log('resProductDetail:', resProductDetail)
            yield put(setApplicationInfo(productInfo))
            yield put(setLoading(false))
        } else {
            yield put(setLoading(false))
            yield put(setApplicationInfo(null))
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getApplication,
            actionPayload: null,
            dispatchLoading: setLoading
        }
        yield* handleEror(payloadError)
        yield put(setApplicationInfo(null))
    }
}

function* handleEror(payloadError) {
    const { error, functionDispatch, actionPayload, dispatchLoading } = payloadError
    const isCallRefreshToken = handleError(error)
    if (isCallRefreshToken) {
        const payloadSendRefreshToken = {
            functionDispatch,
            actionPayload,
            dispatchLoading
        }
        yield put(getRefreshToken(payloadSendRefreshToken))
    } else {
        yield put(setLoading(false))
    }
}


function* createApplicationSaga() {
    yield takeLatest(createApplication, handleCreateApplicationApi)
}
function* handleGetApplicationSaga() {
    yield takeLatest(getApplication, handleGetApplicationApi)
}

export function* applicationSagaList() {
    yield all([
        createApplicationSaga(),
        handleGetApplicationSaga()
    ])
}
