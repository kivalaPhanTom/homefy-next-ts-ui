import { getApi, postApi } from '@/lib/http'
import { TOKEN_IN_LOCALSTORAGE, USER_TOKEN, EXPIRED_TIME_TOKEN, REFRESH_TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { Service } from './UserServices'
export const servicePattern = {
    getListProduct: 'room/list',
    getDetailProduct: 'room/detail',
    getFavouriteProducts: 'user/favorite',
}
import { authenNextServer } from '@/Services/NextAuthenServer'
import { checkExpiredToken, calculateExpiredTime } from '@/common/FunctionCommon/FunctionCommon'
import { getRefeshTokenByNextServer } from './NextAuthenServer'

// interface RefreshTokenResponse {
//     data: {
//         code: number,
//         message: string,
//         result: {
//             access_token: string,
//             refresh_token: string,
//             expires_in: number
//         }
//     };
// }

export async function getProductsApi(data: any) {

    let token = data.sessionToken
    let refreshToken = null
    let expiredTime = null
    let isRefreshToken = false

    if (token) { // need authen
        const isExpired = checkExpiredToken(data.expired_time)
        if (isExpired) {
            const getRefreshTokenPayload = {
                refreshToken: data.refreshToken.value,
                sessionToken: data.sessionToken
            }
            try {
                const res: any = await getRefeshTokenByNextServer(getRefreshTokenPayload)
                const { access_token, refresh_token, expires_in } = res.data.result
                isRefreshToken = true
                token = access_token
                refreshToken = refresh_token
                expiredTime = calculateExpiredTime(expires_in)
            } catch (e) {
                console.log('errrrrr:', e)
            }
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
    const headers: Record<string, string> = {}
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const options = {
        next: { tags: ['list-rooms'] }, //key để caching
        headers,
        isRefreshToken: isRefreshToken,
        newTokenInfo: {
            access_token: token,
            refresh_token: refreshToken,
            expired_time: expiredTime
        }
    }
    return getApi(url, options)
}

export async function getDetailRoomApi<T = any>(data: any): Promise<{ data: T; options: any }> {
    const url = `${servicePattern.getDetailProduct}/${data.roomId}`
    let token = data.sessionToken
    let refreshToken = null
    let expiredTime = null
    let isRefreshToken = false

    if (token) { // need authen
        const isExpired = checkExpiredToken(data.expired_time)
        if (isExpired) {
            const getRefreshTokenPayload = {
                refreshToken: data.refreshToken.value,
                sessionToken: data.sessionToken
            }
            try {
                const res: any = await getRefeshTokenByNextServer(getRefreshTokenPayload)
                const { access_token, refresh_token, expires_in } = res.data.result
                isRefreshToken = true
                token = access_token
                refreshToken = refresh_token
                expiredTime = calculateExpiredTime(expires_in)
            } catch (e) {
                console.log('errrrrr:', e)
            }
        }
    }
    const headers: Record<string, string> = {}
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const options = {
        // next: { tags: ['room-detail'] } //key để caching
        next: {
            cache: 'no-store',
            revalidate: 0
        }, //key để caching
        headers:headers,
        isRefreshToken: isRefreshToken,
        newTokenInfo: {
            access_token: token,
            refresh_token: refreshToken,
            expired_time: expiredTime
        }
    }
    return getApi<T>(url, options)
}

