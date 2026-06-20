import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/AboutMeType'

export const getAboutMe: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_ABOUTME) //sẽ xóa
export const updateAboutMe: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_ABOUTME)
