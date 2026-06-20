import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/PersonalDetailType'

export const getPersonalDetail: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_PERSONAL_DETAIL) //sẽ xóa
export const updatePersonalDetail: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_PERSONAL_DETAIL)