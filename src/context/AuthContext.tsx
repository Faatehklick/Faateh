import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { authApi } from "../api/auth.api";
import { clearToken, getToken, onUnauthorized, setToken } from "../api/client";
import { AuthContext, type AuthContextValue } from "./auth-context";
import type { RegisterPayload, Role, User } from "../types/user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // Start in a loading state only if there is a token worth verifying.
  const [isLoading, setIsLoading] = useState(() => Boolean(getToken()));

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  /** Restore the session on boot: the token is the only thing we persist. */
  useEffect(() => {
    if (!getToken()) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    authApi
      .me()
      .then((me) => {
        if (!cancelled) setUser(me);
      })
      .catch(() => {
        // Expired or invalid token — drop it rather than leaving a half session.
        if (!cancelled) {
          clearToken();
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /** A 401 from any request means the session is gone. */
  useEffect(() => onUnauthorized(() => setUser(null)), []);

  const login = useCallback(
    async (email: string, password: string): Promise<User> => {
      const { token, user: loggedIn } = await authApi.login({
        email,
        password,
      });
      setToken(token);
      setUser(loggedIn);
      return loggedIn;
    },
    [],
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<User | null> => {
      const result = await authApi.register(payload);

      // Some backends return a token on register (auto login), some don't.
      if (result?.token) {
        setToken(result.token);
        setUser(result.user);
        return result.user;
      }
      return null;
    },
    [],
  );

  const refreshUser = useCallback(async (): Promise<User | null> => {
    if (!getToken()) return null;
    try {
      const me = await authApi.me();
      setUser(me);
      return me;
    } catch {
      return null;
    }
  }, []);

  const hasRole = useCallback(
    (...roles: Role[]) => (user ? roles.includes(user.role) : false),
    [user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      isHost: user?.role === "HOST" || user?.role === "ADMIN",
      isAdmin: user?.role === "ADMIN",
      login,
      register,
      logout,
      refreshUser,
      hasRole,
    }),
    [user, isLoading, login, register, logout, refreshUser, hasRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
