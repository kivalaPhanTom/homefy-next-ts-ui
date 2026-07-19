import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/ProductServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

interface RoomsApiResponse {
    result: {
        data: any[]
        count: number
    }
}

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

export const getRoomsApi = createApi({
    reducerPath: 'roomsHomeApi',
    tagTypes: ['roomsListApi', 'favouriteRoomsListApi'],
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getRooms: builder.query<RoomsApiResponse, { data: Record<string, any> }>({
            query: (payload) => {
                const { data } = payload
                let result = `${servicePattern.getListProduct}?`
                if (data.currentPage !== null && data.currentPage !== undefined) {
                    result = `${result}page=${data.currentPage}&`
                }
                if (data.pageSize !== null && data.pageSize !== undefined) {
                    result = `${result}size=${data.pageSize}&`
                }
                if (data.min_price !== null && data.min_price !== undefined) {
                    result = `${result}min_price=${data.min_price}&&`
                }
                if (data.max_price !== null && data.max_price !== undefined) {
                    result = `${result}max_price=${data.max_price}&&`
                }
                if (data.address) {
                    result = `${result}address=${data.address}&&`
                }
                if (data.criteria) {
                    result = `${result}criteria=${data.criteria}&&`
                }
                return ({
                    url: result,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,
            providesTags: () => [{ type: 'roomsListApi', id: 'ROOMS_LIST' }],
        }),
        getFavouriteRooms: builder.query<RoomsApiResponse, { data: Record<string, any> }>({
            query: (payload) => {
                const { data } = payload
                let result = `${servicePattern.getFavouriteProducts}?`
                if (data.limit) {
                    result = `${result}limit=${data.limit}&&`
                }
                if (data.offset !== null && data.offset !== undefined) {
                    result = `${result}offset=${data.offset}&&`
                }
                return ({
                    url: result,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,
            providesTags: () => [{ type: 'favouriteRoomsListApi', id: 'FAVOURITE_ROOMS_LIST' }],
        })
    })
})

export const { useLazyGetRoomsQuery, useLazyGetFavouriteRoomsQuery } = getRoomsApi