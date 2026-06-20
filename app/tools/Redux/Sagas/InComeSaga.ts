import { all, put, call, takeEvery } from 'redux-saga/effects'
import { getIncomeAction, udpateIncomeAction } from '../Actions/InComeAction'
import { Service } from '@/Services/InComeServices'
import { setIncome, setLoadingIncome, resetData } from '../slices/IncomeSlice'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { Notification } from '@/common/FunctionCommon/Notification'
import { inComeApi } from '@/RTK_Query/InCome_Query'

function* handleGetIncomeApi() {
    yield put(setLoadingIncome(true))
    try {
        const res = yield call(Service.getIncomeApi)
        if (res.data.isError === false) {
            yield put(setIncome(res.data.data))
            yield put(setLoadingIncome(false))
        } else {
            yield put(setLoadingIncome(false))
            yield put(resetData())
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getIncomeAction,
            actionPayload: null,
            dispatchLoading: setLoadingIncome
        }
        yield* handleEror(payloadError)
        yield put(resetData())
    }
}

function* handleUpdateIncomeApi(action) {
    const { data, dataFile, navigate, oldFile } = action.payload
    yield put(setLoadingIncome(true))
    try {
        if(dataFile){
            const resFile = yield call(Service.uploadFileIncomeApi, dataFile)
            if (resFile.data.isError === false) {
                let fileDoc = resFile.data.data
                data.list_proof_url= [...oldFile, ...fileDoc]
                const res = yield call(Service.updateIncomeApi, data)
                if (res.data.isError === false) {
                    navigate('/renter-profile')
                    yield put(setLoadingIncome(false))
                    yield put(inComeApi.util.invalidateTags([{ type: 'incomeDetail', id: 'INCOME_DETAIL' }]))
                }else{
                    Notification.openNotificationError(res.data.errorMsg)
                    yield put(setLoadingIncome(false))
                }
            }else{
                Notification.openNotificationError(resFile.data.errorMsg)
                yield put(setLoadingIncome(false))
            }
        }else{
            let dataClone = JSON.parse(JSON.stringify(data))
            dataClone.list_proof_url = [...oldFile]
            const res = yield call(Service.updateIncomeApi, dataClone)
            if (res.data.isError === false) {
                navigate('/renter-profile')
                yield put(setLoadingIncome(false))
            }else{
                Notification.openNotificationError(res.data.errorMsg)
                yield put(setLoadingIncome(false))
            }
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: udpateIncomeAction,
            actionPayload: action.payload,
            dispatchLoading: setLoadingIncome
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
        yield put(setLoadingIncome(false))
    }
}

function* getIncomeSaga() {
    yield takeEvery(getIncomeAction, handleGetIncomeApi)
}
function* updateIncomeSaga() {
    yield takeEvery(udpateIncomeAction, handleUpdateIncomeApi)
}

export function* inComeSagaList() {
    yield all([
        getIncomeSaga(),
        updateIncomeSaga()
    ])
}
