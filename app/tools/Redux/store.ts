'use client'
import { configureStore, type Middleware, isRejectedWithValue } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import homeSlice from './slices/HomeSlice'
import signUpSlice from './slices/SignUpSlice'
import signInSlice from './slices/SignInSlice'
import loadingSlice from './slices/LoadingSlice'
import rootSaga from './Sagas/RootSaga'
import personalDetailSlice from './slices/PersonalDetailSlice'
import emergencyContactSlice from './slices/EmergencyContactSlice'
import aboutMeSlice from './slices/AboutMeSlice'
import addressHistorySlice from './slices/AddressHistorySlice'
import employmentSlice from './slices/EmploymentSlice'
import identifyDocumentSlice from './slices/IdentifyDocumentSlice'
import houseHoldSlice from './slices/HouseHoldSlice'
import incomeSlice from './slices/IncomeSlice'
import listingManagementSlice from './slices/ListingManagementSlice'
import filterProductPageSlice from './slices/FilterProductPageSlice'
import applicationSlice from './slices/ApplicationSlice'
import favouriteProductSlice from './slices/FavouriteProductSlice'
import forgotPasswordSlice from './slices/ForgotPasswordSlice'
import inspectionSlice from './slices/InspectionSlice'
import { getRoomsApi } from '@/RTK_Query/GetRooms_Query'
import { searchAddressResultApi } from '../RTK_Query/SearchAddressResult'
import { listingApi } from '@/RTK_Query/Listing_Query'
import { personalDetailApi } from '@/RTK_Query/Personal_Detail_Query'
import { getAboutmeApi } from '@/RTK_Query/AboutMe_Query'
import { addressHistoryApi } from '@/RTK_Query/AddressHistory_Query'
import { employmentDetailApi } from '@/RTK_Query/Employment_Query'
import { inComeApi } from '@/RTK_Query/InCome_Query'
import { identifyDocumentApi } from '@/RTK_Query/IdentifyDocument_Query'
import { emergencyContactApi } from '@/RTK_Query/EmergencyContact_Query'
import { houseHoldApi } from '@/RTK_Query/HouseHold_Query'
export const rtkQueryErrorLogger: Middleware = (storeApi) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!')
  }
  return next(action)
}

let sagaMiddleware = createSagaMiddleware();
const allReducer = {
  homeSlice,
  signUpSlice,
  signInSlice,
  loadingSlice,
  personalDetailSlice,
  emergencyContactSlice,
  aboutMeSlice,
  addressHistorySlice,
  employmentSlice,
  identifyDocumentSlice,
  houseHoldSlice,
  incomeSlice,
  listingManagementSlice,
  filterProductPageSlice,
  applicationSlice,
  favouriteProductSlice,
  forgotPasswordSlice,
  inspectionSlice
}
const store = configureStore({
  reducer: {
    ...allReducer,
    // getDetailRoom: getDetailRoomApi,
    // [getDetailRoomApi.reducerPath]: getDetailRoomApi.reducer,// thêm reducer được tạo từ api slice
    [getRoomsApi.reducerPath]: getRoomsApi.reducer,
    [searchAddressResultApi.reducerPath]: searchAddressResultApi.reducer,
    [listingApi.reducerPath]: listingApi.reducer,
    [personalDetailApi.reducerPath]: personalDetailApi.reducer,
    [getAboutmeApi.reducerPath]: getAboutmeApi.reducer,
    [addressHistoryApi.reducerPath]: addressHistoryApi.reducer,
    [employmentDetailApi.reducerPath]: employmentDetailApi.reducer,
    [inComeApi.reducerPath]: inComeApi.reducer,
    [identifyDocumentApi.reducerPath]: identifyDocumentApi.reducer,
    [emergencyContactApi.reducerPath]: emergencyContactApi.reducer,
    [houseHoldApi.reducerPath]: houseHoldApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      getRoomsApi.middleware,
      searchAddressResultApi.middleware,
      listingApi.middleware,
      personalDetailApi.middleware,
      getAboutmeApi.middleware,
      addressHistoryApi.middleware,
      employmentDetailApi.middleware,
      inComeApi.middleware,
      identifyDocumentApi.middleware,
      emergencyContactApi.middleware,
      houseHoldApi.middleware,
      rtkQueryErrorLogger,
      sagaMiddleware
    )
  }
})
sagaMiddleware.run(rootSaga);
export default store