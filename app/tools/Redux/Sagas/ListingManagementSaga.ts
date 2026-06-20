import { all, put, call, takeLatest, select } from 'redux-saga/effects'
import { getListings, updateListing, getListingInfo, insertListing, getAddressResult, deleteListing } from '../Actions/ListingManagementAction'
import { addressServices } from '@/Services/SearchAddressServices'
import { setLoading } from '../slices/LoadingSlice'
import { setListings, setListingInfo, setOptionAddressSearchResult, setShowBtnLoadmore, setOpenDeleteListing } from '../slices/ListingManagementSlice'
import { handleError } from '@/common/FunctionCommon/FunctionCommon'
import { getRefreshToken } from '../Actions/TokenAction'
import { Notification } from '@/common/FunctionCommon/Notification'
import { Service } from '@/Services/ListingManagementService'
import { getRoomsApi } from '@/RTK_Query/GetRooms_Query'
import { listingApi } from '@/RTK_Query/Listing_Query'
import { checkExpiredToken } from '@/common/FunctionCommon/FunctionCommon'
import { TOKEN_IN_LOCALSTORAGE, USER_TOKEN, EXPIRED_TIME_TOKEN, REFRESH_TOKEN_IN_LOCALSTORAGE, STATUS_CODE } from '@/common/ParamsCommon/ParamsCommon'
import { Service as UserService } from '@/Services/UserServices'
import { getCookie } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { authenNextServer } from '@/Services/NextAuthenServer'

//dangcode
function* handleGetListingsApi(action) {
    const { data, isReset, listRoom, total } = action.payload
    try {
        const prevRooms = yield select((state) => state.listingManagementSlice.listings)
        let prevRoomsClone = [...prevRooms]
        if (data.offset !== null && data.offset !== null && data.pageIndex) {
            if (isReset) {
                yield* handleUpdateData(listRoom, total)
            } else {
                let newArr = [
                    ...prevRoomsClone,
                    ...listRoom
                ]
                yield* handleUpdateData(newArr, total)
            }
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: setListings,
            actionPayload: action.payload,
            dispatchLoading: setLoading
        }
        yield* handleEror(payloadError)
        yield put(setListings([]))
    }
}
function* handleUpdateData(dataResult, totalProduct) {
    yield put(setListings(dataResult))
    if (totalProduct === dataResult.length) {
        yield put(setShowBtnLoadmore(false))
    } else {
        yield put(setShowBtnLoadmore(true))
    }
    yield put(setLoading(false))
}

function* handleInsertListingApi(action) {
    const { data, formDataFile, form, setFileList, setDescription, setNumberHousemates, setListFirnishings, navigate } = action.payload

    yield put(setLoading(true))
    try {
        // yield call(handleRefreshTokenApi)
        let image_paths = []
        if (formDataFile !== null) {
            const resFile = yield call(Service.uploadFileApi, formDataFile)
            if (resFile.data.code === STATUS_CODE.SUCCESS) {
                image_paths = resFile.data.result
            }
        }
        let dataClone = JSON.parse(JSON.stringify(data))
        dataClone.image_paths = image_paths
        console.log('dataClone:', dataClone)
        const res = yield call(Service.insertListingApi, dataClone)
        // console.log('res.data:', res.data)
        if (res.data.code === STATUS_CODE.SUCCESS) {
            yield put(getRoomsApi.util.invalidateTags([{ type: 'roomsListApi', id: 'ROOMS_LIST' }]))
            setFileList([])
            setDescription('')
            setNumberHousemates([])
            setListFirnishings([])
            form.setFieldsValue({
                location: null,
                listing_id: '',
                rent_per_week: null,
                date_available: null,
                minimum_stay: null,
                num_bedroom: null,
                num_bathroom: null,
                room_name: '',
                bathroom_type: null,
                bed_size: null,
                number_housemates: null
            })
            yield put(setOptionAddressSearchResult([]))
            Notification.openNotificationSuccess('Created data successfully')
            yield put(setLoading(false))
            navigate('/admin/listing-managerment')
        }
        else {
            Notification.openNotificationError(res.data.message)
            yield put(setLoading(false))
        }
    } catch (error) {
        // const payloadError = {
        //     error: error,
        //     functionDispatch: insertListing,
        //     actionPayload: action.payload,
        //     dispatchLoading: setLoading
        // }
        // yield* handleEror(payloadError)
    }
}

