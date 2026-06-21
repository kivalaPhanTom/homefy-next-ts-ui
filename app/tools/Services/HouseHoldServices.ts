import { homefyInstance, homefyInstanceGet } from './configAxios'

export const Service = {
    getHouseHoldPeopleApi,
    getHouseHoldPetApi,
    updateHouseHoldPeopleApi,
    updateHouseHoldPetApi
}
export const servicePattern = {
    getHouseHoldPeople:'user/household/people',
    getHouseHoldPet:'user/household/pet',
    updateHouseHoldPeople:'user/household/people/update',
    updateHouseHoldPet:'user/household/pet/update'
}


function getHouseHoldPeopleApi() {
    return homefyInstanceGet.get(servicePattern.getHouseHoldPeople)
}
function getHouseHoldPetApi() {
    return homefyInstanceGet.get(servicePattern.getHouseHoldPet)
}
function updateHouseHoldPeopleApi(data) {
    return homefyInstance.post(servicePattern.updateHouseHoldPeople, data)
}
function updateHouseHoldPetApi(data) {
    return homefyInstance.post(servicePattern.updateHouseHoldPet, data)
}