import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/IdentifyDocumentType'

export const getIdentifyDocument: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_IDENTIFY_DOCUMENT) //sẽ xóa
export const updateIdentifyDocument: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_IDENTIFY_DOCUMENT)