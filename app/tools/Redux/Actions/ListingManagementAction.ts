import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/ListingManagementType'

export const getListings: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_LISTINGS)
export const getListingInfo: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_LISTING_INFO) //sẽ xóa
export const insertListing: ReturnType<typeof createAction> = createAction(ACTION_TYPES.INSERT_LISTING)
export const updateListing: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_LISTING)
export const deleteListing: ReturnType<typeof createAction> = createAction(ACTION_TYPES.DELETE_LISTING)
export const getAddressResult: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_ADDRESS_RESULT) //sẽ xóa
