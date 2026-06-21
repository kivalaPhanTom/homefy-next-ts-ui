import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    listProduct: [],
    isShowBtnLoadmore: true,
    optionSearchResult: [],
    isResetList: false,
    isOpenHeaderMenuMobile:false,
}
const homeSlice = createSlice({
    name: 'homeSlice',
    initialState,
    reducers: {
        setOptionSearchResult: (state, action) => {  //sẽ xóa
            let newState = { ...state }
            newState.optionSearchResult = action.payload
            return newState
        },
        setListProduct: (state, action) => {
            let newState = { ...state }
            newState.listProduct = action.payload
            return newState
        },
        setShowBtnLoadmore: (state, action) => {
            let newState = { ...state }
            newState.isShowBtnLoadmore = action.payload
            return newState
        },
        resetData: (state) => {
            let newState = { ...state }
            newState.listProduct = []
            newState.isShowBtnLoadmore = true
            return newState
        },
        setResetList: (state, action) => {
            let newState = { ...state }
            newState.isResetList = action.payload
            return newState
        },
        setOpenHeaderMenuMobile: (state, action) => {
            let newState = { ...state }
            newState.isOpenHeaderMenuMobile = action.payload
            return newState
        },
    },
});
const { reducer } = homeSlice
export const { setListProduct, setShowBtnLoadmore, resetData, setOptionSearchResult, setResetList, setOpenHeaderMenuMobile } = homeSlice.actions
export default reducer