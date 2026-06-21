import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    id:null,
    first_name: '',
    last_name: '',
    phone_number:'',
    region:'',
    date_of_birth:null,
    email:'',
    user_id:null,
    isLoading:false,
}
const personalDetailSlice = createSlice({
    name: 'personalDetailSlice',
    initialState,
    reducers: {
        setPersonalDetailInfo: (state, action) => { //sẽ xóa
            let newState = { ...state }
            const {id, first_name, last_name, phone_number, region, date_of_birth, email, user_id} = action.payload
            newState.id = id
            newState.first_name = first_name
            newState.last_name = last_name
            newState.phone_number = phone_number
            newState.date_of_birth = date_of_birth
            newState.region = region
            newState.email = email
            newState.user_id = user_id
            return newState
        },
        setLoadingPersonalDetail:(state, action) => {
            let newState = { ...state }
            newState.isLoading = action.payload
            return newState
        },
        resetData:(state) => { //sẽ xóa
            let newState = { ...state }
            newState.id = null
            newState.first_name = ''
            newState.last_name = ''
            newState.phone_number = ''
            newState.date_of_birth = null
            newState.region = ''
            newState.email = ''
            newState.user_id = null
            return newState
        },
    },
});
const { reducer } = personalDetailSlice;
export const {setPersonalDetailInfo, setLoadingPersonalDetail, resetData } = personalDetailSlice.actions;
export default reducer;