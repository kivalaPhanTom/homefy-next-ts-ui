import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
const initialState = {
    // addressHistoryData: [],
    firstInfo:null,
    first_img_urls:[],
    secondInfo:null,
    photo_type:null,
    isLoading:false,
    listPhotoType:[
        {
            id:'AustralianDriverLicence',
            name:'Australian Driver Licence',
            type:1, //render form thứ 1
        },
        {
            id:'AustralianPassport',
            name:'Australian Passport',
            type:2,  //render form thứ 2
        },
        {
            id:'OverseasPassport',
            name:'Overseas Passport',
            type:3,  //render form thứ 3
        },
        {
            id:'other',
            name:'Other',
            type:null, // Không render form nào
        },
    ]
}

const identifyDocumentSlice = createSlice({
    name: 'identifyDocumentSlice',
    initialState,
    reducers: {
        setIdentifyDocumentData: (state, action) => { //sẽ xóa
            const {first_img_info, first_img_urls, photo_type, second_img_urls} = action.payload
            let document_first_img_urls = []
            if (first_img_urls) {
                first_img_urls.forEach(element => {
                    document_first_img_urls.push({
                        uid: uuidv4(),
                        name: element,
                        status: 'done',
                        url: element,
                    })
                })
            }

            let newState = { ...state }
            newState.firstInfo = first_img_info
            newState.first_img_urls = first_img_urls ? document_first_img_urls :[]
            newState.photo_type = photo_type
            newState.secondInfo = second_img_urls
            return newState
        },
        setLoadingIdentifyDocument:(state, action) => {
            let newState = { ...state }
            newState.isLoading = action.payload
            return newState
        },
        resetData:(state) => {
            let newState = { ...state }
            newState.firstInfo = null
            newState.first_img_urls = []
            newState.photo_type = null
            newState.secondInfo = null
            return newState
        },
        setListPhotoType:(state, action) => {
            let newState = { ...state }
            newState.listPhotoType = action.payload
            return newState
        },
    },
});
const { reducer } = identifyDocumentSlice
export const { setIdentifyDocumentData, setLoadingIdentifyDocument, resetData, listPhotoType } = identifyDocumentSlice.actions
export default reducer