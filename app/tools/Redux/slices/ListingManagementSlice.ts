import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    listings: [],
    listingInfo:null,  //sẽ xóa
    optionAddressSearchResult:[], //sẽ xóa
    isShowBtnLoadmore:true,
    isOpenDeleteListing:false
}

const listingManagementSlice = createSlice({
    name: 'listingManagementSlice',
    initialState,
    reducers: {
        setOptionAddressSearchResult:(state, action) => { //sẽ xóa
            let newState = { ...state }
            newState.optionAddressSearchResult = action.payload
            return newState
        },
        setListings: (state, action) => {
            let newState = { ...state }
            newState.listings = action.payload
            return newState
        },
        setListingInfo:(state, action) => { //sẽ xóa
            let newState = { ...state }
            newState.listingInfo = action.payload
            return newState
        },
        setShowBtnLoadmore:(state, action) => {
            let newState = { ...state }
            newState.isShowBtnLoadmore = action.payload
            return newState
        },
        setOpenDeleteListing:(state, action) => {
            let newState = { ...state }
            newState.isOpenDeleteListing = action.payload
            return newState
        },
        resetData:(state) => {
            let newState = { ...state }
            newState.listings = []
            newState.listingInfo = null
            return newState
        },
    },
});
const { reducer } = listingManagementSlice
export const { setListings, setListingInfo, resetData, setOptionAddressSearchResult, setShowBtnLoadmore, setOpenDeleteListing } = listingManagementSlice.actions
export default reducer