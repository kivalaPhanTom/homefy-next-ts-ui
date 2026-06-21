import { homefyInstanceGet, homefyInstanceForm } from './configAxios'

export const Service = {
    createApplicationApi,
    getApplicationApi
}
const servicePattern = {
    createApplication: 'user/application/create',
    getApplication:'user/application',
}

function createApplicationApi(data) {
    return homefyInstanceForm.post(servicePattern.createApplication, data)
}
function getApplicationApi(data) {
    return homefyInstanceGet.get(`${servicePattern.getApplication}?limit=${data}`);
}