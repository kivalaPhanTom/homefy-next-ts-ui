import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    // addressHistoryData: [],
    id: null,
    employed: false,
    type: null,
    company_name: '',
    job_title: '',
    start_working_date: null,
    ref_type: null,
    name: '',
    email: '',
    region: null,
    phone_number: null,
    abn_acn:'',
    user_id: null,
    isLoading: false,
}

const employmentSlice = createSlice({
    name: 'employmentSlice',
    initialState,
    reducers: {
        setEmploymentData: (state, action) => {
            let newState = { ...state }
            const { id, employed, type, company_name, job_title, start_working_date, ref_type, name, email, region, phone_number, user_id, abn_acn } = action.payload
            newState.id = id
            newState.employed = employed !== null ? employed : null
            newState.type = type
            newState.company_name = company_name
            newState.job_title = job_title
            newState.start_working_date = start_working_date
            newState.ref_type = ref_type
            newState.name = name
            newState.email = email
            newState.region = region
            newState.phone_number = phone_number
            newState.abn_acn = abn_acn ? abn_acn :''
            newState.user_id = user_id
            return newState
        },
        setLoadingEmployment: (state, action) => {
            let newState = { ...state }
            newState.isLoading = action.payload
            return newState
        },
        resetData: (state) => {
            let newState = { ...state }
            // newState.addressHistoryData = []
            return newState
        },
    },
});
const { reducer } = employmentSlice
export const { setEmploymentData, setLoadingEmployment, resetData } = employmentSlice.actions
export default reducer