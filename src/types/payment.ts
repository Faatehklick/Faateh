/** Prisma enum: PaymentMethod */
export type PaymentMethod = "EVC_PLUS" | "ZAAD" | "SAHAL";

/** Prisma enum: PaymentStatus */
export type PaymentStatus =
  | "PENDING"
  | "PARTIALLY_PAID"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

/**
 * A mobile-money account a host has registered so guests know where to send
 * the deposit. Returned inside `hotelPaymentAccounts`.
 */
export interface PaymentAccount {
  id: string;
  hotelId?: string;
  method: PaymentMethod;
  accountNumber: string;
  accountName?: string | null;
}

/** An uploaded receipt image (max 2 per deposit). */
export interface PaymentReceipt {
  id: string;
  paymentId?: string;
  imageUrl: string;
  createdAt?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  senderNumber: string;
  transactionReference: string;
  receipts?: PaymentReceipt[];
  createdAt?: string;
}

/** Body for POST /api/payments/deposit (sent as multipart/form-data). */
export interface DepositPayload {
  bookingId: string;
  method: PaymentMethod;
  senderNumber: string;
  transactionReference: string;
  /** Up to 2 receipt images. */
  receipts: File[];
}

/** Response of GET /api/bookings/:id/payment */
export interface BookingPaymentInfo {
  bookingId: string;
  depositAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  hotelPaymentAccounts: PaymentAccount[];
  paymentMethods: PaymentMethod[];
  payment?: Payment | null;
}
