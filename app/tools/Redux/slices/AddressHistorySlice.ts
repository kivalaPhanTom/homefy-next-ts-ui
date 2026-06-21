import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    addressHistoryData: [],
    isLoading:false,
    optionAddressSearchResult:[], //sẽ xóa
}

const addressHistorySlice = createSlice({
    name: 'addressHistorySlice',
    initialState,
    reducers: {
        setOptionAddressSearchResult:(state, action) => { //sẽ xóa
            let newState = { ...state }
            newState.optionAddressSearchResult = action.payload
            return newState
        },
        setAddressHistoryData: (state, action) => { //sẽ xóa
            let newState = { ...state }
            newState.addressHistoryData = action.payload
            return newState
        },
        setLoadingAddressHistory:(state, action) => {
            let newState = { ...state }
            newState.isLoading = action.payload
            return newState
        },
        resetData:(state) => {
            let newState = { ...state }
            newState.addressHistoryData = []
            return newState
        },
    },
})
const { reducer } = addressHistorySlice
export const { setAddressHistoryData, setLoadingAddressHistory, resetData, setOptionAddressSearchResult } = addressHistorySlice.actions
export default reducer