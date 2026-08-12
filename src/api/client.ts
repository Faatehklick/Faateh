import axios, { AxiosError } from "axios";

export const TOKEN_KEY = "faateh_token";

export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/** Attach the JWT to every outgoing request. */
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Listeners notified when the API rejects our token, so AuthContext can drop
 * the session without this module importing React.
 */
type UnauthorizedHandler = () => void;
const unauthorizedHandlers = new Set<UnauthorizedHandler>();

/** Returns an unsubscribe function safe to use as a `useEffect` cleanup. */
export const onUnauthorized = (handler: UnauthorizedHandler): (() => void) => {
  unauthorizedHandlers.add(handler);
  return () => {
    unauthorizedHandlers.delete(handler);
  };
};

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Only treat 401 as a dead session. A 403 means "logged in but not allowed",
    // which should surface as an error rather than log the person out.
    if (error.response?.status === 401) {
      clearToken();
      unauthorizedHandlers.forEach((handler) => handler());
    }
    return Promise.reject(error);
  },
);

/** Pulls a readable message out of an axios error for toasts. */
export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Cannot reach the server. Check that the backend is running.";
    }

    const data = error.response.data as
      | { message?: string; error?: string; errors?: { msg?: string }[] }
      | undefined;

    // express-validator returns { errors: [{ msg }] }
    const validationMessage = data?.errors?.[0]?.msg;
    return data?.message ?? data?.error ?? validationMessage ?? fallback;
  }

  if (error instanceof Error) return error.message;
  return fallback;
};

/**
 * The backend sometimes returns a bare array and sometimes wraps it as
 * `{ data: [...] }`. This normalises both.
 */
export const unwrapList = <T>(payload: unknown): T[] => {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    for (const key of ["data", "items", "results"]) {
      if (Array.isArray(record[key])) return record[key] as T[];
    }
  }
  return [];
};

/** Same idea for single objects wrapped as `{ data: {...} }`. */
export const unwrapOne = <T>(payload: unknown): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    const inner = (payload as { data: unknown }).data;
    if (inner && typeof inner === "object") return inner as T;
  }
  return payload as T;
};

/** Builds multipart/form-data, flattening arrays and skipping empty values. */
export const toFormData = (
  fields: Record<string, unknown>,
  fileFields: Record<string, File[] | File | null | undefined> = {},
): FormData => {
  const form = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      // Arrays of primitives (amenities, roomTypes) go as JSON so the
      // backend receives a real array rather than "a,b,c".
      form.append(key, JSON.stringify(value));
    } else if (typeof value === "boolean") {
      form.append(key, value ? "true" : "false");
    } else {
      form.append(key, String(value));
    }
  }

  for (const [key, files] of Object.entries(fileFields)) {
    if (!files) continue;
    if (Array.isArray(files)) {
      files.forEach((file) => form.append(key, file));
    } else {
      form.append(key, files);
    }
  }

  return form;
};
