import { homefyInstance } from './configAxios'
import type { BookingDetail, BookingDetailResponse } from '@/tools/common/types/BookingType'

export const Service = {
    reservations,
    checkRoomInventory,
    getBooking,
    getBookingHistory,
    getBookingDetail,
}
export const servicePattern = {
    booking: 'booking/reservations',
    checkRoomInventory:'room/room_inventory',
    getBooking: 'booking/get_booking',
    bookingHistory: 'booking/history',
    bookingDetail: 'booking/detail',
}

function reservations(data: unknown) {
    return homefyInstance.post(servicePattern.booking, data)
}
function checkRoomInventory(data: unknown) {
    return homefyInstance.post(servicePattern.checkRoomInventory, data);
}
function getBooking(bookingId: string, signal?: AbortSignal) {
    return homefyInstance.get<{ code: number; result: BookingDetail | null }>(
        `${servicePattern.getBooking}/${encodeURIComponent(bookingId)}`, { signal }
    )
}
function getBookingDetail(bookingCode: string, signal?: AbortSignal) {
    return homefyInstance.get<BookingDetailResponse>(
        `${servicePattern.bookingDetail}/${encodeURIComponent(bookingCode)}`, { signal }
    )
}
function getBookingHistory(data: unknown) {
    return homefyInstance.post(servicePattern.bookingHistory, data)
}
