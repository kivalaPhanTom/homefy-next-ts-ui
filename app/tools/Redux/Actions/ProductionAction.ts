import { createAction } from '@reduxjs/toolkit'
import { checkRoomAvailabilityType } from '@/common/types/RoomTypes'
import * as ACTION_TYPES from '../ActionTypes/ProductType'

export const getProductDetail: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_PRODUCT_DETAIL)
export const filterProductInFilterPage: ReturnType<typeof createAction> = createAction(ACTION_TYPES.FILTER_LIST_PRODUCT_IN_FILTER_PAGE)
export const getFavouriteProducts: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_FAVOURITE_PRODUCTS)
export const checkRoomAvailability = createAction<checkRoomAvailabilityType>(ACTION_TYPES.CHECK_ROOM_AVAILABILITY)