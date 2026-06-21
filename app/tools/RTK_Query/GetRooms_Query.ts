import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/ProductServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

export const getRoomsApi = createApi({
    reducerPath: 'roomsHomeApi',
    tagTypes: ['roomsHomeApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        getRooms: builder.query({  //lấy danh sách theo phân trang, hoặc keysearch
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
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'roomsListApi', id: 'ROOMS_LIST' }]
            },
        }),
        getFavouriteRooms: builder.query({
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
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'favouriteRoomsListApi', id: 'FAVOURITE_ROOMS_LIST' }]
            },
        })
    })
})

export const { useLazyGetRoomsQuery, useLazyGetFavouriteRoomsQuery } = getRoomsApi