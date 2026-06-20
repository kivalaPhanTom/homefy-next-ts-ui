import { all, takeLatest, put, call } from 'redux-saga/effects'
import { loginAction } from '../Actions/LoginActions'
import { setLoading } from '../slices/LoadingSlice'
import { setOpenPopupSignIn, setIsLogin, setCurrentUserLogin } from '../slices/SignInSlice'
import { Service } from '@/Services/UserServices'
import { saveLocalStorage } from '@/common/FunctionCommon/FunctionCommon'
import { USER_NAME_IN_LOCALSTORAGE, TOKEN_IN_LOCALSTORAGE, REFRESH_TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { authenNextServer } from '@/Services/NextAuthenServer'

function* handleLoginApi(action) {
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
        expired_time:expires_in
      })
      router.refresh(); 
      yield put(setOpenPopupSignIn(false))
      yield put(setLoading(false))
      saveLocalStorage(USER_NAME_IN_LOCALSTORAGE, username)
      yield put(setIsLogin(true))
    } else {
      yield put(setLoading(false))
      Notification.openNotificationError(res.data.message)
      yield put(setIsLogin(false))
    }
  } catch (error) {
    const payloadError = {
      error: error,
      functionDispatch: null,
      actionPayload: null,
      dispatchLoading: setLoading
    }
    yield* handleEror(payloadError)
    // yield put(setLoading(false))
    // yield put(setIsLogin(false))
  }
}

function* loginSaga() {
  yield takeLatest(loginAction, handleLoginApi)
}
function* handleEror(payloadError) {
  const { error } = payloadError
  handleError(error)
  yield put(setLoading(false))
}
export function* loginSagaList() {
  yield all([
    loginSaga()
  ])
}
