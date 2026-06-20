import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getEmployment, updateEmployment } from '../Actions/EmploymentActions'
import { Service } from '@/Services/EmploymentServices'
import { setEmploymentData, setLoadingEmployment, resetData } from '../slices/EmploymentSlice'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { employmentDetailApi } from '@/RTK_Query/Employment_Query'

function* handleGetEmploymentApi() { //sẽ xóa
    yield put(setLoadingEmployment(true))
    try {
        const res = yield call(Service.getEmploymentApi)
        if (res.data.isError === false) {
            yield put(setEmploymentData(res.data.data))
            yield put(setLoadingEmployment(false))
        } else {
            Notification.openNotificationError(res.data.errorMsg)
            yield put(setLoadingEmployment(false))
            yield put(resetData())
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getEmployment,
            actionPayload: null,
            dispatchLoading: setLoadingEmployment
        }
        yield* handleEror(payloadError)
        yield put(resetData())
    }
}

function* handleUpdateEmploymentApi(action) {
    const { data, navigate } = action.payload
    yield put(setLoadingEmployment(true))
    try {
        const res = yield call(Service.updateEmploymentApi, data)
        if (res.data.isError === false) {
            navigate('/renter-profile')
            yield put(setLoadingEmployment(false))
            yield put(employmentDetailApi.util.invalidateTags([{ type: 'employmentDetail', id: 'EMPLOYMENT_DETAIL' }]))
        } else {
            Notification.openNotificationError('Data update failed. Please try again')
            yield put(setLoadingEmployment(false))
        }
    } catch (error) {
        const isCallRefreshToken = handleError(error)
        if (isCallRefreshToken) {
            const payloadSendRefreshToken = {
                functionDispatch: updateEmployment,
                actionPayload: action.payload,
                dispatchLoading: setLoadingEmployment
            }
            yield put(getRefreshToken(payloadSendRefreshToken))
        } else {
            yield put(setLoadingEmployment(false))
        }
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
        yield put(setLoadingEmployment(false))
    }
}

function* getEmploymentSaga() {//sẽ xóa
    yield takeEvery(getEmployment, handleGetEmploymentApi)
}
function* updateEmploymentSaga() {
    yield takeEvery(updateEmployment, handleUpdateEmploymentApi)
}
export function* employmentSagaList() {
    yield all([
        getEmploymentSaga(), //sẽ xóa
        updateEmploymentSaga()
    ])
}
