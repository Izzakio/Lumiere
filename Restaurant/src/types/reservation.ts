export interface ReservationSubmission {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

export interface ReservationRecord extends ReservationSubmission {
  id: string;
  createdAt: string;
}
