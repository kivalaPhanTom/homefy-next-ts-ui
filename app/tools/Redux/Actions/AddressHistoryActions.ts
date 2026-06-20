import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/AddressHistoryType'

export const getAddressHistory: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_ADDRESS_HISTORY)  //sẽ xóa
export const updateAddressHistory: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_ADDRESS_HISTORY)
export const getAddressResult: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_LOCATION) //sẽ xóa
