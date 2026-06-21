import { homefyInstance, homefyInstanceForm } from './configAxios'

export const Service = {
    createUserApi,
    loginApi,
    getRefeshTokenApi,
    userLikeApi,
    userRemoveLikeApi,
    logoutApi,
    authorizationApi,
    forgotPasswordApi
}
const servicePattern = {
    createUser: 'users/create',
    login:'users/token',
    getRefeshToken:'users/refresh_token',
    userLike:'room/favorite/add',
    userRemoveLike:'room/favorite/remove',
    logout:'users/revoke_token',
    authorization:'',
    forgotPassword:''
}

function createUserApi(data) {
    return homefyInstance.post(servicePattern.createUser, data);
}
function loginApi(data) {
    return homefyInstance.post(servicePattern.login, data);
}
function getRefeshTokenApi(data) {
    return homefyInstance.post(servicePattern.getRefeshToken, data);
}
function userLikeApi(data) {
    return homefyInstance.post(servicePattern.userLike, data);
}
function userRemoveLikeApi(data) {
    return homefyInstance.post(servicePattern.userRemoveLike, data);
}
function logoutApi(data) {
    return homefyInstance.post(servicePattern.logout, data);
}
function authorizationApi(data) {
    return homefyInstance.post(servicePattern.authorization, data);
}
function forgotPasswordApi(data) {
    return homefyInstance.post(servicePattern.forgotPassword, data);
}