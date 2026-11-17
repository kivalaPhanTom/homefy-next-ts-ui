import { all, takeLatest, put, call } from 'redux-saga/effects'
import { forgotPassword } from '../Actions/UserAction'
import { setLoading } from '../slices/LoadingSlice'
import { setOpenPopup } from '../slices/ForgotPasswordSlice'
import { Service } from '@/Services/UserServices'
import { Notification } from '@/common/FunctionCommon/Notification'

function* handleForgotPasswordApi(action:any): Generator<any, void, unknown> {
  const { data } = action.payload
  const payload = {
    payload: data
  }
  yield put(setLoading(true))
  try {
    const res:any = yield call(Service.forgotPasswordApi, payload);
    if (res.data.code === 200) {
      yield put(setOpenPopup(false))
      Notification.openNotificationSuccess('Liên kết đặt lại mật khẩu đã được gửi tới email của bạn')
      yield put(setLoading(false))
    } else {
      Notification.openNotificationError(res.data.message)
      yield put(setLoading(false))
    }
  } catch (error) {
    Notification.openNotificationError('Gửi yêu cầu đặt lại mật khẩu thất bại. Vui lòng thử lại')
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
