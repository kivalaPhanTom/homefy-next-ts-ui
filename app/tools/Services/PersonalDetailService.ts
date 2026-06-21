import { homefyInstanceForm, homefyInstanceGet } from './configAxios'

export const Service = {
    getPersonalDetailApi,
    updatePersonalDetailApi
}
export const servicePattern = {
    getPersonalDetail: 'user/personal',
    updatePersonalDetail:'user/personal/update',
}

function getPersonalDetailApi() {
    return homefyInstanceGet.get(`${servicePattern.getPersonalDetail}`)
}
function updatePersonalDetailApi(data) { 
    return homefyInstanceForm.post(servicePattern.updatePersonalDetail, data);
}