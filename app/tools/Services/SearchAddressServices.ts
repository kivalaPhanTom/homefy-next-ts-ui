import { homefyInstanceGet } from './configAxios'

export const addressServices = {
    searchAddressApi
}
export const servicePattern = {
    searchAddress: 'room/location-suggestions',
}

function searchAddressApi(data) {
    return homefyInstanceGet.get(`${servicePattern.searchAddress}?query=${data}`);
}