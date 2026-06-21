import { homefyInstance, homefyInstanceForm } from './configAxios'

export const Service = {
    getEmploymentApi,
    updateEmploymentApi
}
export const servicePattern = {
    getEmployment: 'user/employment',
    updateEmployment:'user/employment/update',
}

function getEmploymentApi() {
    return homefyInstance.get(servicePattern.getEmployment)
}
function updateEmploymentApi(data) {
    return homefyInstanceForm.post(servicePattern.updateEmployment, data)
}