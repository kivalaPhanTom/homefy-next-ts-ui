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