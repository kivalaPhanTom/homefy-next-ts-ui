import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/PersonalDetailService'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

export const personalDetailApi = createApi({
    reducerPath: 'personalDetailApi',
    tagTypes: ['personalDetailApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        getPersonalDetail: builder.query({
            query: () => {
                return ({
                    url: servicePattern.getPersonalDetail,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'personalDetail', id: 'PERSONAL_DETAIL' }]
            },
        }),
    })
})

export const { useGetPersonalDetailQuery } = personalDetailApi