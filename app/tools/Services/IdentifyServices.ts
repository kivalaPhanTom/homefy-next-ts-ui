import { homefyInstance, homefyInstanceForm, homefyInstanceGet } from './configAxios'

export const Service = {
    getIdentifyApi,
    updateIdentifyApi,
    uploadImageApi
}
export const servicePattern = {
    getIdentify: 'user/identity',
    updateIdentify:'user/identity/update',
    uploadImage:'user/identity/img'
}

function getIdentifyApi() {
    return homefyInstanceGet.get(`${servicePattern.getIdentify}`)
}
function updateIdentifyApi(data) {
    return homefyInstance.post(servicePattern.updateIdentify, data);
}
function uploadImageApi(data) {
    return homefyInstanceForm.post(servicePattern.uploadImage, data);
}