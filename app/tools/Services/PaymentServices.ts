import { homefyInstance } from './configAxios'

export const Service = {
    payment,
    paymentStatus
}
export const servicePattern = {
    payment: 'payment/process',
    paymentStatus: 'payment/status'
}

function payment(data:any) {
    return homefyInstance.post(servicePattern.payment, data)
}

type PaymentStatusData = {
    bookingId: string
    paymentStatus: string
}

function paymentStatus(data: PaymentStatusData) {
    return homefyInstance.post(servicePattern.paymentStatus, data)
}