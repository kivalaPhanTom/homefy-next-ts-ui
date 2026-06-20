import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/BookingType'

export const createBooking: ReturnType<typeof createAction> = createAction(ACTION_TYPES.CREATE_BOOKING)
