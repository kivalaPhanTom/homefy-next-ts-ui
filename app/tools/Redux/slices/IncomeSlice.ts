import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
const initialState = {
    list_income: null,
    list_proof_url: [],
    has_income: false,
    user_id: null,
    isLoading: false,
    id:null
}

const incomeSlice = createSlice({
    name: 'incomeSlice',
    initialState,
    reducers: {
        setIncome: (state, action) => {
            let newState = { ...state }
            const { id, has_income, income_sources, list_proof_url, user_id } = action.payload
            let income_sourcesClone = []
            if(income_sources){
                income_sourcesClone = JSON.parse(JSON.stringify(income_sources))
                income_sourcesClone.forEach(el =>{
                    el.id = uuidv4()
                })
            }
           
            let document_url = []
            if (list_proof_url) {
                list_proof_url.forEach(element => {
                    document_url.push({
                        uid: uuidv4(),
                        name: element,
                        status: 'done',
                        url: element,
                    })
                })
            }
            newState.list_income = income_sourcesClone
            newState.has_income = has_income
            newState.list_proof_url = document_url
            newState.user_id = user_id
            newState.id = id
            return newState
        },
        setLoadingIncome: (state, action) => {
            let newState = { ...state }
            newState.isLoading = action.payload
            return newState
        },
        resetData: (state) => {
            let newState = { ...state }
            newState.list_income = []
            newState.list_proof_url = []
            newState.has_income = false
            newState.user_id = null
            newState.id = null
            return newState
        },
    },
});
const { reducer } = incomeSlice;
export const { setIncome, setLoadingIncome, resetData } = incomeSlice.actions;
export default reducer;