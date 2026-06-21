import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/AddressHistoryServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

export const addressHistoryApi = createApi({
    reducerPath: 'addressHistoryApi',
    tagTypes: ['addressHistoryApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        getAddressHistoryDetail: builder.query({  //lấy danh sách theo phân trang, hoặc keysearch
            query: () => {
                return ({
                    url: servicePattern.getAddressHistory,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'addressHistoryDetail', id: 'ADDRESS_HISTORY_DETAIL' }]
            },
            //providesTags có thể là array hoặc callback trả về array, Nếu có bất kỳ một invalidatesTag nào match với providesTags này thì sẽ làm cho query này chạy lại
        }),
    })
})

export const { useGetAddressHistoryDetailQuery } = addressHistoryApi