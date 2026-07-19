import { homefyInstance } from './configAxios'

export const Service = {
    reservations,
    checkRoomInventory,
   
}
export const servicePattern = {
    booking: 'booking/reservations',
    checkRoomInventory:'room/room_inventory',
}

function reservations(data:any) {
    return homefyInstance.post(servicePattern.booking, data)
}
function checkRoomInventory(data:any) {
    return homefyInstance.post(servicePattern.checkRoomInventory, data);
}
