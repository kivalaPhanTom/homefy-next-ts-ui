import { homefyInstanceForm, homefyInstanceGet, homefyInstance } from './configAxios'

export const Service = {
    getIncomeApi,
    updateIncomeApi,
    uploadFileIncomeApi
}
export const servicePattern = {
    getIncome: 'user/income',
    updateIncome:'user/income',
    uploadFile:'user/income/proof'
}

function getIncomeApi() {
    return homefyInstanceGet.get(`${servicePattern.getIncome}`)
}
function updateIncomeApi(data) {
    return homefyInstance.post(servicePattern.updateIncome, data);
}
function uploadFileIncomeApi(data) {
    return homefyInstanceForm.post(servicePattern.uploadFile, data);
}