import { all, put, call, takeEvery } from 'redux-saga/effects'
import { getAboutMe, updateAboutMe } from '../Actions/AboutMeAction'
import { Service } from '@/Services/AboutMeServices'
import { setAboutMeInfo, setLoadingAboutMe, resetData } from '../slices/AboutMeSlice'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { getAboutmeApi } from '@/RTK_Query/AboutMe_Query'
import { clearAuthen } from '../Actions/TokenAction'

function* handleUpdateAboutmeApi(action) {
    const { data, navigate } = action.payload
    let { dataAboutMe, formDataFile, oldFile, isCallUploadApi } = data
    yield put(setLoadingAboutMe(true))
    try {
        dataAboutMe.list_document_url = [...oldFile]
        if (isCallUploadApi) {
            const resfile = yield call(Service.updateAboutmeDocApi, formDataFile)
            if (resfile.data.isError === false) {
                let fileDoc = resfile.data.data
                dataAboutMe.list_document_url = [...dataAboutMe.list_document_url, ...fileDoc]

            } else {
                Notification.openNotificationError(resfile.data.errorMsg)
                yield put(setLoadingAboutMe(false))
                yield put(resetData())
            }
        }
        const res = yield call(Service.updateAboutmeApi, dataAboutMe)
        if (res.data.isError === false) {
            navigate('/renter-profile')
            yield put(setLoadingAboutMe(false))
            yield put(getAboutmeApi.util.invalidateTags([{ type: 'aboutmeDetail', id: 'ABOUTME_DETAIL' }]))
        } else {
            Notification.openNotificationError(res.data.errorMsg)
            yield put(setLoadingAboutMe(false))
        }
        yield put(setLoadingAboutMe(false))
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: setAboutMeInfo,
            actionPayload: action.payload,
            dispatchLoading: setLoadingAboutMe
        }
        yield* handleEror(payloadError)
    }
}

function* handleEror(payloadError) {
    const { error, functionDispatch, actionPayload, dispatchLoading } = payloadError
    const isErrorAuthen = handleError(error)
    if (isErrorAuthen) {
        const payloadSendRefreshToken = {
            functionDispatch,
            actionPayload,
            dispatchLoading
        }
        yield put(getRefreshToken(payloadSendRefreshToken))
    }else{
        yield put(setLoadingAboutMe(false))
    }
}

function* updateAboutmeSaga() {
    yield takeEvery(updateAboutMe, handleUpdateAboutmeApi)
}


export function* aboutMeSagaList() {
    yield all([
        updateAboutmeSaga()
    ])
}
