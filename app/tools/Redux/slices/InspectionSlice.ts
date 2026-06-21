import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isOpenPopup: false,
    step: 0,
    showPickyDateTime: false,
    inspectionTimeInfo: {
        year: null,
        month: null,
        date: null,
        hour: null,
        minute: null,
        second: null
    }
}

const inspectionSlice = createSlice({
    name: 'inspectionSlice',
    initialState,
    reducers: {
        setOpenPopup: (state, action) => {
            let newState = { ...state }
            newState.isOpenPopup = action.payload
            return newState
        },
        setStep: (state, action) => {
            let newState = { ...state }
            newState.step = action.payload
            return newState
        },
        setInspectionTimeInfo: (state, action) => {
            let newState = { ...state }
            newState.inspectionTimeInfo = action.payload
            return newState
        },
        setShowPickyDateTime: (state, action) => {
            let newState = { ...state }
            newState.showPickyDateTime = action.payload
            return newState
        },
    },
});
const { reducer } = inspectionSlice
export const { setOpenPopup, setStep, setInspectionTimeInfo, setShowPickyDateTime } = inspectionSlice.actions
export default reducer