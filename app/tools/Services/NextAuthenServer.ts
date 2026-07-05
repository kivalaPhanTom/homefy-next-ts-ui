import { getApi, postApi, putApi, deleteApi } from '@/lib/http'
import { NEXT_URL } from '@/common/ParamsCommon/ParamsCommon'

const servicePattern = {
    setAuthen: 'tools/apiNextServerInternal/auth',
    getRefeshToken: 'users/refresh_token',
}
interface AuthenNextServerPayload {
    token: string;
    refreshToken: string;
    expired_time: number;
}
export function authenNextServer(payload: AuthenNextServerPayload) {
    const { token, refreshToken, expired_time } = payload
    const url = servicePattern.setAuthen
    const body = {
        sessionToken: token,
        refreshToken,
        expired_time
    }
    const options = {
        baseURL: NEXT_URL,
    }
    return postApi(url, body, options)
}
export function logoutNextServer() {
    const url = servicePattern.setAuthen
    const options = {
        baseURL: NEXT_URL,
    }
    return deleteApi(url, options)
}

export async function getRefeshTokenByNextServer(data: { refreshToken: string; sessionToken: string }) {
    const { refreshToken, sessionToken } = data
    const url = servicePattern.getRefeshToken
    const body = {
        refresh_token: refreshToken,
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
    return postApi(url, body, options)
}