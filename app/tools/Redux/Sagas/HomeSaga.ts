import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { getListProductHome } from '../Actions/HomeAction'
import { setLoading } from '../slices/LoadingSlice'
import { addressServices } from '@/Services/SearchAddressServices'
import { setListProduct, setShowBtnLoadmore } from '../slices/HomeSlice'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { getOptionSearchAdressResult } from '../Actions/HomeAction'
import { setOptionSearchResult } from '../slices/HomeSlice'

function* handleGetListProductInHomeApi(action) {
    const { data, isReset, listProducts, total } = action.payload
    const totalProduct = total
    yield put(setLoading(true))
    try {
        const listProductPrev = yield select((state) => state.homeSlice.listProduct)
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
            functionDispatch: getListProductHome,
            actionPayload: action.payload,
            dispatchLoading: setLoading
        }
        yield* handleEror(payloadError)
        yield put(setListProduct([]))
    }
}
// function* handleGetListProductInHomeApi(action) {
//     try {
//         const listProductPrev = yield select((state) => state.homeSlice.listProduct)
//         let newArr = [
//             ...listProductPrev,
//             ...action.payload
//         ]
//         yield put(setListProduct(newArr))
//     } catch (error) {

//     }

// }
function* handleUpdateData(dataResult, totalProduct) {
    yield put(setListProduct(dataResult))
    if (totalProduct === dataResult.length) {
        yield put(setShowBtnLoadmore(false))
    } else {
        yield put(setShowBtnLoadmore(true))
    }
    yield put(setLoading(false))
}

function* handleGetOptionsAddressSearchHomeApi(action) {   //sẽ xóa
    const { data } = action.payload
    try {
        const res = yield call(addressServices.searchAddressApi, data)
        if (res.data.isError === false) {
            yield put(setOptionSearchResult(res.data.data))
        } else {
            yield put(setOptionSearchResult([]))
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getOptionSearchAdressResult,
            actionPayload: action.payload,
            dispatchLoading: setLoading
        }
        yield* handleEror(payloadError)
        yield put(setOptionSearchResult([]))
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
        yield put(setLoading(false))
    }
}

function* getListProductInHomeSaga() {
    yield takeEvery(getListProductHome, handleGetListProductInHomeApi)
}
function* getOptionsAddressSearchSaga() {   //sẽ xóa
    yield takeEvery(getOptionSearchAdressResult, handleGetOptionsAddressSearchHomeApi)
}
export function* homeSagaList() {
    yield all([
        getListProductInHomeSaga(),
        getOptionsAddressSearchSaga() //sẽ xóa
    ])
}
