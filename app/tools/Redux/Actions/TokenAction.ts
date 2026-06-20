import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/TokenType'

export const getRefreshToken: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_REFRESH_TOKEN)
export const clearAuthen: ReturnType<typeof createAction> = createAction(ACTION_TYPES.CLEAR_AUTHEN)
export const updateAuthenBrowser: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_AUTHEN_BROWSER)