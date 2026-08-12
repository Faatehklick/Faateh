import { api, toFormData, unwrapList, unwrapOne } from "./client";
import type {
  DepositPayload,
  Payment,
  PaymentAccount,
  PaymentMethod,
} from "../types/payment";

export const paymentsApi = {
  /** GET /api/payments/methods */
  methods: async (): Promise<PaymentMethod[]> => {
    const { data } = await api.get("/payments/methods");
    const list = unwrapList<PaymentMethod | { value?: PaymentMethod; method?: PaymentMethod }>(data);
    // Accepts either ["ZAAD", ...] or [{ value: "ZAAD" }, ...]
    return list.map((entry) =>
      typeof entry === "string"
        ? entry
        : ((entry.value ?? entry.method) as PaymentMethod),
    );
  },

  /**
   * POST /api/payments/deposit — multipart/form-data with up to 2 receipts.
   * On success the booking moves to PARTIALLY_PAID / IN_BOOKING.
   */
  deposit: async (payload: DepositPayload): Promise<Payment> => {
    const { receipts, ...fields } = payload;
    const form = toFormData(fields as Record<string, unknown>, {
      receipts: receipts.slice(0, 2),
    });

    const { data } = await api.post("/payments/deposit", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return unwrapOne<Payment>(data);
  },

  /** Host's registered mobile-money accounts for a hotel. */
  listAccounts: async (hotelId: string): Promise<PaymentAccount[]> => {
    const { data } = await api.get(`/hotels/${hotelId}/payment-accounts`);
    return unwrapList<PaymentAccount>(data);
  },

  addAccount: async (
    hotelId: string,
    payload: Omit<PaymentAccount, "id" | "hotelId">,
  ): Promise<PaymentAccount> => {
    const { data } = await api.post(
      `/hotels/${hotelId}/payment-accounts`,
      payload,
    );
    return unwrapOne<PaymentAccount>(data);
  },

  removeAccount: async (
    hotelId: string,
    accountId: string,
  ): Promise<void> => {
    await api.delete(`/hotels/${hotelId}/payment-accounts/${accountId}`);
  },
};
