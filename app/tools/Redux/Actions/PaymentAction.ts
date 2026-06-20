import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/PaymentType'

export const confirmPayment: ReturnType<typeof createAction> = createAction(ACTION_TYPES.CONFIRM_PAYMENT)