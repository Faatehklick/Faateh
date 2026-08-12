import { api, unwrapOne } from "./client";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "../types/user";
import { mockAuthApi } from "./mockAuth"; // Hubi in jidkani sax yahay

const USE_MOCK = import.meta.env.VITE_MOCK_API === "true";

export const authApi = {
  /** POST /api/auth/register */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    if (USE_MOCK) return mockAuthApi.register(payload);
    const { data } = await api.post("/auth/register", payload);
    return unwrapOne<AuthResponse>(data);
  },

  /** POST /api/auth/login */
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    if (USE_MOCK) return mockAuthApi.login(payload);
    const { data } = await api.post("/auth/login", payload);
    return unwrapOne<AuthResponse>(data);
  },

  /** GET /api/auth/me */
  me: async (): Promise<User> => {
    if (USE_MOCK) return mockAuthApi.me();
    const { data } = await api.get("/auth/me");
    const unwrapped = unwrapOne<User & { user?: User }>(data);
    return unwrapped.user ?? unwrapped;
  },
};