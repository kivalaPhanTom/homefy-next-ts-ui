import { homefyInstanceGet, homefyInstanceForm } from './configAxios'

export const Service = {
    getEmergencyContactApi,
    updateEmergencyContactApi
}
export const servicePattern = {
    getEmergencyContact: 'user/emergency',
    updateEmergencyContact:'user/emergency/update',
}

function getEmergencyContactApi() {
    return homefyInstanceGet.get(`${servicePattern.getEmergencyContact}`)
}
function updateEmergencyContactApi(data) {
    return homefyInstanceForm.post(servicePattern.updateEmergencyContact, data);
}