import { api } from "@/shared/lib/http-client";
import type { User } from "@/types/user";
import type { LoginRequest, LoginResponse } from "@/types/api";

export const authApi = {
  login: (data: LoginRequest) => {
    return api.post<LoginResponse>("/auth/login", data);
  },

  logout: () => {
    return api.post("/auth/logout");
  },

  refreshToken: (refreshToken: string) => {
    return api.post<{ token: string }>("/auth/refresh", {
      refreshToken,
    });
  },

  getProfile: () => {
    return api.get<User>("/auth/profile");
  },

  updateProfile: (data: Partial<User>) => {
    return api.put<User>("/auth/profile", data);
  },

  changePassword: (data: { oldPassword: string; newPassword: string }) => {
    return api.post("/auth/change-password", data);
  },
};

export type { User };
