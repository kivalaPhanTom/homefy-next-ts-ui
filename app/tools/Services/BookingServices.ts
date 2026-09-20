import { homefyInstance } from './configAxios'

export const Service = {
    reservations,
    checkRoomInventory,
    getBooking,
    getBookingHistory,
}
export const servicePattern = {
    booking: 'booking/reservations',
    checkRoomInventory:'room/room_inventory',
    getBooking: 'booking/get_booking',
    bookingHistory: 'booking/history',
}

function reservations(data:any) {
    return homefyInstance.post(servicePattern.booking, data)
}
function checkRoomInventory(data:any) {
    return homefyInstance.post(servicePattern.checkRoomInventory, data);
}
function getBooking(bookingId: string) {
    return homefyInstance.get(`${servicePattern.getBooking}/${bookingId}`)
}
function getBookingHistory(data:any) {
    return homefyInstance.post(servicePattern.bookingHistory, data)
}
