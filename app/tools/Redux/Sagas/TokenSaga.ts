import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getRefreshToken, clearAuthen, updateAuthenBrowser } from '../Actions/TokenAction'
import { REFRESH_TOKEN_IN_LOCALSTORAGE, TOKEN_IN_LOCALSTORAGE, EXPIRED_TIME_TOKEN } from '@/common/ParamsCommon/ParamsCommon'
import { getLocalStorage, clearLocalStorageByKey } from '@/common/FunctionCommon/FunctionCommon'
import { saveLocalStorage } from '@/common/FunctionCommon/FunctionCommon'
// import { setOpenPopupSignIn } from 'Redux/slices/SignInSlice'
// import { sigupAccount } from '../Actions/UserAction'
// import { setLoading } from '../slices/LoadingSlice'
// import { setOpenPopupSignIn } from '../slices/SignInSlice'
import { Service } from '@/Services/UserServices'
import { Notification } from '@/common/FunctionCommon/Notification'
// import { setOpenPopup } from '../slices/SignUpSlice'
import { getCookie } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { authenNextServer } from '@/Services/NextAuthenServer'
import { logOut } from '../Actions/UserAction'

function* handleGetRefreshTokenpi(action) {
    const refreshToken = getCookie(REFRESH_TOKEN_IN_LOCALSTORAGE)
    if (refreshToken) {
        const { actionPayload, functionDispatch, dispatchLoading } = action.payload
        try {
            const res = yield call(Service.getRefeshTokenApi, { refresh_token: refreshToken })
            if (res.data.isError === false) {
                const { access_token, refresh_token, expired_time } = res.data.data
                yield call(authenNextServer, {
                    token: access_token,
                    refreshToken: refresh_token,
                    expired_time
                })
                if (actionPayload) {
                    yield put(functionDispatch(actionPayload))
                    yield put(dispatchLoading(false))
                } else {
                    yield put(functionDispatch())
                    yield put(dispatchLoading(false))
                }
            } else {
                Notification.openNotificationError(res.data.errorMsg)
                yield put(dispatchLoading(false))
            }
        } catch (error) {
            yield put(dispatchLoading(false))
            Notification.openNotificationError('There was an error during authentication. Please try again')
            yield put(logOut({}))
            yield put(clearAuthen());
        }
    } else {
        yield put(clearAuthen());
        yield put(logOut({}))
    }
}
function* handleClearAuthen() {
    clearLocalStorageByKey(TOKEN_IN_LOCALSTORAGE);
    clearLocalStorageByKey(REFRESH_TOKEN_IN_LOCALSTORAGE);
    yield put(setOpenPopupSignIn(true))

}
function* handleUpdateAuthenBrowser(action) {
    const { access_token, refresh_token, expired_time } = action.payload
    try {
        yield call(authenNextServer, {
            token: access_token,
            refreshToken: refresh_token,
            expired_time
        })
    } catch (error) {
        Notification.openNotificationError('There was an error during authentication. Please try again')
        yield put(logOut({}))
        yield put(clearAuthen());
    }
}

function* getRefreshTokenSaga() {
    yield takeEvery(getRefreshToken, handleGetRefreshTokenpi)
}
function* cleatAuthenSaga() {
    yield takeEvery(clearAuthen, handleClearAuthen)
}
function* updateAuthenBrowserSaga() {
    yield takeEvery(updateAuthenBrowser, handleUpdateAuthenBrowser)
}

export function* tokenSagaList() {
    yield all([
        getRefreshTokenSaga(),
        cleatAuthenSaga(),
        updateAuthenBrowserSaga(),
    ])
}