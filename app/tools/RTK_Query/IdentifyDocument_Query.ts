import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/IdentifyServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

export const identifyDocumentApi = createApi({
    reducerPath: 'identifyDocumentApi',
    tagTypes: ['identifyDocumentApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        getIdentifyDocumentDetail: builder.query({
            query: () => {
                return ({
                    url: servicePattern.getIdentify,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'identifyDocumentDetail', id: 'IDENTIFY_DOCUMENT_DETAIL' }]
            },
        }),
    })
})

export const { useGetIdentifyDocumentDetailQuery } = identifyDocumentApi