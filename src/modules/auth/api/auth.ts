import { apiService } from "@/shared/lib/api-service";
import type { User } from "@/types/user";
import type { LoginRequest, LoginResponse, RegisterRequest } from "@/types/api";

export const authApi = {
  login: (data: LoginRequest) => {
    return apiService.post<LoginResponse>("/auth/login", data);
  },

  register: (data: RegisterRequest) => {
    return apiService.post<LoginResponse>("/auth/register", data);
  },

  logout: () => {
    return apiService.post("/auth/logout");
  },

  refreshToken: (refreshToken: string) => {
    return apiService.post<{ token: string }>("/auth/refresh", {
      refreshToken,
    });
  },

  getProfile: () => {
    return apiService.get<User>("/auth/profile");
  },

  updateProfile: (data: Partial<User>) => {
    return apiService.put<User>("/auth/profile", data);
  },

  changePassword: (data: { oldPassword: string; newPassword: string }) => {
    return apiService.post("/auth/change-password", data);
  },
};

export type { User };
