import { all, put, call, takeLatest } from 'redux-saga/effects'
import { Service } from '@/Services/UserServices'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError, clearLocalStorageByKey } from '@/common/FunctionCommon/FunctionCommon'
import { userLike, userRemoveLike, logOut } from '../Actions/UserAction'
import { setLoading } from '../slices/LoadingSlice'
import { USER_NAME_IN_LOCALSTORAGE, ADDRESS_SEARCH_IN_LOCALSTORAGE, TOKEN_IN_LOCALSTORAGE, REFRESH_TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { setCurrentUserLogin } from '../slices/SignInSlice'
import { getCookie } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { logoutNextServer } from '@/Services/NextAuthenServer'

function* handleUserLikeApi(action) {
    const { data } = action.payload
    try {
        yield call(Service.userLikeApi, data)
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: userLike,
            actionPayload: action.payload,
            dispatchLoading: setLoading
        }
        yield* handleEror(payloadError)
    }
}

function* handleUserRemoveLikeApi(action) {
    const { data } = action.payload
    console.log('dataxxxx:', data)
    try {
        yield call(Service.userRemoveLikeApi, data)
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: userRemoveLike,
            actionPayload: action.payload,
            dispatchLoading: setLoading
        }
        yield* handleEror(payloadError)
    }
}
function* handleLogOutApi(action) {
    const { router  } = action.payload
    yield put(setLoading(true))
    try {
        yield call(Service.logoutApi, {refresh_token: getCookie(REFRESH_TOKEN_IN_LOCALSTORAGE)})
        clearLocalStorageByKey(USER_NAME_IN_LOCALSTORAGE)
        clearLocalStorageByKey(ADDRESS_SEARCH_IN_LOCALSTORAGE)
        clearLocalStorageByKey(TOKEN_IN_LOCALSTORAGE)
        clearLocalStorageByKey(REFRESH_TOKEN_IN_LOCALSTORAGE)
        yield put(setCurrentUserLogin({
            username:null, 
            token:null
        }))
        yield put(setLoading(false))
        yield call(logoutNextServer)
        if(router){
            router.refresh(); 
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: logOut,
            actionPayload: null,
            dispatchLoading: setLoading
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
    }
}

function* userLikeSaga() {
    yield takeLatest(userLike, handleUserLikeApi)
}
function* userRemoveLikeSaga() {
    yield takeLatest(userRemoveLike, handleUserRemoveLikeApi)
}
function* logOutSaga() {
    yield takeLatest(logOut, handleLogOutApi)
}
export function* UserSagaList() {
    yield all([
        userLikeSaga(),
        userRemoveLikeSaga(),
        logOutSaga()
    ])
}
