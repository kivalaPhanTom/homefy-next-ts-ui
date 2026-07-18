import { createSlice } from '@reduxjs/toolkit'
// interface conflictDatesType {
//     date: string,
//     reason: string
// }
interface FilterProductPageState {
    listProduct: any[],
    isShowBtnLoadmore: boolean,
    total: number,
    isOpenPopupFilter: boolean,
    isCheckingRoomAvailability: boolean,
    isRoomAvailable: boolean,
    conflictDates: string[],
}
const initialState = {
    listProduct: [],
    isShowBtnLoadmore: true,
    total: 0,
    isOpenPopupFilter: false,
    isCheckingRoomAvailability: true,
    isRoomAvailable: true,
    conflictDates: [],
}
const filterProductPageSlice = createSlice({
    name: 'filterProductPageSlice',
    initialState,
    reducers: {
        setListProduct: (state, action) => {
            let newState = { ...state }
            newState.listProduct = action.payload
            return newState
        },
        setTotal: (state, action) => {
            let newState = { ...state }
            newState.total = action.payload
            return newState
        },
        setShowBtnLoadmore: (state, action) => {
            let newState = { ...state }
            newState.isShowBtnLoadmore = action.payload
            return newState
        },
        setOpenPopupFilter: (state, action) => {
            let newState = { ...state }
            newState.isOpenPopupFilter = action.payload
            return newState
        },
        resetData: (state) => {
            let newState = { ...state }
            newState.listProduct = []
            newState.isShowBtnLoadmore = true
            newState.total = 0
            newState.isOpenPopupFilter = false
            return newState
        },
        saveState: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        }
    },
});
const { reducer } = filterProductPageSlice
export const { setListProduct, setShowBtnLoadmore, resetData, setTotal, setOpenPopupFilter, saveState } = filterProductPageSlice.actions
export default reducer