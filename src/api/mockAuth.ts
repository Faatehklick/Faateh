import type { AuthResponse, LoginPayload, RegisterPayload, User } from "../types/user";

const USERS_KEY = "mock_users";
const DELAY_MS = 400;

interface StoredUser extends User {
  password: string;
}

const DEFAULT_ADMIN: StoredUser = {
  id: "adminuser",
  name: "System Admin",
  email: "admin@faateh.com",
  phone: null,
  role: "ADMIN",
  password: "admin123",
  createdAt: new Date().toISOString(),
};

const delay = () => new Promise((resolve) => setTimeout(resolve, DELAY_MS));

const readUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      const initial = [DEFAULT_ADMIN];
      localStorage.setItem(USERS_KEY, JSON.stringify(initial));
      return initial;
    }
    const users = JSON.parse(raw) as StoredUser[];
    if (!users.some((u) => u.email.toLowerCase() === DEFAULT_ADMIN.email.toLowerCase())) {
      users.unshift(DEFAULT_ADMIN);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    return users;
  } catch {
    return [DEFAULT_ADMIN];
  }
};

const writeUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const fakeToken = (userId: string) => `mock-token-${userId}-${Date.now()}`;

const userIdFromToken = (token: string | null): string | null => {
  if (!token?.startsWith("mock-token-")) return null;
  const content = token.replace("mock-token-", "");
  const lastHyphenIndex = content.lastIndexOf("-");
  if (lastHyphenIndex === -1) return null;
  return content.substring(0, lastHyphenIndex);
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
      id: crypto.randomUUID().replace(/-/g, ""),
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
    
    // Hubinta gaarka ah ee Admin-ka default-ka ah
    if (payload.email.toLowerCase() === DEFAULT_ADMIN.email.toLowerCase() && payload.password === DEFAULT_ADMIN.password) {
      return { token: fakeToken(DEFAULT_ADMIN.id), user: toPublicUser(DEFAULT_ADMIN) };
    }

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
    
    if (userId === DEFAULT_ADMIN.id) {
      return toPublicUser(DEFAULT_ADMIN);
    }

    const users = readUsers();
    const found = users.find((u) => u.id === userId);

    if (!found) {
      throw { response: { status: 401, data: { message: "Session expired." } } };
    }

    return toPublicUser(found);
  },
};