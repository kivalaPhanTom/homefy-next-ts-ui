import { all, put, call, takeLatest } from 'redux-saga/effects'
import { getPersonalDetail, updatePersonalDetail } from '../Actions/PersonalDetailAction'
import { Service } from '@/Services/PersonalDetailService'
import { setPersonalDetailInfo, setLoadingPersonalDetail, resetData } from '../slices/PersonalDetailSlice'
import { Notification } from '@/common/FunctionCommon/Notification'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { personalDetailApi } from '@/RTK_Query/Personal_Detail_Query'

function* handleGetPersonalDetailApi() {//sẽ xóa
    yield put(setLoadingPersonalDetail(true))
    try {
        const res = yield call(Service.getPersonalDetailApi)
        if (res.data.isError === false) {
            yield put(setPersonalDetailInfo(res.data.data))
            yield put(setLoadingPersonalDetail(false))
        } else {
            yield put(setLoadingPersonalDetail(false))
        }
    } catch (error) {
        const isCallRefreshToken = handleError(error)
        if (isCallRefreshToken) {
            const payloadSendRefreshToken = {
                functionDispatch: getPersonalDetail,
                actionPayload: null,
                dispatchLoading: setLoadingPersonalDetail
            }
            yield put(getRefreshToken(payloadSendRefreshToken))
        } else {
            yield put(setLoadingPersonalDetail(false))
        }
        yield put(resetData())
    }
}

function* handleUpdatePersonalApi(action) {
    const { data, navigate } = action.payload
    yield put(setLoadingPersonalDetail(true))
    try {
        const res = yield call(Service.updatePersonalDetailApi, data)
        if (res.data.isError === false) {
            Notification.openNotificationSuccess('Updated data successfully')
            navigate('/renter-profile')
            yield put(personalDetailApi.util.invalidateTags([{ type: 'personalDetail', id: 'PERSONAL_DETAIL' }]))
        } else {
            Notification.openNotificationError('Data update failed. Please try again')
            yield put(setLoadingPersonalDetail(false))
        }
    } catch (error) {
        const isCallRefreshToken = handleError(error)
        if (isCallRefreshToken) {
            const payloadSendRefreshToken = {
                functionDispatch: getPersonalDetail,
                actionPayload: action.payload,
            }
            yield put(getRefreshToken(payloadSendRefreshToken))
        } else {
            yield put(setLoadingPersonalDetail(false))
        }
    }
}

function* getPersonalDetailSaga() {//sẽ xóa
    yield takeLatest(getPersonalDetail, handleGetPersonalDetailApi)
}
function* updatePersonalDetailSaga() {
    yield takeLatest(updatePersonalDetail, handleUpdatePersonalApi)
}
export function* personalDetailSagaList() {
    yield all([
        getPersonalDetailSaga(),//sẽ xóa
        updatePersonalDetailSaga()
    ])
}
