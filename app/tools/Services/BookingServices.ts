import { homefyInstance } from './configAxios'

export const Service = {
    reservations,
    checkRoomInventory,
    getBooking,
}
export const servicePattern = {
    booking: 'booking/reservations',
    checkRoomInventory:'room/room_inventory',
    getBooking: 'booking/get_booking',
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
