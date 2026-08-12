import type { AuthResponse, LoginPayload, RegisterPayload, User } from "../types/user";

/**
 * Fake backend for local development when no real API is running.
 * Persists to localStorage so a page refresh doesn't wipe registered users.
 * Remove this file (and the branch in auth.api.ts) once a real backend exists.
 */

const USERS_KEY = "mock_users";
const DELAY_MS = 400; // fake network latency so loading states are visible

interface StoredUser extends User {
  password: string;
}

const delay = () => new Promise((resolve) => setTimeout(resolve, DELAY_MS));

const readUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const fakeToken = (userId: string) => `mock-token-${userId}-${Date.now()}`;

/** Extracts the fake user id embedded in a mock token. */
const userIdFromToken = (token: string | null): string | null => {
  if (!token?.startsWith("mock-token-")) return null;
  const parts = token.split("-");
  return parts[2] ?? null;
};

const toPublicUser = (stored: StoredUser): User => {
  const { password: _password, ...publicUser } = stored;
  return publicUser;
};

export const mockAuthApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    await delay();
    const users = readUsers();

    if (users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())) {
      throw { response: { data: { message: "An account with this email already exists." } } };
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? null,
      role: "USER",
      password: payload.password,
      createdAt: new Date().toISOString(),
    };

    writeUsers([...users, newUser]);

    return { token: fakeToken(newUser.id), user: toPublicUser(newUser) };
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    await delay();
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === payload.email.toLowerCase() && u.password === payload.password,
    );

    if (!found) {
      throw { response: { data: { message: "Invalid email or password." } } };
    }

    return { token: fakeToken(found.id), user: toPublicUser(found) };
  },

  me: async (): Promise<User> => {
    await delay();
    const token = localStorage.getItem("faateh_token");
    const userId = userIdFromToken(token);
    const users = readUsers();
    const found = users.find((u) => u.id === userId);

    if (!found) {
      throw { response: { status: 401, data: { message: "Session expired." } } };
    }

    return toPublicUser(found);
  },
};