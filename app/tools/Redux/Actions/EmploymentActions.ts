import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/EmploymentType'

export const getEmployment: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_EMPLOYMENT) //sẽ xóa
export const updateEmployment: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_EMPLOYMENT)