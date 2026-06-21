import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
const initialState = {
    id: null,
    introduction: '',
    document_url: '',
    user_id: null,
    isLoading: false,
}

const aboutMeSlice = createSlice({
    name: 'aboutMeSlice',
    initialState,
    reducers: {
        setAboutMeInfo: (state, action) => { //sẽ xóa
            let newState = { ...state }
            const { id, introduction, list_document_url, user_id } = action.payload
            let document_url = []
            list_document_url && list_document_url.forEach(element => {
                document_url.push({
                    uid: uuidv4(),
                    name: element,
                    status: 'done',
                    url: element,
                })
            })
            newState.id = id
            newState.introduction = introduction
            newState.document_url = document_url
            newState.user_id = user_id
            return newState
        },
        setLoadingAboutMe: (state, action) => {
            let newState = { ...state }
            newState.isLoading = action.payload
            return newState
        },
        resetData: (state) => {
            let newState = { ...state }
            newState.id = null
            newState.introduction = ''
            newState.document_url = ''
            newState.user_id = null
            return newState
        },
    },
});
const { reducer } = aboutMeSlice;
export const { setAboutMeInfo, setLoadingAboutMe, resetData } = aboutMeSlice.actions;
export default reducer;