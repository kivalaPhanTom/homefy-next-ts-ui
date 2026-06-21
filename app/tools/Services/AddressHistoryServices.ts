import { homefyInstance, homefyInstanceGet } from './configAxios'

export const Service = {
    getAddressHistoryApi,
    updateAddressHistoryApi
}
export const servicePattern = {
    getAddressHistory: 'user/address',
    updateAddressHistory:'user/address',
}

function getAddressHistoryApi() {
    return homefyInstanceGet.get(`${servicePattern.getAddressHistory}`)
}
function updateAddressHistoryApi(data) {
    return homefyInstance.post(servicePattern.updateAddressHistory, data);
}