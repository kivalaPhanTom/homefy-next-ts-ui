import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/SearchAddressServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

export const searchAddressResultApi = createApi({
    reducerPath: 'searchAddressResultApi',
    tagTypes: ['searchAddressResultApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        searchAddressResult: builder.query({
            query: (payload) => {
                const { data } = payload
                return ({
                    url: `${servicePattern.searchAddress}?query=${data}`,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'searchAddressResultApi', id: 'SEARCH_ADDRESS' }]
            },
        }),
    })
})

export const { useLazySearchAddressResultQuery } = searchAddressResultApi