import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isOpenPop: false,
}
const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {
        setOpenPopup: (state, action) => {
            let newState = { ...state }
            newState.isOpenPop = action.payload
            return newState
        }
    },
});
const { reducer } = forgotPasswordSlice;
export const { setOpenPopup } = forgotPasswordSlice.actions;
export default reducer;