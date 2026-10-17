import { homefyInstance, homefyInstanceForm, homefyInstancePut, homefyInstanceGet } from './configAxios'

export const Service = {
    createUserApi,
    loginApi,
    getRefeshTokenApi,
    userLikeApi,
    userRemoveLikeApi,
    logoutApi,
    authorizationApi,
    forgotPasswordApi,
    updateUserProfileApi,
    getUserProfileApi,
    changePasswordApi
}
const servicePattern = {
    createUser: 'users/create',
    login:'users/token',
    getRefeshToken:'users/refresh_token',
    userLike:'room/favorite/add',
    userRemoveLike:'room/favorite/remove',
    logout:'users/revoke_token',
    authorization:'',
    forgotPassword:'',
    updateUserProfile:'users/profile/me/update',
    getUserProfile:'users/profile/me',
    changePassword:'users/change_password'
}

function createUserApi(data:any) {
    return homefyInstance.post(servicePattern.createUser, data);
}
function loginApi(data:any) {
    return homefyInstance.post(servicePattern.login, data);
}
function getRefeshTokenApi(data:any) {
    return homefyInstance.post(servicePattern.getRefeshToken, data);
}
function userLikeApi(data:any) {
    return homefyInstance.post(servicePattern.userLike, data);
}
function userRemoveLikeApi(data:any) {
    return homefyInstance.post(servicePattern.userRemoveLike, data);
}
function logoutApi(data:any) {
    return homefyInstance.post(servicePattern.logout, data);
}
function authorizationApi(data:any) {
    return homefyInstance.post(servicePattern.authorization, data);
}
function forgotPasswordApi(data:any) {
    return homefyInstance.post(servicePattern.forgotPassword, data);
}
function updateUserProfileApi(data:any) {
    return homefyInstancePut.put(servicePattern.updateUserProfile, data);
}
function getUserProfileApi() {
    return homefyInstanceGet.get(servicePattern.getUserProfile);
}
function changePasswordApi(data:any) {
    return homefyInstancePut.put(servicePattern.changePassword, data);
}
