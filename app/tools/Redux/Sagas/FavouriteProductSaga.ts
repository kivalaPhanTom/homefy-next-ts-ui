import { all, takeEvery, put, select } from 'redux-saga/effects'
import { getFavouriteProducts } from '../Actions/ProductionAction'
import { setLoading } from '../slices/LoadingSlice'
import { setListProduct, setShowBtnLoadmore, setTotal } from '../slices/FavouriteProductSlice'
import { getRefreshToken } from '../Actions/TokenAction'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'

function* handleGetFavouriteProductsPageApi(action) {
    const { data, isReset, listProducts, total, } = action.payload
    yield put(setLoading(true))
    try {
        const prevListProduct = yield select((state) => state.favouriteProductSlice.listProduct)
        let prevListProductClone = [...prevListProduct]
        if (data.offset !== null && data.offset !== null && data.pageIndex) {
            if (isReset) {
                yield* handleUpdateData(listProducts, total)
            } else {
                let newArr = [
                    ...prevListProductClone,
                    ...listProducts
                ]
                yield* handleUpdateData(newArr, total)
            }
        }
        yield put(setLoading(false))
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: getFavouriteProducts,
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

function* getListFavouriteProductSaga() {
    yield takeEvery(getFavouriteProducts, handleGetFavouriteProductsPageApi)
}
export function* favouriteProductPageSagaList() {
    yield all([
        getListFavouriteProductSaga()
    ])
}