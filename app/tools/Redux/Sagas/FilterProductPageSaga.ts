import { all, takeEvery, put, select } from 'redux-saga/effects'
import { filterProductInFilterPage } from '../Actions/ProductionAction'
import { setLoading } from '../slices/LoadingSlice'
import { setListProduct, setShowBtnLoadmore, setTotal } from '../slices/FilterProductPageSlice'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'

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
function* handleGetListProductInFilterPageApi(action) {
    const { data, isReset, listProducts, total } = action.payload
    const totalProduct = total
    yield put(setLoading(true))
    try {
        const listProductPrev = yield select((state) => state.filterProductPageSlice.listProduct)
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
function* handleUpdateData(dataResult, totalProduct) {
    yield put(setListProduct(dataResult))
    yield put(setTotal(totalProduct))
    if (totalProduct === dataResult.length) {
        yield put(setShowBtnLoadmore(false))
    } else {
        yield put(setShowBtnLoadmore(true))
    }
    yield put(setLoading(false))
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
        yield put(setLoading(false))
    }
}

function* getListProductInFilterPageSaga() {
    yield takeEvery(filterProductInFilterPage, handleGetListProductInFilterPageApi)
}
export function* filterProductPageSagaList() {
    yield all([
        getListProductInFilterPageSaga()
    ])
}
