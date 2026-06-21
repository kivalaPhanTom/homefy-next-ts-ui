import { homefyInstance, homefyInstanceForm, homefyInstanceGet } from './configAxios'

export const Service = {
    getAboutmeApi,
    updateAboutmeApi,
    updateAboutmeDocApi
}
export const servicePattern = {
    getAboutme: 'user/aboutme',
    updateAboutme:'user/aboutme/update',
    updateAboutmeDoc:'user/aboutme/upload', 
}

function getAboutmeApi() {
    return homefyInstanceGet.get(`${servicePattern.getAboutme}`)
}
function updateAboutmeApi(data) {
    return homefyInstance.post(servicePattern.updateAboutme, data);
}
function updateAboutmeDocApi(data) {
    return homefyInstanceForm.post(servicePattern.updateAboutmeDoc, data);
}