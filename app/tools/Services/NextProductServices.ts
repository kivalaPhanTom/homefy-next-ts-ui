import { getApi } from '@/lib/http'
export const servicePattern = {
    getListProduct: 'room/list',
    getDetailProduct: 'room/detail',
    getFavouriteProducts: 'user/favorite',
}

export async function getProductsApi(data: any) {
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
    return getApi(url, {
        next: { tags: ['list-rooms'] }, //key để caching
        auth: {
            sessionToken: data.sessionToken,
            expiredTime: data.expired_time,
            refreshToken: data.refreshToken,
        },
    })
}

export async function getDetailRoomApi<T = any>(data: any): Promise<{ data: T; options: any }> {
    const url = `${servicePattern.getDetailProduct}/${data.roomId}`
    return getApi<T>(url, {
        next: {
            cache: 'no-store',
            revalidate: 0
        }, //key để caching
        auth: {
            sessionToken: data.sessionToken,
            expiredTime: data.expired_time,
            refreshToken: data.refreshToken,
        },
    })
}