function* handleUpdateListingApi(action) {
    const { data, oldFile, formDataFile, form, setFileList, setDescription, setNumberHousemates, setListFirnishings, navigate } = action.payload
    console.log('action.payload:', action.payload)
    yield put(setLoading(true))
    let dataClone = JSON.parse(JSON.stringify(data))
    try {
        dataClone.old_image_ids = oldFile
        // yield call(handleRefreshTokenApi)
        let image_paths = []
        if (formDataFile !== null) {
            console.log('vffffffff')
            const resFile = yield call(Service.uploadFileApi, formDataFile)
            if (resFile.data.isError === false) {
                image_paths = resFile.data.data
            }
        }
        // dataClone = JSON.parse(JSON.stringify(data))
        // dataClone.image_paths = [...oldFile, ...image_paths]
        dataClone.new_image_paths = image_paths
        const updatedPayload = {
            id: dataClone.id,
            data: dataClone
        }
        console.log('updatedPayload', updatedPayload)
        const res = yield call(Service.updateListingApi, updatedPayload)
        console.log('TTTTTTTTT:', res)
        if (resFile.data.code === STATUS_CODE.SUCCESS) {
            yield put(getRoomsApi.util.invalidateTags([{ type: 'roomsListApi', id: 'ROOMS_LIST' },]))
            yield put(listingApi.util.invalidateTags([{ type: 'getListingDetail', id: 'GET_LISTING_DETAIL' }]))
            setFileList([])
            setDescription('')
            setNumberHousemates([])
            setListFirnishings([])
            form.setFieldsValue({
                location: null,
                listing_id: '',
                price: null,
                date_available: null,
                minimum_stay: null,
                num_bedroom: null,
                num_bathroom: null,
                room_name: '',
                bathroom_type: null,
                bed_size: null,
                number_housemates: null
            })
            yield put(setOptionAddressSearchResult([]))
            Notification.openNotificationSuccess('Updated data successfully')
            yield put(setLoading(false))
            navigate('/admin/listing-managerment')
        } else {
            Notification.openNotificationError(res.data.errorMsg)
            yield put(setLoading(false))
        }
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: updateListing,
            actionPayload: action.payload,
            dispatchLoading: setLoading
        }
        yield* handleEror(payloadError)
    }
}
function* handleDeleteListingApi(action) {
    const { data, callRTKquery } = action.payload
    yield put(setLoading(true))
    try {
        // yield call(handleRefreshTokenApi)
        const res = yield call(Service.deleteListingApi, data)
        if (res.data.isError === false) {
            yield put(setOpenDeleteListing(false))
            Notification.openNotificationSuccess('Deleted data successfully')
            yield call(callRTKquery)
        } else {
            Notification.openNotificationError(res.data.errorMsg)
            yield put(setLoading(false))
        }
        yield put(setLoading(false))
    } catch (error) {
        const payloadError = {
            error: error,
            functionDispatch: deleteListing,
            actionPayload: action.payload,
            dispatchLoading: setLoading
        }
        yield* handleEror(payloadError)
    }
}

function* handleEror(payloadError) {
    // const { error, functionDispatch, actionPayload, dispatchLoading } = payloadError
    // const isCallRefreshToken = handleError(error)
    // if (isCallRefreshToken) {
    //     const payloadSendRefreshToken = {
    //         functionDispatch,
    //         actionPayload,
    //         dispatchLoading
    //     }
    //     yield put(getRefreshToken(payloadSendRefreshToken))
    // } else {
    //     yield put(setLoading(false))
    // }
}

// function* handleRefreshTokenApi() {
//     const refreshToken = getCookie(REFRESH_TOKEN_IN_LOCALSTORAGE)
//     const expired_time = getCookie(EXPIRED_TIME_TOKEN)
//     const isExpired = checkExpiredToken(expired_time)
//     if (isExpired) {
//         const res = yield call(UserService.getRefeshTokenApi, { refresh_token: refreshToken })
//         const { access_token, refresh_token, expired_time } = res.data.data
//         yield call(authenNextServer, {
//             token: access_token,
//             refreshToken: refresh_token,
//             expired_time
//         })
//     }
// }

function* getListingsSaga() {
    yield takeLatest(getListings, handleGetListingsApi)
}
function* insertListingSaga() {
    yield takeLatest(insertListing, handleInsertListingApi)
}
function* updateListingSaga() {
    yield takeLatest(updateListing, handleUpdateListingApi)
}
function* deleteListingSaga() {
    yield takeLatest(deleteListing, handleDeleteListingApi)
}

export function* listingManagementSagaList() {
    yield all([
        getListingsSaga(),
        insertListingSaga(),
        updateListingSaga(),
        deleteListingSaga()
    ])
}
