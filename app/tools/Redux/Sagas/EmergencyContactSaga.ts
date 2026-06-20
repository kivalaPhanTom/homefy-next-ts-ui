import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getEmergencyContact, updateEmergencyContact } from '../Actions/EmergencyContactActions'
import { Service } from '@/Services/EmergencyContactServices'
import { setEmergencyInfo, setLoadingsetEmergency, resetData } from '../slices/EmergencyContactSlice'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { emergencyContactApi } from '@/RTK_Query/EmergencyContact_Query'

function* handleGetEmergencyApi() { //sẽ xóa
  yield put(setLoadingsetEmergency(true))
  try {
    const res = yield call(Service.getEmergencyContactApi)
    if (res.data.isError === false) {
      yield put(setEmergencyInfo(res.data.data))
      yield put(setLoadingsetEmergency(false))
    } else {
      yield put(setLoadingsetEmergency(false))
      yield put(resetData())
    }
  } catch (error) {
    const payloadError = {
      error: error,
      functionDispatch: getEmergencyContact,
      actionPayload: null,
      dispatchLoading: setLoadingsetEmergency
    }
    yield* handleEror(payloadError)
    yield put(resetData())
  }
}

function* handleUpdateEmergencyContactApi(action) {
  const { data, navigate } = action.payload
  yield put(setLoadingsetEmergency(true))
  try {
    const res = yield call(Service.updateEmergencyContactApi, data)
    if (res.data.isError === false) {
      navigate('/renter-profile')
      yield put(setLoadingsetEmergency(false))
      yield put(emergencyContactApi.util.invalidateTags([{ type: 'emergencyContactDetail', id: 'EMERGENCY_CONTACT_DETAIL' }]))
    } else {
      Notification.openNotificationError(res.data.errorMsg)
      yield put(setLoadingsetEmergency(false))
    }
  } catch (error) {
    const payloadError = {
      error: error,
      functionDispatch: updateEmergencyContact,
      actionPayload: action.payload,
      dispatchLoading: setLoadingsetEmergency
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
    yield put(setLoadingsetEmergency(false))
  }
}

function* getEmergencyContactSaga() { //sẽ xóa
  yield takeEvery(getEmergencyContact, handleGetEmergencyApi)
}

function* updateEmergencyContactSaga() {
  yield takeEvery(updateEmergencyContact, handleUpdateEmergencyContactApi)
}

export function* emergencyContactSagaList() {
  yield all([
    getEmergencyContactSaga(), //sẽ xóa
    updateEmergencyContactSaga()
  ])
}
