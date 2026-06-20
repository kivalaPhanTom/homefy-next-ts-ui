import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getHouseHoldPeople, getHouseHoldPet, updateHouseHoldPeople, updateHouseHoldPet } from '../Actions/HouseholdAction'
import {
    setLoadingHouseHoldSlice, setLoadingHouseHoldPeople, setLoadingHouseHoldPet, resetDataPet, resetDataPeople,
    setHouseHoldPeopleData, setHouseHoldPetData
} from '../slices/HouseHoldSlice'
import { Service } from '@/Services/HouseHoldServices'
import { Notification } from '@/common/FunctionCommon/Notification'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { houseHoldApi } from '@/RTK_Query/HouseHold_Query'

// function* handleGetHouseHoldPeoplePetApi() {
//     yield put(setLoadingHouseHoldSlice(true))
//     try {
//         const resPeople = yield call(Service.getHouseHoldPeopleApi)
//         console.log('resPeople:', resPeople)
//         // if (resPeople.data.isError === false) {
//         //     yield put(setListOccupant(res.data.data))
//         //     yield put(setLoadingHouseHoldSlice(false))
//         // } else {
//         //     yield put(setLoadingHouseHoldSlice(false))
//         //     yield put(resetDataPeople())
//         // }
//         const resPet = yield call(Service.getHouseHoldPetApi)
//         console.log('resPet:', resPet)
//         // if (resPeople.data.isError === false) {

//         // }else{
//         //     yield put(resetDataPet())
//         // }
//     } catch (error) {
//         const payloadError = {
//             error: error,
//             functionDispatch: getHouseHoldPeoplePet,
//             actionPayload: null,
//             dispatchLoading: setLoadingHouseHoldSlice
//         }
//         yield* handleEror(payloadError)
//         yield put(resetData())
//     }
// }

function* handleGetHouseHoldPeopleApi() { //sẽ xóa
    yield put(setLoadingHouseHoldPeople(true))
    try {
        const res = yield call(Service.getHouseHoldPeopleApi)
        if (res.data.isError === false) {
            yield put(setHouseHoldPeopleData(res.data.data))
            yield put(setLoadingHouseHoldPeople(false))
        } else {
            yield put(setLoadingHouseHoldPeople(false))
            yield put(resetDataPeople())
        }

    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getHouseHoldPeople,
            actionPayload: null,
            dispatchLoading: setLoadingHouseHoldPeople
        }
        yield* handleEror(payloadError)
        yield put(resetDataPeople())
    }
}

function* handleGetHouseHoldPetApi() { //sẽ xóa
    yield put(setLoadingHouseHoldPet(true))
    try {
        const res = yield call(Service.getHouseHoldPetApi)
        if (res.data.isError === false) {
            yield put(setHouseHoldPetData(res.data.data))
            yield put(setLoadingHouseHoldPet(false))
        } else {
            yield put(setLoadingHouseHoldPet(false))
            yield put(resetDataPet())
        }

    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getHouseHoldPet,
            actionPayload: null,
            dispatchLoading: setLoadingHouseHoldPet
        }
        yield* handleEror(payloadError)
        yield put(resetDataPet())
    }
}

function* handleUpdateHouseHoldPeopleApi(action) {
    const { data, navigate } = action.payload
    yield put(setLoadingHouseHoldPeople(true))
    try {
        const res = yield call(Service.updateHouseHoldPeopleApi, data)
        if (res.data.isError === false) {
            navigate('/household')
            yield put(setLoadingHouseHoldPeople(false))
            yield put(houseHoldApi.util.invalidateTags([{ type: 'houseHoldPeopleDetail', id: 'HOUSE_HOLD_PEOPLE_DETAIL' }]))
        } else {
            Notification.openNotificationError(res.data.errorMsg)
            yield put(setLoadingHouseHoldPeople(false))
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: updateHouseHoldPeople,
            actionPayload: action.payload,
            dispatchLoading: setLoadingHouseHoldPeople
        }
        yield* handleEror(payloadError)
    }
}

function* handleUpdateHouseHoldPetApi(action) {
    const { data, navigate } = action.payload
    yield put(setLoadingHouseHoldPet(true))
    try {
        const res = yield call(Service.updateHouseHoldPetApi, data)
        if (res.data.isError === false) {
            navigate('/household')
            yield put(setLoadingHouseHoldPet(false))
            yield put(houseHoldApi.util.invalidateTags([{ type: 'houseHoldPetDetail', id: 'HOUSE_HOLD_PET_DETAIL' }]))
        } else {
            Notification.openNotificationError(res.data.errorMsg)
            yield put(setLoadingHouseHoldPet(false))
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getHouseHoldPet,
            actionPayload: action.payload,
            dispatchLoading: setLoadingHouseHoldPet
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
        yield put(setLoadingHouseHoldSlice(false))
        yield put(setLoadingHouseHoldPeople(false))
        yield put(setLoadingHouseHoldPet(false))
    }
}

// function* getHouseHoldPeopPetSaga() {
//     yield takeLatest(getHouseHoldPeoplePet, handleGetHouseHoldPeoplePetApi)
// }
function* getHouseHoldPeopleSaga() {//sẽ xóa 
    yield takeEvery(getHouseHoldPeople, handleGetHouseHoldPeopleApi)
}
function* getHouseHoldPetSaga() {//sẽ xóa
    yield takeEvery(getHouseHoldPet, handleGetHouseHoldPetApi)
}
function* updateHouseHoldPeopleSaga() {
    yield takeEvery(updateHouseHoldPeople, handleUpdateHouseHoldPeopleApi)
}
function* updateHouseHoldPetSaga() {
    yield takeEvery(updateHouseHoldPet, handleUpdateHouseHoldPetApi)
}


export function* householdSagaList() {
    yield all([
        // getHouseHoldPeopPetSaga(),
        getHouseHoldPeopleSaga(), //sẽ xóa
        getHouseHoldPetSaga(), //sẽ xóa
        updateHouseHoldPetSaga(),
        updateHouseHoldPeopleSaga(),
    ])
}
