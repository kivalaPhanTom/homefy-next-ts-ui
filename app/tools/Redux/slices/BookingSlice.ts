import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookingDetail } from '@/tools/common/types/BookingType'

interface BookingState {
    bookingDetail: BookingDetail | null
}

const initialState: BookingState = {
    bookingDetail: null,
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
    },
})

export const { setBookingDetail, clearBookingDetail } = bookingSlice.actions
export default bookingSlice.reducer