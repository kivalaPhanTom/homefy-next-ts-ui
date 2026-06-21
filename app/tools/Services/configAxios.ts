import axios from 'axios'
import { VITE_API_URL, VITE_TIMEOUT } from '../config'
import { getLocalStorage, getCookie } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import { TOKEN_IN_LOCALSTORAGE, USER_TOKEN, EXPIRED_TIME_TOKEN, REFRESH_TOKEN_IN_LOCALSTORAGE } from '@/common/ParamsCommon/ParamsCommon'
import { checkExpiredToken } from '@/common/FunctionCommon/FunctionCommon'
import { Service } from './UserServices'
import { authenNextServer } from '@/Services/NextAuthenServer'

export const homefyInstance = axios.create({
    method: 'post',
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // "Authorization": token ? `Bearer ${token}` : null
    },
})
homefyInstance.interceptors.request.use(config => {
    // return handleRefreshToken(config)
    if(getCookie(USER_TOKEN)){
        config.headers.Authorization = "Bearer " + getCookie(USER_TOKEN)
    }
    return config
}, null)

export const homefyInstancePut = axios.create({
    method: 'put',
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // "Authorization": token ? `Bearer ${token}` : null
    },
})
homefyInstancePut.interceptors.request.use(config => {
    // return handleRefreshToken(config)
    config.headers.Authorization = "Bearer " + getCookie(USER_TOKEN)
    return config
}, null)

export const homefyInstanceDelete = axios.create({
    method: 'delete',
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // "Authorization": token ? `Bearer ${token}` : null
    },
})
homefyInstanceDelete.interceptors.request.use(config => {
    // return handleRefreshToken(config)
    config.headers.Authorization = "Bearer " + getCookie(USER_TOKEN)
    return config
}, null)

// homefyInstanceDelete.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async function (error) {
//         if (error.response && error.response.status === 401) {
//             handleRefreshToken(error, homefyInstanceGet)
//         } else {
//             return Promise.reject(error);
//         }
//     }
// )


export const homefyInstanceGet = axios.create({
    method: 'get',
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // "Authorization": token ? `Bearer ${token}` : null
    },
})
homefyInstanceGet.interceptors.request.use(config => {
    // return handleRefreshToken(config)
    config.headers.Authorization = "Bearer " + getCookie(USER_TOKEN)
    return config
}, null)
// homefyInstanceGet.interceptors.request.use(
//     async (config) => {
//     //  return await handleRefreshToken(config)
//         const expired_time = getCookie(EXPIRED_TIME_TOKEN)
//         const refreshToken = getCookie(REFRESH_TOKEN_IN_LOCALSTORAGE)
//         const isExpired = checkExpiredToken(expired_time)
//         // const res = Service.getRefeshTokenApi({ refresh_token: refreshToken });
//         if(isExpired){
//             const customError = new Error('TOKEN_EXPIRED');
//             throw new Error('Special endpoint not allowed');
//             // return config;
//             // You can also include additional information in the error object
//             // customError.response = error.response; // You can attach the original error response
//             // return Promise.reject(customError)
//         }
//         config.headers.Authorization = "Bearer " + getCookie(USER_TOKEN)
//         return config
//     },
//     (error) => {
//         console.log('dfdfdfDF:', error.response)
//       return Promise.reject(error);
//     }
//   );
// homefyInstanceGet.interceptors.request.use(
//     async function (config) {
//       return handleRefreshToken(config)
//     // config.headers.Authorization = "Bearer " + getCookie(USER_TOKEN)
//     // return config
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );
  
  homefyInstanceGet.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        if (error.response && error.response.status === 401) {
            handleRefreshToken(error, homefyInstanceGet)
        } else {
            return Promise.reject(error);
        }
    }
)


export const homefyInstanceForm = axios.create({
    method: 'post',
    baseURL: VITE_API_URL,
    timeout: VITE_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
        // "Authorization": token ? `Bearer ${token}` : null
    },
});
homefyInstanceForm.interceptors.request.use(config => {
    config.headers.Authorization = "Bearer " + getCookie(USER_TOKEN)
    return config
}, null)

// function handleRefreshToken(config) {
//     const expired_time = getCookie(EXPIRED_TIME_TOKEN)
//     const refreshToken = getCookie(REFRESH_TOKEN_IN_LOCALSTORAGE)
//     const isExpired = checkExpiredToken(expired_time)
//     console.log('isExpired:', isExpired)
//     // const isExpired = true
//     if(isExpired){
//         // const res = await Sevrice.getRefeshTokenApi({ refresh_token: refreshToken });
//         // console.log('resccccc:', res)
//         // if (res.data.isError === false) {
//         //     const { access_token, refresh_token, expired_time } = res.data.data
//         //     await authenNextServer({
//         //         token: access_token,
//         //         refreshToken: refresh_token,
//         //         expired_time
//         //     })
//         //     config.headers.Authorization = "Bearer " + access_token
//         // } else {
//         // }
//         // config.headers.Authorization = "Bearer " + getCookie(USER_TOKEN)
//         return Promise.reject("Request rejected for some reason");
//     }else{
//         config.headers.Authorization = "Bearer " + getCookie(USER_TOKEN)
//     }
//     // config.headers.Authorization = "Bearer " + getCookie(USER_TOKEN)
//     return config
// }

// async function handleRefreshToken(error, instanceFunc) {
//     const refreshToken = getCookie(REFRESH_TOKEN_IN_LOCALSTORAGE)
//     const expired_time = getCookie(EXPIRED_TIME_TOKEN)
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && expired_time &&!originalRequest._retry) {
//         const res = await Service.getRefeshTokenApi({ refresh_token: refreshToken });
//         const { access_token, refresh_token, expired_time } = res.data.data
//         await authenNextServer({
//                 token: access_token,
//                 refreshToken: refresh_token,
//                 expired_time
//             })
//         return instanceFunc(originalRequest);
//     }
//     return Promise.reject(error);
// }