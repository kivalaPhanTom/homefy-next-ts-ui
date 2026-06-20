import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/EmergencyContactType'

export const getEmergencyContact: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_EMERGENCY_CONTACT) //sẽ xóa
export const updateEmergencyContact: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_EMERGENCY_CONTACT)