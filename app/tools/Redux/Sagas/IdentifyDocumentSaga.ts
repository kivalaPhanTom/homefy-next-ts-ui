import { all, takeLatest, put, call } from 'redux-saga/effects'
import { Service } from '@/Services/IdentifyServices'
import { getIdentifyDocument, updateIdentifyDocument } from '../Actions/IdentifyAction'
import { setIdentifyDocumentData, setLoadingIdentifyDocument, resetData } from '../slices/IdentifyDocumentSlice'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { getRefreshToken } from '../Actions/TokenAction'
import { Notification } from '@/common/FunctionCommon/Notification'
import { identifyDocumentApi } from '@/RTK_Query/IdentifyDocument_Query'

function* handleGetIdentifyDocumentApi() { //sẽ xóa
    yield put(setLoadingIdentifyDocument(true))
    try {
        const res = yield call(Service.getIdentifyApi)
        if (res.data.isError === false) {
            yield put(setIdentifyDocumentData(res.data.data))
            yield put(setLoadingIdentifyDocument(false))
        } else {
            yield put(setLoadingIdentifyDocument(false))
            yield put(resetData())
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getIdentifyDocument,
            actionPayload: null,
            dispatchLoading: setLoadingIdentifyDocument
        }
        yield* handleEror(payloadError)
        yield put(resetData())
    }
}

function* handleUpdateIdentifyDocumentApi(action) {
    const { data, navigate } = action.payload
    const { dataSubmit, formDataFile1, formDataFile2, oldFile1, oldFile2 } = data
    yield put(setLoadingIdentifyDocument(true))
    try {
        let first_img_urls = []
        let second_img_urls = []
        if (dataSubmit.first_img_info !== null) {
            if(formDataFile1 !== null){
                const resUploadFile1 = yield call(Service.uploadImageApi, formDataFile1)
                if (resUploadFile1.data.isError === false) {
                    let fileDoc1 = resUploadFile1.data.data
                    first_img_urls = [...oldFile1, ...fileDoc1]
                }else{
                    Notification.openNotificationError(resUploadFile1.data.errorMsg)
                }
            }else{
                first_img_urls = [...oldFile1]
            }
           
        }
        if (dataSubmit.second_img_urls !== null) {
            if(formDataFile2 !== null){
                const resUploadFile2 = yield call(Service.uploadImageApi, formDataFile2)
                if (resUploadFile2.data.isError === false) {
                    let fileDoc2 = resUploadFile2.data.data
                    second_img_urls = [...oldFile2, ...fileDoc2]
                }else{
                    Notification.openNotificationError(resUploadFile2.data.errorMsg)
                }
            }
            else{
                second_img_urls = [...oldFile2]
            }
        }

        const payloadSubmit = {
            photo_type: dataSubmit.photo_type,
            first_img_info: dataSubmit.first_img_info,
            first_img_urls: first_img_urls.length > 0 ? first_img_urls :null,
            second_img_urls:second_img_urls.length > 0 ? second_img_urls :null,
        }
        const res = yield call(Service.updateIdentifyApi, payloadSubmit)
        if (res.data.isError === false) {
            navigate('/renter-profile')
            yield put(identifyDocumentApi.util.invalidateTags([{ type: 'identifyDocumentDetail', id: 'IDENTIFY_DOCUMENT_DETAIL' }]))
        } else {
            Notification.openNotificationError(res.data.errorMsg)
        }
        yield put(setLoadingIdentifyDocument(true))
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: updateIdentifyDocument,
            actionPayload: action.payload,
            dispatchLoading: setLoadingIdentifyDocument
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
        yield put(setLoadingIdentifyDocument(false))
    }
}

function* getIdentifyDocumentSaga() {  //sẽ xóa
    yield takeLatest(getIdentifyDocument, handleGetIdentifyDocumentApi)
}
function* updateIdentifyDocumentSaga() {
    yield takeLatest(updateIdentifyDocument, handleUpdateIdentifyDocumentApi)
}
export function* identifyDocumentSagaList() {
    yield all([
        getIdentifyDocumentSaga(), //sẽ xóa
        updateIdentifyDocumentSaga()
    ])
}
