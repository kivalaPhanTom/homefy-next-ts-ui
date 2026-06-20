import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/InComeType'

export const getIncomeAction: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_INCOME) //sẽ xóa
export const udpateIncomeAction: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_INCOME)