import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getAddressHistory, updateAddressHistory, getAddressResult } from '../Actions/AddressHistoryActions'
import { setAddressHistoryData, setLoadingAddressHistory, resetData, setOptionAddressSearchResult } from '../slices/AddressHistorySlice'
import { Service } from '@/Services/AddressHistoryServices'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { v4 as uuidv4 } from 'uuid'
import { Notification } from '@/common/FunctionCommon/Notification'
import { addressServices } from '@/Services/SearchAddressServices'
import { addressHistoryApi } from '@/RTK_Query/AddressHistory_Query'

function* handleGetAddressHisoryApi() { //sẽ xóa
    yield put(setLoadingAddressHistory(true))
    try {
        const res = yield call(Service.getAddressHistoryApi)
        if (res.data.isError === false) {
            const { current_address, previous_address } = res.data.data
            let arrData = []
            if (current_address) {
                let currentObject = JSON.parse(JSON.stringify(current_address))
                currentObject.id = uuidv4()
                currentObject.typeAddress = 'CURRENT'
                arrData.push(currentObject)
            }
            if (previous_address) {
                previous_address.forEach(el => {
                    let previousObject = JSON.parse(JSON.stringify(el))
                    previousObject.id = uuidv4()
                    previousObject.typeAddress = 'PREVIOUS'
                    arrData.push(previousObject)
                })
            }
            yield put(setAddressHistoryData(arrData))
            yield put(setLoadingAddressHistory(false))
        } else {
            yield put(setLoadingAddressHistory(false))
            yield put(resetData())
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getAddressHistory,
            actionPayload: null,
            dispatchLoading: setLoadingAddressHistory
        }
        yield* handleEror(payloadError)
        yield put(resetData())
    }
}

function* handleUpdateAddressHisotyApi(action) {
    const { data, navigate } = action.payload
    yield put(setLoadingAddressHistory(true))
    try {
        const res = yield call(Service.updateAddressHistoryApi, data)
        if (res.data.isError === false) {
            navigate('/renter-profile')
            yield put(setLoadingAddressHistory(false))
            yield put(setOptionAddressSearchResult([]))
            yield put(addressHistoryApi.util.invalidateTags([{ type: 'addressHistoryDetail', id: 'ADDRESS_HISTORY_DETAIL' }]))
        } else {
            Notification.openNotificationError('Data update failed. Please try again')
            yield put(setLoadingAddressHistory(false))
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: updateAddressHistory,
            actionPayload: action.payload,
            dispatchLoading: setLoadingAddressHistory
        }
        yield* handleEror(payloadError)
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
        yield put(setLoadingAddressHistory(false))
    }
}
function* handleGetOptionsAddressSearchApi(action) { //sẽ xóa
    const { data, } = action.payload
    try {
        const res = yield call(addressServices.searchAddressApi, data)
        if (res.data.isError === false) {
            yield put(setOptionAddressSearchResult(res.data.data))
        } else {
            yield put(setOptionAddressSearchResult([]))
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getAddressResult,
            actionPayload: action.payload,
            dispatchLoading: setLoadingAddressHistory
        }
        yield* handleEror(payloadError)
        yield put(setOptionAddressSearchResult([]))
    }
}

function* getAddressHisotySaga() { //sẽ xóa
    yield takeEvery(getAddressHistory, handleGetAddressHisoryApi)
}
function* updateAddressHisotySaga() {
    yield takeEvery(updateAddressHistory, handleUpdateAddressHisotyApi)
}
function* getOptionsAddressSearchSaga() {//sẽ xóa
    yield takeEvery(getAddressResult, handleGetOptionsAddressSearchApi)
}

export function* addressHistorySagaList() {
    yield all([
        getAddressHisotySaga(), //sẽ xóa
        updateAddressHisotySaga(),
        getOptionsAddressSearchSaga() //sẽ xóa
    ])
}
