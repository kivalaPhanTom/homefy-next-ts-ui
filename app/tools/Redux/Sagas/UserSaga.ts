import { all, put, call, takeLatest } from 'redux-saga/effects'
import { Service } from '@/Services/UserServices'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError, clearLocalStorageByKey } from '@/common/FunctionCommon/FunctionCommon'
import { userLike, userRemoveLike, logOut } from '../Actions/UserAction'
import { setLoading } from '../slices/LoadingSlice'
import { USER_NAME_IN_LOCALSTORAGE, ADDRESS_SEARCH_IN_LOCALSTORAGE, STATUS_CODE, TOKEN_IN_LOCALSTORAGE, REFRESH_TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { setCurrentUserLogin } from '../slices/SignInSlice'
import { getCookie } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { logoutNextServer } from '@/Services/NextAuthenServer'
import { likeActionType, likeActionTypeResponse } from '@/common/types/RoomTypes'

function* handleUserLikeApi(action: { payload: likeActionType }): Generator<any, void, unknown> {
    const data = action.payload
    try {
        const res = (yield call(Service.userLikeApi, data)) as likeActionTypeResponse
        if (res.data.code === STATUS_CODE.SUCCESS) {
            // nothing to do
        }
       
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

function* handleUserRemoveLikeApi(action: { payload: likeActionType }): Generator<any, void, unknown> {
    const data = action.payload
    try {
        const res = (yield call(Service.userRemoveLikeApi, data)) as likeActionTypeResponse
        if (res.data.code === STATUS_CODE.SUCCESS) {
            // nothing to do
        }
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
function* handleLogOutApi(action: any): Generator<any, void, unknown> {
    const { router } = action.payload
    yield put(setLoading(true))
    try {
        yield call(Service.logoutApi, { refresh_token: getCookie(REFRESH_TOKEN_IN_LOCALSTORAGE) })
        clearLocalStorageByKey(USER_NAME_IN_LOCALSTORAGE)
        clearLocalStorageByKey(ADDRESS_SEARCH_IN_LOCALSTORAGE)
        clearLocalStorageByKey(TOKEN_IN_LOCALSTORAGE)
        clearLocalStorageByKey(REFRESH_TOKEN_IN_LOCALSTORAGE)
        yield put(setCurrentUserLogin({
            username: null,
            token: null
        }))
        yield put(setLoading(false))
        yield call(logoutNextServer)
        if (router) {
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
function* handleEror(payloadError: any) {
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
