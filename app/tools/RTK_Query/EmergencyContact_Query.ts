import { createApi } from '@reduxjs/toolkit/query/react'
import { servicePattern } from '@/Services/EmergencyContactServices'
import { homefyInstanceGet } from '@/Services/configAxios'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'

export const emergencyContactApi = createApi({
    reducerPath: 'emergencyContactApi',
    tagTypes: ['emergencyContactApi'],
    baseQuery: homefyInstanceGet,
    endpoints: (builder) => ({
        getEmergencyContact: builder.query({
            query: () => {
                return ({
                    url: servicePattern.getEmergencyContact,
                    method: 'GET'
                })
            },
            keepUnusedDataFor: CACHE_TIME,//thời gian mà RTK query giữ data trong cache, có đơn vị là giây(second), mặc định là 60s
            providesTags: () => {
                return [{ type: 'emergencyContactDetail', id: 'EMERGENCY_CONTACT_DETAIL' }]
            },
        }),
    })
})

export const { useGetEmergencyContactQuery } = emergencyContactApi