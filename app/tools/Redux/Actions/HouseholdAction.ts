import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/HouseholdType'

export const getHouseHoldPeoplePet: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_HOUSE_HOLD_PEOPLE_PET)
export const getHouseHoldPeople: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_HOUSE_HOLD_PEOPLE) //sẽ xóa
export const getHouseHoldPet: ReturnType<typeof createAction> = createAction(ACTION_TYPES.GET_HOUSE_HOLD_PET) //sẽ xóa
export const updateHouseHoldPeople: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_HOUSE_HOLD_PEOPLE)
export const updateHouseHoldPet: ReturnType<typeof createAction> = createAction(ACTION_TYPES.UPDATE_HOUSE_HOLD_PET)