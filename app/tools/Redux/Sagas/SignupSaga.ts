import { all, takeLatest, put, call } from 'redux-saga/effects'
import { sigupAccount } from '../Actions/UserAction'
import { setLoading } from '../slices/LoadingSlice'
import { setOpenPopupSignIn } from '../slices/SignInSlice'
import { Service } from '@/Services/UserServices'
import { Notification } from '@/common/FunctionCommon/Notification'
import { setOpenPopup } from '../slices/SignUpSlice'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'

function* handleSignUpApi(action) {
  const { data } = action.payload
  const payload = {
    payload: data
  }
  yield put(setLoading(true))
  try {
    const res = yield call(Service.createUserApi, data);
    if (res.data.code === 200) {
      yield put(setOpenPopup(false))
      Notification.openNotificationSuccess('You have successfully registered an account')
      yield put(setOpenPopup(false))
      yield put(setOpenPopupSignIn(true))
      yield put(setLoading(false))
    } else {
      Notification.openNotificationError(res.data.errorMsg)
      yield put(setLoading(false))
    }
  } catch (error) {
    const payloadError = {
      error: error,
      functionDispatch: null,
      actionPayload: null,
      dispatchLoading: setLoading
    }
    yield* handleEror(payloadError)
    yield put(setLoading(false))
  }
}
function* handleEror(payloadError) {
  const { error } = payloadError
  handleError(error)
  yield put(setLoading(false))
}
function* SignUpSaga() {
  yield takeLatest(sigupAccount, handleSignUpApi)
}

export function* signupSagaList() {
  yield all([
    SignUpSaga()
  ])
}
