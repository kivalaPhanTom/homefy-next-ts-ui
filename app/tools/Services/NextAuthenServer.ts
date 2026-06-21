import http from '@/lib/http'
import { NEXT_URL } from '@/common/ParamsCommon/ParamsCommon'

const servicePattern = {
    setAuthen: 'tools/apiNextServerInternal/auth',
    getRefeshToken:'user/refresh_token',
}
export function authenNextServer(payload) {
    const {token, refreshToken, expired_time } = payload
    const url = servicePattern.setAuthen
    const body = {
        sessionToken: token,
        refreshToken,
        expired_time
    }
    const options = {
        baseUrl:NEXT_URL,
    }
    return http.post(url, body, options)
}
export function logoutNextServer() {
    const url = servicePattern.setAuthen
    const options = {
        baseUrl:NEXT_URL,
    }
    return http.delete(url, options)
}

export async function getRefeshTokenByNextServer(data) {
    const {refreshToken, sessionToken } = data
    const url = servicePattern.getRefeshToken
    const body = {
        refresh_token:refreshToken,
    }
    const options = {
        next: {
            cache: 'no-store',
            revalidate: 0
        }, //key để caching
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    }
    return http.post(url, body, options)
}