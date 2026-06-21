import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    // addressHistoryData: [],
    isLoading: false,

    idPeople: null,
    isLoadingHouseHoldPeople: false,
    listOccupant: [],
    has_occupant: null,

    idPet: null,
    isLoadingHouseHoldPet: false,
    updated_date_HouseHole_pet:null,
    listNumberPetsInfo: [
        {
            id: 1,
            name: 'Dogs',
            code: 'num_dog',
            max_value: 4,
            value: 0
        },
        {
            id: 2,
            name: 'Cats',
            code: 'num_cat',
            max_value: 4,
            value: 0
        },
        {
            id: 3,
            name: 'Other pets',
            code: 'num_other_pet',
            max_value: 4,
            value: 0
        },
    ]
}

const houseHoldSlice = createSlice({
    name: 'houseHoldSlice',
    initialState,
    reducers: {
        setLoadingHouseHoldPeople: (state, action) => {
            let newState = { ...state }
            newState.isLoadingHouseHoldPeople = action.payload
            return newState
        },
        setLoadingHouseHoldPet: (state, action) => {
            let newState = { ...state }
            newState.isLoadingHouseHoldPet = action.payload
            return newState
        },
        setLoadingHouseHoldSlice: (state, action) => {
            let newState = { ...state }
            newState.isLoading = action.payload
            newState.isLoading = action.payload
            return newState
        },


        setHouseHoldPeopleData: (state, action) => {
            const { occupants_infos } = action.payload
            let newState = { ...state }
            let has_occupant = false
            if (occupants_infos !== null) {
                if (occupants_infos.length > 0) {
                    has_occupant = true
                }
            } else {
                has_occupant = null
            }
            newState.has_occupant = has_occupant
            newState.listOccupant = occupants_infos ? occupants_infos:[]
            return newState
        },
        setHouseHoldPetData: (state, action) => {
            const { id, num_cat, num_dog, num_other_pet, updated_date } = action.payload
            let newState = { ...state }
            newState.idPet = id
            newState.updated_date_HouseHole_pet = updated_date
            newState.listNumberPetsInfo = [
                {
                    id: 1,
                    name: 'Dogs',
                    code: 'num_dog',
                    max_value: 4,
                    value: num_dog
                },
                {
                    id: 2,
                    name: 'Cats',
                    code: 'num_cat',
                    max_value: 4,
                    value: num_cat
                },
                {
                    id: 3,
                    name: 'Other pets',
                    code: 'num_other_pet',
                    max_value: 4,
                    value: num_other_pet
                },
            ]

            return newState
        },


        setListNumberPetsInfo: (state, action) => {
            let newState = { ...state }
            newState.listNumberPetsInfo = action.payload
            return newState
        },
        setListOccupant: (state, action) => {
            let newState = { ...state }
            newState.listOccupant = action.payload
            return newState
        },
        resetData: (state) => {
            let newState = { ...state }
            newState.idPeople = null
            newState.idPet = null
            newState.listOccupant = []
            newState.updated_date_HouseHole_pet = null
            newState.listNumberPetsInfo = [
                {
                    id: 1,
                    name: 'Dogs',
                    code: 'num_dog',
                    max_value: 4,
                    value: 0
                },
                {
                    id: 2,
                    name: 'Cats',
                    code: 'num_cat',
                    max_value: 4,
                    value: 0
                },
                {
                    id: 3,
                    name: 'Other pets',
                    code: 'num_other_pet',
                    max_value: 4,
                    value: 0
                },
            ]
            return newState
        },
        resetDataPeople: (state) => {
            let newState = { ...state }
            newState.listOccupant = []
            // newState.addressHistoryData = []
            return newState
        },
        resetDataPet: (state) => {
            let newState = { ...state }
            newState.idPet = null
            newState.updated_date_HouseHole_pet = null
            newState.listNumberPetsInfo = [
                {
                    id: 1,
                    name: 'Dogs',
                    code: 'num_dog',
                    max_value: 4,
                    value: 0
                },
                {
                    id: 2,
                    name: 'Cats',
                    code: 'num_cat',
                    max_value: 4,
                    value: 0
                },
                {
                    id: 3,
                    name: 'Other pets',
                    code: 'num_other_pet',
                    max_value: 4,
                    value: 0
                },
            ]
            return newState
        },
    },
});
const { reducer } = houseHoldSlice
export const { setLoadingHouseHoldSlice, setLoadingHouseHoldPeople, setLoadingHouseHoldPet, resetData, setListNumberPetsInfo, setListOccupant,
    resetDataPet, resetDataPeople, setHouseHoldPeopleData, setHouseHoldPetData } = houseHoldSlice.actions
export default reducer