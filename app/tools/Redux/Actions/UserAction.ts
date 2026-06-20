import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/UserType'

export const sigupAccount: ReturnType<typeof createAction> = createAction(ACTION_TYPES.SIGUP_ACCOUNT)
export const forgotPassword: ReturnType<typeof createAction> = createAction(ACTION_TYPES.FORGOT_PASSWORD)
export const userLike: ReturnType<typeof createAction> = createAction(ACTION_TYPES.USER_LIKE)
export const userRemoveLike: ReturnType<typeof createAction> = createAction(ACTION_TYPES.USER_REMOVE_LIKE)
export const logOut: ReturnType<typeof createAction> = createAction(ACTION_TYPES.LOGOUT)
