import type { RoomDetail } from './RoomTypes';

export interface BookingData {
  roomId: string;
  code: string;
  names: string;
  checkIn: string;
  checkOut: string;
  numGuest: number;
  totalPrice: number;
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
}

export interface BookingHistoryItem {
  bookingId: string;
  bookingCode: string;
  roomId: string;
  roomName: string;
  address: string;
  numGuest: number;
  checkin: string;
  checkout: string;
  numNight: number;
  totalPrice: number;
  imgUrl?: string;
}

export interface BookingDetail {
  bookingId: string | number;
  bookingCode: string;
  email: string;
  name: string;
  checkIn: string;
  checkOut: string;
  description?: string;
  phone?: string;
  errorReasonCode?: string | number | null;
  isDeleted?: boolean;
  numGuest: number;
  paymentMethod?: string;
  payment_method?: string | null;
  status?: string;
  roomId: string;
  totalPrice: number;
}

export interface BookingDetailResult {
  booking: BookingDetail;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthdate: string;
    address: string;
    gender: string;
    createdDate: string;
  } | null;
  room: Omit<RoomDetail, 'date_available' | 'bathroom_type' | 'status'> & {
    bathroom_type: string | null;
    status: string;
  };
}

export interface BookingDetailResponse {
  code: number;
  message: string;
  result: BookingDetailResult | null;
}
