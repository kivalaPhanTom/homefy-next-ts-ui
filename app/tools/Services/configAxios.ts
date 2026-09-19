import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { VITE_API_URL, VITE_TIMEOUT } from '../config'
import { getCookie } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { USER_TOKEN, REFRESH_TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { calculateExpiredTime } from '@/common/FunctionCommon/FunctionCommon'
import { authenNextServer } from '@/Services/NextAuthenServer'
import { logOut } from '@/Redux/Actions/UserAction'

const REFRESH_TOKEN_URL = 'users/refresh_token'
const REVOKE_TOKEN_URL = 'users/revoke_token'

export const homefyInstance = axios.create({
    method: 'post',
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const homefyInstancePut = axios.create({
    method: 'put',
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const homefyInstanceDelete = axios.create({
    method: 'delete',
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const homefyInstanceGet = axios.create({
    method: 'get',
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const homefyInstanceForm = axios.create({
    method: 'post',
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

const bareInstance = axios.create({
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
})

let browserRefreshInFlight: Promise<string | null> | null = null

async function refreshBrowserSession(): Promise<string | null> {
    const refreshToken = getCookie(REFRESH_TOKEN_IN_LOCALSTORAGE)
    if (!refreshToken) return null
    try {
        const res = await bareInstance.post(REFRESH_TOKEN_URL, { refresh_token: refreshToken })
        const result = res.data?.result ?? res.data?.data
        const accessToken = result?.access_token
        if (!accessToken) return null
        const expiredTime = result?.expired_time ?? (result?.expires_in ? calculateExpiredTime(result.expires_in) : null)
        await authenNextServer({
            token: accessToken,
            refreshToken: result?.refresh_token ?? '',
            expired_time: expiredTime,
        })
        return accessToken
    } catch (error) {
        console.error('[configAxios] Failed to refresh token, forcing logout:', error)
        return null
    }
}

let isForceLogoutDispatched = false

async function forceLogoutBrowser() {
    if (isForceLogoutDispatched) return
    isForceLogoutDispatched = true
    const { default: store } = await import('@/Redux/store')
    store.dispatch(logOut({}))
}

function applyAuthInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(config => {
        const token = getCookie(USER_TOKEN)
        if (token) {
            config.headers.Authorization = "Bearer " + token
        }
        return config
    }, null)

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error?.config as (InternalAxiosRequestConfig & { _retried?: boolean }) | undefined
            const requestUrl: string = originalRequest?.url ?? ''
            if (requestUrl.includes(REFRESH_TOKEN_URL) || requestUrl.includes(REVOKE_TOKEN_URL)) {
                return Promise.reject(error)
            }
            if (error?.response?.status !== 401 || !originalRequest || originalRequest._retried) {
                return Promise.reject(error)
            }
            originalRequest._retried = true
            if (!browserRefreshInFlight) {
                browserRefreshInFlight = refreshBrowserSession().finally(() => {
                    browserRefreshInFlight = null
                })
            }
            const accessToken = await browserRefreshInFlight
            if (!accessToken) {
                await forceLogoutBrowser()
                return Promise.reject(error)
            }
            originalRequest.headers.Authorization = "Bearer " + accessToken
            return instance(originalRequest)
        }
    )
}

applyAuthInterceptors(homefyInstance)
applyAuthInterceptors(homefyInstancePut)
applyAuthInterceptors(homefyInstanceDelete)
applyAuthInterceptors(homefyInstanceGet)
applyAuthInterceptors(homefyInstanceForm)
