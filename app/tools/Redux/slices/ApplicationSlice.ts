import { createSlice } from '@reduxjs/toolkit'
const initialState = {
   applicationInfo:null
}

const applicationSlice = createSlice({
    name: 'applicationSlice',
    initialState,
    reducers: {
        setApplicationInfo:(state, action) => {
            let newState = { ...state }
            newState.applicationInfo = action.payload
            return newState
        },
    },
});
const { reducer } = applicationSlice
export const { setApplicationInfo } = applicationSlice.actions
export default reducer