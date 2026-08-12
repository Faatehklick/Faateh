import { createContext } from "react";
import type { RegisterPayload, Role, User } from "../types/user";

export interface AuthContextValue {
  user: User | null;
  /** True while the initial `GET /auth/me` session check is in flight. */
  isLoading: boolean;
  isAuthenticated: boolean;
  isHost: boolean;
  isAdmin: boolean;

  login: (email: string, password: string) => Promise<User>;
  /** Resolves with the user if the API auto-issued a token, else null. */
  register: (payload: RegisterPayload) => Promise<User | null>;
  logout: () => void;
  /** Re-fetches `/auth/me`, e.g. after a role change to HOST. */
  refreshUser: () => Promise<User | null>;
  hasRole: (...roles: Role[]) => boolean;
}

/**
 * Kept in its own module (no component exports) so the provider file stays
 * Fast-Refresh friendly.
 */
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
