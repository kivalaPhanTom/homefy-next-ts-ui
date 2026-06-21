import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/HouseHoldServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

export const houseHoldApi = createApi({
    reducerPath: 'houseHoldApi',
    tagTypes: ['houseHoldApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        getHouseHoldPeople: builder.query({
            query: () => {
                return ({
                    url: servicePattern.getHouseHoldPeople,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'houseHoldPeopleDetail', id: 'HOUSE_HOLD_PEOPLE_DETAIL' }]
            },
        }),
        getHouseHoldPet: builder.query({
            query: () => {
                return ({
                    url: servicePattern.getHouseHoldPet,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'houseHoldPetDetail', id: 'HOUSE_HOLD_PET_DETAIL' }]
            },
        }),
    })
})

export const { useGetHouseHoldPeopleQuery, useGetHouseHoldPetQuery } = houseHoldApi