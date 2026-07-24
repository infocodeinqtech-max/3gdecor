import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { ROLES } from "../admin/data/permissions";
import type { PublicAdminUser } from "../admin/utils/adminStorage";
import {
  apiRequest,
  clearToken,
  getToken,
  setToken,
} from "../api/client";

export type LoginRole = (typeof ROLES)[keyof typeof ROLES];

interface AuthContextValue {
  user: PublicAdminUser | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    role: LoginRole,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  hasPermission: (menuId: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

type MeResponse = { success: boolean; user: PublicAdminUser };
type LoginResponse = { success: boolean; token: string; user: PublicAdminUser };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicAdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const authEpochRef = useRef(0);

  const refreshUser = useCallback(async () => {
    const epoch = ++authEpochRef.current;
    const token = getToken();
    if (!token) {
      if (epoch === authEpochRef.current) setUser(null);
      return;
    }

    try {
      const res = await apiRequest<MeResponse>("/auth/me");
      if (epoch !== authEpochRef.current) return;
      setUser(res.user);
    } catch {
      // Only clear if this request is still the latest auth attempt
      // (avoids wiping a successful login when a stale /me fails).
      if (epoch !== authEpochRef.current) return;
      if (getToken() === token) {
        clearToken();
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      await refreshUser();
      setLoading(false);
    })();
  }, [refreshUser]);

  const login = async (
    email: string,
    password: string,
    role: LoginRole,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Invalidate any in-flight /auth/me from the login page mount
      authEpochRef.current += 1;
      const res = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        auth: false,
        body: { email, password, role },
      });

      if (!res?.token || !res?.user) {
        return {
          success: false,
          error:
            "Invalid login response from server. API routing may be misconfigured.",
        };
      }

      setToken(res.token);
      setUser(res.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Could not sign in",
      };
    }
  };

  const logout = useCallback(async () => {
    authEpochRef.current += 1;
    try {
      if (getToken()) {
        await apiRequest("/auth/logout", { method: "POST" });
      }
    } catch {
      /* ignore network errors on logout */
    } finally {
      clearToken();
      setUser(null);
    }
  }, []);

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      await apiRequest("/auth/change-password", {
        method: "POST",
        body: {
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: newPassword,
        },
      });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Could not change password",
      };
    }
  };

  const isSuperAdmin = user?.role === ROLES.SUPERADMIN;

  const hasPermission = useCallback(
    (menuId: string) => {
      if (!user) return false;
      if (menuId === "profile") return true;
      if (user.role === ROLES.SUPERADMIN) return true;
      if (user.permissions?.includes("*")) return true;
      return user.permissions?.includes(menuId) ?? false;
    },
    [user],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        changePassword,
        refreshUser,
        isAuthenticated: !!user,
        isSuperAdmin,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
