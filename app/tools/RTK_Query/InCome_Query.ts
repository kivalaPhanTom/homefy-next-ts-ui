import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/InComeServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

export const inComeApi = createApi({
    reducerPath: 'inComeApi',
    tagTypes: ['inComeApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        getInComeDetail: builder.query({
            query: () => {
                return ({
                    url: servicePattern.getIncome,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'incomeDetail', id: 'INCOME_DETAIL' }]
            },
        }),
    })
})

export const { useGetInComeDetailQuery } = inComeApi