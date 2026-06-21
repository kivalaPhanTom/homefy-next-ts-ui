import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/EmploymentServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

export const employmentDetailApi = createApi({
    reducerPath: 'employmentDetailApi',
    tagTypes: ['employmentDetailApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        getEmploymentDetail: builder.query({
            query: () => {
                return ({
                    url: servicePattern.getEmployment,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'employmentDetail', id: 'EMPLOYMENT_DETAIL' }]
            },
        }),
    })
})

export const { useGetEmploymentDetailQuery } = employmentDetailApi