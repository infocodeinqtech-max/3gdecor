import { ROLES, getDefaultPermissions } from "../data/permissions";

const USERS_KEY = "3gdeco-admin-users";
const SESSION_KEY = "3gdeco-admin-session";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: (typeof ROLES)[keyof typeof ROLES];
  permissions: string[];
  active: boolean;
  createdAt: string;
}

export type PublicAdminUser = AdminUser;

const DEFAULT_USERS: AdminUser[] = [
  {
    id: "super-1",
    email: "super@3gdeco.com",
    name: "Super Admin",
    phone: "+91 98300 00001",
    role: ROLES.SUPERADMIN,
    permissions: ["*"],
    active: true,
    createdAt: "2024-01-01",
  },
  {
    id: "admin-1",
    email: "admin@3gdeco.com",
    name: "Site Admin",
    phone: "+91 98300 12345",
    role: ROLES.ADMIN,
    permissions: ["dashboard", "projects", "testimonials", "enquiries"],
    active: true,
    createdAt: "2024-06-15",
  },
];

function readUsers(): AdminUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw) as AdminUser[];
  } catch {
    /* ignore */
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  return [...DEFAULT_USERS];
}

function writeUsers(users: AdminUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function ensureDefaultUsers(): void {
  if (!localStorage.getItem(USERS_KEY)) {
    writeUsers(DEFAULT_USERS);
  }
}

export function getAdminUsers(): AdminUser[] {
  return readUsers();
}

export function findUserById(id: string): AdminUser | undefined {
  return readUsers().find((u) => u.id === id);
}

export function findUserByRole(
  role: (typeof ROLES)[keyof typeof ROLES],
): AdminUser | undefined {
  return readUsers().find((u) => u.role === role && u.active);
}

export function upsertAdminUser(
  user: Partial<AdminUser> & { id: string },
): AdminUser[] {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === user.id);

  if (idx >= 0) {
    users[idx] = { ...users[idx], ...user } as AdminUser;
  } else {
    users.push({
      ...user,
      id: user.id || `admin-${Date.now()}`,
      createdAt: user.createdAt || new Date().toISOString().slice(0, 10),
      active: user.active !== false,
      role: user.role || ROLES.ADMIN,
      permissions: user.permissions?.length
        ? user.permissions
        : getDefaultPermissions(),
    } as AdminUser);
  }

  writeUsers(users);
  return users;
}

export function deleteAdminUser(userId: string) {
  writeUsers(readUsers().filter((u) => u.id !== userId));
}

export function setSession(userId: string, token: string) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId, token }));
}

export function getSession(): { userId: string; token: string } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function toPublicUser(user: AdminUser | undefined): PublicAdminUser | null {
  return user ?? null;
}
