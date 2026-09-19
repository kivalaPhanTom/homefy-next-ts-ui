import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/SearchAddressServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'
import { searchAddressResultResponseType } from '@/common/types/RoomTypes'

const axiosBaseQuery = async ({ url, method }: { url: string; method: string }) => {
    try {
        const result = await homefyInstanceGet({ url, method })
        return { data: result.data }
    } catch (error: any) {
        return {
            error: {
                status: error?.response?.status ?? 500,
                data: error?.response?.data ?? error?.message,
            },
        }
    }
}

export const searchAddressResultApi = createApi({
    reducerPath: 'searchAddressResultApi',
    tagTypes: ['searchAddressResultApi'],
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        searchAddressResult: builder.query<searchAddressResultResponseType, { data: string }>({
            query: (payload) => {
                const { data } = payload
                return ({
                    url: `${servicePattern.searchAddress}?query=${data}`,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,
            providesTags: () => [{ type: 'searchAddressResultApi', id: 'SEARCH_ADDRESS' }],
        }),
    })
})

export const { useLazySearchAddressResultQuery } = searchAddressResultApi