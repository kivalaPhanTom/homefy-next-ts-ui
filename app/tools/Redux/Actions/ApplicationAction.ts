import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/ApplicationType'

export const getApplication: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_APPLICATION)
export const createApplication: ReturnType<typeof createAction> = createAction(ACTION_TYPES.CREATE_APPLICATION)