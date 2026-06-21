import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    listProduct: [],
    isShowBtnLoadmore:true,
    total:0,
}
const favouriteProductSlice = createSlice({
    name: 'favouriteProductSlice',
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
        setShowBtnLoadmore:(state, action) => {
            let newState = { ...state }
            newState.isShowBtnLoadmore = action.payload
            return newState
        },
        resetData:(state) => {
            let newState = { ...state }
            newState.listProduct = []
            newState.isShowBtnLoadmore = true
            newState.total = 0
            return newState
        },
    },
});
const { reducer } = favouriteProductSlice
export const { setListProduct, setShowBtnLoadmore, resetData, setTotal } = favouriteProductSlice.actions
export default reducer