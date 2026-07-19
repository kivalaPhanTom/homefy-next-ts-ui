// import { createApi } from '@reduxjs/toolkit/query/react'
// import { servicePattern } from '@/Services/AboutMeServices'
// import { homefyInstanceGet } from '@/Services/configAxios'
// import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

// const axiosBaseQuery = async ({ url, method }: { url: string; method: string }) => {
//     try {
//         const result = await homefyInstanceGet({ url, method })
//         return { data: result.data }
//     } catch (error: any) {
//         return {
//             error: {
//                 status: error?.response?.status ?? 500,
//                 data: error?.response?.data ?? error?.message,
//             },
//         }
//     }
// }

// export const getAboutmeApi = createApi({
//     reducerPath: 'getAboutmeApi',
//     tagTypes: ['aboutmeDetail'],
//     baseQuery: axiosBaseQuery,
//     endpoints: (builder) => ({
//         getAboutme: builder.query<unknown, void>({
//             query: () => ({
//                 url: servicePattern.getAboutme,
//                 method: 'GET'
//             }),
//             keepUnusedDataFor: CACHE_TIME,
//             providesTags: () => [{ type: 'aboutmeDetail', id: 'ABOUTME_DETAIL' }],
//         }),
//     })
// })

// export const { useGetAboutmeQuery } = getAboutmeApi