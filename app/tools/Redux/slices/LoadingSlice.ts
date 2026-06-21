import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLoading: false,
}
const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            let newState = { ...state }
            newState.isLoading = action.payload
            return newState
        }
    },
});
const { reducer } = loadingSlice;
export const { setLoading } = loadingSlice.actions;
export default reducer;