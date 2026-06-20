'use client'
import { USER_TOKEN } from "@/common/ParamsCommon/ParamsCommon"
// import { useSearchParams } from 'react-router-dom'

export function getCookie(cname:string) {
    if(document){
        let name = cname + "="
        let ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
        }
        return ""
    }else{
         return ""
    }  
}
export function getLocalStorage(name_localstorage:string) {
    let result = ''
    if (typeof window !== 'undefined') {
        if (localStorage) {
            result = localStorage.getItem(name_localstorage)
            if (result) {
                result = JSON.parse(result)
            } else {
                result = ''
            }
        }
    }
    return result
}

export function handleCheckUserTokenExits() {
    let result = false
    const tokenUser = getCookie(USER_TOKEN)
    if (tokenUser) result = true
    return result
}
// export function renderQueryString() {
//     const searchParams = useSearchParams()
//     const searchParamsObject = Object.fromEntries([...searchParams])
//     return searchParamsObject   
// }
// export function renderQueryString() {
//     const [searchParams] = useSearchParams()
//     const searchParamsObject = Object.fromEntries([...searchParams])
//     return searchParamsObject
// }

export const setSessionStorage = (key:string, value:any) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key:string) => {
    if (typeof window === "undefined") return null;
    const value = sessionStorage.getItem(key);
    if (!value) return null;

    try {
        return JSON.parse(value);
    } catch (error) {
        console.error("Lỗi parse dữ liệu sessionStorage:", error);
        return null;
    }
};

export const removeSessionStorage = (key:string) => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(key);
};