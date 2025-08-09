export interface Booking {
  id: string;
  userId: string;
  classId: string;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
}
