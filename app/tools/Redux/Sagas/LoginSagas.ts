import { all, takeLatest, put, call } from 'redux-saga/effects'
import { SagaIterator } from "redux-saga";
import { loginAction } from '../Actions/LoginActions'
import { setLoading } from '../slices/LoadingSlice'
import { setOpenPopupSignIn, setIsLogin, setCurrentUserLogin } from '../slices/SignInSlice'
import { Service } from '@/Services/UserServices'
import { saveLocalStorage, calculateExpiredTime } from '@/common/FunctionCommon/FunctionCommon'
import { USER_NAME_IN_LOCALSTORAGE, TOKEN_IN_LOCALSTORAGE, REFRESH_TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { authenNextServer } from '@/Services/NextAuthenServer'

const LOGIN_ERROR_MESSAGE = 'Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!'

function* handleLoginApi(action:any):SagaIterator {
  const { data, router } = action.payload
  yield put(setLoading(true))
  try {
    const res = yield call(Service.loginApi, data);
    if (res.data.code === 200) {
      yield put(setLoading(false))
      const { access_token, refresh_token, expires_in } = res.data.result
      const { username } = action.payload.data
      Notification.openNotificationSuccess('successful login')
      yield put(setCurrentUserLogin({
        username:username,
        token:access_token
      }))
      yield call(authenNextServer, {
        token: access_token,
        refreshToken: refresh_token,
        expired_time: calculateExpiredTime(expires_in)
      })
      router.refresh(); 
      yield put(setOpenPopupSignIn(false))
      yield put(setLoading(false))
      saveLocalStorage(USER_NAME_IN_LOCALSTORAGE, username)
      yield put(setIsLogin(true))
    } else {
      yield put(setLoading(false))
      Notification.openNotificationError(LOGIN_ERROR_MESSAGE)
      yield put(setIsLogin(false))
    }
  } catch {
    Notification.openNotificationError(LOGIN_ERROR_MESSAGE)
    yield put(setLoading(false))
  }
}

function* loginSaga() {
  yield takeLatest(loginAction, handleLoginApi)
}
export function* loginSagaList() {
  yield all([
    loginSaga()
  ])
}
