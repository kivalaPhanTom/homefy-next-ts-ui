import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/HomeType'

export const getListProductHome: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_LIST_PRODUCT)
export const getOptionSearchAdressResult: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_OPTION_SEARCH_ADDRESS_RESULT) //sẽ xóa
