import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/UserType'

export const loginAction: ReturnType<typeof createAction> = createAction(ACTION_TYPES.LOGIN_ACCOUNT)
