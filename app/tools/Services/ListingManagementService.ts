import { homefyInstance, homefyInstanceForm, homefyInstanceGet, homefyInstancePut, homefyInstanceDelete  } from './configAxios'

export const Service = {
    getListingsApi,//sẽ xóa
    getListingApi,//sẽ xóa
    insertListingApi,
    updateListingApi,
    uploadFileApi,
    deleteListingApi
}
export const servicePattern = {
    getListings: '',//sẽ xóa
    getListing:'room',//sẽ xóa
    insertListing:'room/insert',
    upLoadFile:'room/images/upload',
    updateListing:'room/update',
    deleteListing:'room/delete',
    getListingDetail:"room/detail",
    getFurnitures:"room/furniture/all"
    
}

function getListingsApi() { //sẽ xóa
    return homefyInstanceGet.get(`${servicePattern.getListings}`)
}
function getListingApi(data:any) {//sẽ xóa
    return homefyInstance.get(`${servicePattern.getListing}/${data}`)
}

function uploadFileApi(data:any) {
    return homefyInstanceForm.post(servicePattern.upLoadFile, data);
}
function insertListingApi(data:any) {
    return homefyInstance.post(servicePattern.insertListing, data);
}
function updateListingApi(payload:any) {
    const {id, data} = payload
    return homefyInstancePut.put(`${servicePattern.updateListing}`, data);
}
function deleteListingApi(data:any) {
    return homefyInstanceDelete.delete(`${servicePattern.deleteListing}/${data}`);
}