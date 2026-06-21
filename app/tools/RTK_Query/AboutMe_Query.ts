import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/AboutMeServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

export const getAboutmeApi = createApi({
    reducerPath: 'getAboutmeApi',
    tagTypes: ['getAboutmeApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        getAboutme: builder.query({  //lấy danh sách theo phân trang, hoặc keysearch
            query: () => {
                return ({
                    url: servicePattern.getAboutme,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'aboutmeDetail', id: 'ABOUTME_DETAIL' }]
            },
            //providesTags có thể là array hoặc callback trả về array, Nếu có bất kỳ một invalidatesTag nào match với providesTags này thì sẽ làm cho query này chạy lại
        }),
    })
})

export const { useGetAboutmeQuery } = getAboutmeApi