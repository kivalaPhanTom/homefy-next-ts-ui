import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    id: null,
    email: '',
    name: '',
    phone_number: '',
    region: '',
    relationship: '',
    user_id: null,
    isLoading: false,
}
const emergencyContactSlice = createSlice({
    name: 'emergencyContactSlice',
    initialState,
    reducers: {
        setEmergencyInfo: (state, action) => {
            let newState = { ...state }
            const { id, email, name, phone_number, region, relationship, user_id } = action.payload
            newState.id = id
            newState.email = email
            newState.name = name
            newState.phone_number = phone_number
            newState.region = region
            newState.relationship = relationship
            newState.user_id = user_id
            return newState
        },
        setLoadingsetEmergency: (state, action) => {
            let newState = { ...state }
            newState.isLoading = action.payload
            return newState
        },
        resetData: (state) => {
            let newState = { ...state }
            newState.id = null
            newState.email = ''
            newState.name = ''
            newState.phone_number = ''
            newState.region = ''
            newState.relationship = ''
            newState.user_id = null
            return newState
        },
    },
});
const { reducer } = emergencyContactSlice;
export const { setEmergencyInfo, setLoadingsetEmergency, resetData } = emergencyContactSlice.actions;
export default reducer;