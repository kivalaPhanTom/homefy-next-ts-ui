import { all, takeEvery, put, select, call } from 'redux-saga/effects'
import { checkRoomAvailabilityType } from '@/common/types/RoomTypes'
import { filterProductInFilterPage, checkRoomAvailability } from '../Actions/ProductionAction'
import { setLoading } from '../slices/LoadingSlice'
import { setListProduct, setShowBtnLoadmore, setTotal, saveState } from '../slices/FilterProductPageSlice'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { Service } from '@/Services/ProductServices'
interface conflictDatesType {
    date: string,
    reason: string
}
interface responseType {
    data: {
        code: number,
        message: string,
        result: {
            available: boolean,
            conflicts: conflictDatesType[]
        }
    }
}
// function* handleGetListProductInFilterPageApi(action) {
//     const { data, isReset, listProducts, total } = action.payload
//     try {
//         const previousProduct = yield select((state) => state.filterProductPageSlice.listProduct)
//         let previousProductClone = [...previousProduct]
//         if (data.offset !== null && data.offset !== null && data.pageIndex) {
//             if (isReset) {
//                 yield* handleUpdateData(listProducts, total)

//             } else {
//                 let newArr = [
//                     ...previousProductClone,
//                     ...listProducts
//                 ]

//                 yield* handleUpdateData(newArr, total)
//             }
//         }
//     } catch (error) {
//         const payloadError = {
//             error: error,
//             functionDispatch: filterProductInFilterPage,
//             actionPayload: action.payload,
//             dispatchLoading: setLoading
//         }
//         yield* handleEror(payloadError)
//         yield put(setListProduct([]))
//     }
// }
function* handleGetListProductInFilterPageApi(action:any): Generator<any, void, unknown> {
    const { data, isReset, listProducts, total } = action.payload
    const totalProduct = total
    yield put(setLoading(true))
    try {
        const listProductPrev:any = yield select((state) => state.filterProductPageSlice.listProduct)
        let listProductClone = [...listProductPrev]
        if (data.offset !== null && data.offset !== null && data.pageIndex) {
            if (isReset) {
                yield* handleUpdateData(listProducts, totalProduct)
            } else {
                let newArr = [
                    ...listProductClone,
                    ...listProducts
                ]
                yield* handleUpdateData(newArr, totalProduct)
            }
        }
        yield put(setLoading(false))
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: filterProductInFilterPage,
            actionPayload: action.payload,
            dispatchLoading: setLoading
        }
        yield* handleEror(payloadError)
        yield put(setListProduct([]))
    }
}
function* handleUpdateData(dataResult: any, totalProduct: number): Generator<any, void, unknown> {
    yield put(setListProduct(dataResult))
    yield put(setTotal(totalProduct))
    if (totalProduct === dataResult.length) {
        yield put(setShowBtnLoadmore(false))
    } else {
        yield put(setShowBtnLoadmore(true))
    }
    yield put(setLoading(false))
}

function* handleCheckRoomAvailabilityApi(action: { payload: checkRoomAvailabilityType }): Generator<any, void, unknown> {
    yield put(saveState({
        isCheckingRoomAvailability: true
    }))
    try {
        const res = (yield call(Service.checkRoomAvailabilityApi, action.payload)) as responseType
        const result = res?.data?.result
        yield put(saveState({
            isCheckingRoomAvailability: false,
            isRoomAvailable: result?.available,
            conflictDates: result?.conflicts.map((e: conflictDatesType) => e.date) || []
        }))
    } catch (error) {
        yield put(saveState({
            isCheckingRoomAvailability: false
        }))
    }
}
function* handleEror(payloadError: any): Generator<any, void, unknown> {
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
        yield put(setLoading(false))
    }
}

function* getListProductInFilterPageSaga(): Generator<any, void, unknown> {
    yield takeEvery(filterProductInFilterPage, handleGetListProductInFilterPageApi)
}

function* getRoomAvailabilitySaga(): Generator<any, void, unknown> {
    yield takeEvery(checkRoomAvailability, handleCheckRoomAvailabilityApi)
}

export function* filterProductPageSagaList(): Generator<any, void, unknown> {
    yield all([
        getListProductInFilterPageSaga(),
        getRoomAvailabilitySaga()
    ])
}
