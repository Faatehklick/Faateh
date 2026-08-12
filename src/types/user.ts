export type Role = "USER" | "HOST" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

/** Payload accepted by POST /api/auth/register */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

/** Payload accepted by POST /api/auth/login */
export interface LoginPayload {
  email: string;
  password: string;
}

/** Shape returned by /api/auth/login and /api/auth/register */
export interface AuthResponse {
  token: string;
  user: User;
}
