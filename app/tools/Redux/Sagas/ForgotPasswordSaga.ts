import { all, takeLatest, put, call } from 'redux-saga/effects'
import { forgotPassword } from '../Actions/UserAction'
import { setLoading } from '../slices/LoadingSlice'
// import { setOpenPopupSignIn } from '../slices/SignInSlice'
import { Service } from '@/Services/UserServices'
import { Notification } from '@/common/FunctionCommon/Notification'
// import { setOpenPopup } from '../slices/SignUpSlice'

function* handleForgotPasswordApi(action) {
  const { data } = action.payload
  const payload = {
    payload: data
  }
  yield put(setLoading(true))
  try {
    const res = yield call(Service.forgotPasswordApi, payload);
    if (res.data.isError === false) {
    //   yield put(setOpenPopup(false))
    //   Notification.openNotificationSuccess('You have successfully registered an account')
    //   yield put(setOpenPopup(false))
    //   yield put(setOpenPopupSignIn(true))
    //   yield put(setLoading(false))
    } else {
      Notification.openNotificationError(res.data.errorMsg)
      yield put(setLoading(false))
    }
  } catch (error) {
    Notification.openNotificationError('Reset your password failed. Please try again')
    yield put(setLoading(false))
  }
}

function* forgotPasswordSaga() {
  yield takeLatest(forgotPassword, handleForgotPasswordApi)
}

export function* forgotPasswordSagaList() {
  yield all([
    forgotPasswordSaga()
  ])
}
