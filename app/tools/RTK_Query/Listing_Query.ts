import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/ListingManagementService'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'
import { Service as UserService } from '@/Services/UserServices'
import { getCookie } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { TOKEN_IN_LOCALSTORAGE, USER_TOKEN, EXPIRED_TIME_TOKEN, REFRESH_TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { authenNextServer } from '@/Services/NextAuthenServer'
import { checkExpiredToken } from '@/common/FunctionCommon/FunctionCommon'

export const listingApi = createApi({
    reducerPath: 'listingApi',
    tagTypes: ['listingApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        getListingDetail: builder.query({
            query: (payload) => {
                const { roomId } = payload
                // await handleRefreshTokenApi()
                return ({
                    url: `${servicePattern.getListingDetail}/${roomId}`,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'getListingDetail', id: 'GET_LISTING_DETAIL' }]
            },
        }),
        getFurnitures: builder.query({
            query: () => ({
                url: servicePattern.getFurnitures,
                method: 'GET'
            }),
            keepUnusedDataFor: CACHE_TIME,
            providesTags: () => {
                return [{ type: 'getFurnitures', id: 'GET_FURNITURES' }]
            },
        }),
    })
})
async function handleRefreshTokenApi() {
    const refreshToken = getCookie(REFRESH_TOKEN_IN_LOCALSTORAGE)
    const expired_time = getCookie(EXPIRED_TIME_TOKEN)
    const isExpired = checkExpiredToken(expired_time)
    console.log('isExpiredxxx:', isExpired)
    console.log('refreshToken:', refreshToken)
    console.log('expired_time:', expired_time)
    if (isExpired) {
        // const res = yield call(UserService.getRefeshTokenApi, { refresh_token: refreshToken })
        const res = await UserService.getRefeshTokenApi({ refresh_token: refreshToken });
        console.log('res.data.data:', res.data.data)
        // const { access_token, refresh_token, expired_time } = res.data.data;
        // await authenNextServer({
        //         token: access_token,
        //         refreshToken: refresh_token,
        //         expired_time
        // })

        // yield call(authenNextServer, {
        //     token: access_token,
        //     refreshToken: refresh_token,
        //     expired_time
        // })
    }
}
export const { useGetListingDetailQuery, useGetFurnituresQuery } = listingApi