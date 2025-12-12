import { create } from "zustand";
import { persist } from "zustand/middleware";
import { env } from "@/config/env";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, token: string, refreshToken?: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, token, refreshToken) => {
        localStorage.setItem(env.tokenKey, token);
        if (refreshToken) {
          localStorage.setItem(env.refreshTokenKey, refreshToken);
        }

        set({
          user,
          token,
          refreshToken: refreshToken || null,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem(env.tokenKey);
        localStorage.removeItem(env.refreshTokenKey);

        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
