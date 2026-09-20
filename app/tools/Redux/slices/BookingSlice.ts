import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookingDetail, BookingHistoryItem } from '@/tools/common/types/BookingType'

interface BookingState {
    bookingDetail: BookingDetail | null
    bookingHistory: Record<string, BookingHistoryItem[]>
}

const initialState: BookingState = {
    bookingDetail: null,
    bookingHistory: {},
}

const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,
    reducers: {
        setBookingDetail: (state, action: PayloadAction<BookingDetail>) => {
            state.bookingDetail = action.payload
        },
        clearBookingDetail: (state) => {
            state.bookingDetail = null
        },
        setBookingHistory: (state, action: PayloadAction<{ status: string; data: BookingHistoryItem[] }>) => {
            state.bookingHistory[action.payload.status] = action.payload.data
        },
        clearBookingHistory: (state) => {
            state.bookingHistory = {}
        },
    },
})

export const { setBookingDetail, clearBookingDetail, setBookingHistory, clearBookingHistory } = bookingSlice.actions
export default bookingSlice.reducer