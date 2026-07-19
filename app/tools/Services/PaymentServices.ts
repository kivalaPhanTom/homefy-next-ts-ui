import { homefyInstance } from './configAxios'

export const Service = {
    payment
}
export const servicePattern = {
    payment: 'payment/process'
}

function payment(data:any) {
    return homefyInstance.post(servicePattern.payment, data)
}