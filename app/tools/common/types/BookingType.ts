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
  status?: string;
  roomId: string;
  totalPrice: number;
}