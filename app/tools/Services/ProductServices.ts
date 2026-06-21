import { homefyInstance } from './configAxios'

export const Service = {
    getListProductApi,
    getDetailProductApi,
    getFavouriteProductsApi
}
export const servicePattern = {
    getListProduct: 'room/list',
    getDetailProduct:'room/detail',
    getFavouriteProducts:'user/favorite'
}

function getListProductApi(data) {
    let result = `${servicePattern.getListProduct}?`
    if (data.limit) {
        result = `${result}limit=${data.limit}&&`
    }
    if (data.offset) {
        result = `${result}offset=${data.offset}&&`
    }
    if (data.min_price) {
        result = `${result}min_price=${data.min_price}&&`
    }
    if (data.max_price) {
        result = `${result}max_price=${data.max_price}&&`
    }
    // if (data.num_bedroom) {
    //     result = `${result}price_min=${data.num_bedroom}&&`
    // }
    // if (data.num_bathroom) {
    //     result = `${result}price_min=${data.num_bathroom}&&`
    // }
    // if (data.car_space) {
    //     result = `${result}price_min=${data.car_space}&&`
    // }
    // if(data.lat){
    //     result = `${result}lat=${data.lat}&&` 
    // }
    // if(data.lon){
    //     result = `${result}lon=${data.lon}&&` 
    // }
    if(data.address){
        result = `${result}address=${data.address}&&` 
    }
    if(data.criteria){
        result = `${result}criteria=${data.criteria}&&` 
    }
    return homefyInstance.get(result)
}
function getDetailProductApi(data) {
    return  homefyInstance.get(`${servicePattern.getDetailProduct}/${data}`)
}
function getFavouriteProductsApi(data) {
    let result = `${servicePattern.getFavouriteProducts}?`
    if (data.limit) {
        result = `${result}limit=${data.limit}&&`
    }
    if (data.offset) {
        result = `${result}offset=${data.offset}&&`
    }
    return homefyInstance.get(result)
}