import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isOpenPop: false,
}
const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setOpenPopup: (state, action) => {
            let newState = { ...state }
            newState.isOpenPop = action.payload
            return newState
        }
    },
});
const { reducer } = signUpSlice;
export const { setOpenPopup } = signUpSlice.actions;
export default reducer;