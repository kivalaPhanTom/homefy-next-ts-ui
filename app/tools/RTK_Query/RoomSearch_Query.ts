import { isAxiosError } from 'axios'
import { getRoomsApi } from './GetRooms_Query'
import { CACHE_TIME } from '@/common/ParamsCommon/ParamsCommon'
import { searchRooms, type RoomSearchRequest, type RoomSearchResult } from '@/Services/RoomSearchService'

export const roomSearchApi = getRoomsApi.injectEndpoints({
  endpoints: (builder) => ({
    searchRooms: builder.query<RoomSearchResult, RoomSearchRequest>({
      queryFn: async (request) => {
        try {
          return { data: await searchRooms(request) }
        } catch (error) {
          return {
            error: {
              status: isAxiosError(error) ? error.response?.status ?? 500 : 500,
              data: isAxiosError(error) ? error.response?.data ?? error.message : 'Invalid room search response',
            },
          }
        }
      },
      keepUnusedDataFor: CACHE_TIME,
      providesTags: [{ type: 'roomsListApi', id: 'ROOMS_LIST' }],
    }),
  }),
})

export const { useSearchRoomsQuery, useLazySearchRoomsQuery } = roomSearchApi
