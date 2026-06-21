import http from '@/lib/http'
import { TOKEN_IN_LOCALSTORAGE, USER_TOKEN, EXPIRED_TIME_TOKEN, REFRESH_TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { Service } from './UserServices'
export const servicePattern = {
    getListProduct: 'room/list',
    getDetailProduct: 'room/detail',
    getFavouriteProducts: 'user/favorite',
}
import { authenNextServer } from '@/Services/NextAuthenServer'
import { checkExpiredToken } from '@/common/FunctionCommon/FunctionCommon'
import { getRefeshTokenByNextServer } from './NextAuthenServer'

export async function getProductsApi(data) {
    const isExpired = checkExpiredToken(data.expired_time)
    let token = data.sessionToken
    let refreshToken = null
    let expiredTime = null
    let isRefreshToken = false
    console.log('isExpired:', isExpired)
    console.log('data.sessionToken:', data.sessionToken)
    if (isExpired && data.sessionToken) {
        const getRefreshTokenPayload = {
            refreshToken: data.refreshToken.value,
            sessionToken: data.sessionToken
        }
        try {
            const res = await getRefeshTokenByNextServer(getRefreshTokenPayload)
            const { access_token, refresh_token, expired_time } = res.payload.data
            isRefreshToken = true
            token = access_token
            refreshToken = refresh_token
            expiredTime = expired_time
        } catch (e) {
            console.log('errrrrr:', e)
        }
    }
    let result = `${servicePattern.getListProduct}?`
    if (data.limit !== null && data.limit !== undefined) {
        result = `${result}limit=${data.limit}&&`
    }
    if (data.offset !== null && data.offset !== undefined) {
        result = `${result}offset=${data.offset}&&`
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
    const url = result
    console.log('tokenTTT:', token)
    const options = {
        next: { tags: ['list-rooms'] }, //key để caching
        headers: {
            // Authorization: `Bearer ${token}`
        },
        isRefreshToken:isRefreshToken,
        newTokenInfo:{
            access_token:token,
            refresh_token:refreshToken,
            expired_time:expiredTime
        }
    }
    console.log('urlGGG:', url)
    return http.get(url, options)
}

export async function getDetailRoomApi(data) {
    const url = `${servicePattern.getDetailProduct}/${data.roomId}`
    const isExpired = checkExpiredToken(data.expired_time)
    let token = data.sessionToken
    let refreshToken = null
    let expiredTime = null
    let isRefreshToken = false
    if (isExpired && data.sessionToken) {
        const getRefreshTokenPayload = {
            refreshToken: data.refreshToken.value,
            sessionToken: data.sessionToken
        }
        try {
            const res = await getRefeshTokenByNextServer(getRefreshTokenPayload)
            const { access_token, refresh_token, expired_time } = res.payload.data
            isRefreshToken = true
            token = access_token
            refreshToken = refresh_token
            expiredTime = expired_time
        } catch (e) {
            console.log('errrrrr:', e)
        }
    }
    const options = {
        // next: { tags: ['room-detail'] } //key để caching
        next: {
            cache: 'no-store',
            revalidate: 0
        }, //key để caching
        headers: {
            Authorization: `Bearer ${token}`
        },
        isRefreshToken:isRefreshToken,
        newTokenInfo:{
            access_token:token,
            refresh_token:refreshToken,
            expired_time:expiredTime
        }
    }
    return http.get(url, options)
}

