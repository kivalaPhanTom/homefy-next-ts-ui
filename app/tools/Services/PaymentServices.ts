import { homefyInstance } from './configAxios'

export const Service = {
    payment
}
export const servicePattern = {
    payment: 'payment/process'
}

function payment(data) {
    return homefyInstance.post(servicePattern.payment, data)
}