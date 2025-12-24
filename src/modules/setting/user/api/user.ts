import { apiService } from "@/shared/lib/api-service";
import type { User } from "@/types/user";

// Extend base CRUD API with custom user-specific endpoints
export const userApi = {
  // Spread all CRUD methods (getAll, getById, create, update, delete, bulkDelete, export, import)
  ...createRestApiService<User>("users"),

  // ===== Custom User-Specific Methods =====

  // Change user password
  changePassword: (
    userId: string,
    data: { oldPassword: string; newPassword: string }
  ) => {
    return apiService.post(`/users/${userId}/change-password`, data);
  },

  // Reset password via email
  resetPassword: (email: string) => {
    return apiService.post("/users/reset-password", { email });
  },

  // Bulk activate users
  bulkActivate: (userIds: string[]) => {
    return apiService.post("/users/bulk-activate", { ids: userIds });
  },

  // Bulk deactivate users
  bulkDeactivate: (userIds: string[]) => {
    return apiService.post("/users/bulk-deactivate", { ids: userIds });
  },

  // Assign role to user
  assignRole: (userId: string, roleId: string) => {
    return apiService.post(`/users/${userId}/assign-role`, { roleId });
  },

  // Get user activity logs
  getActivityLogs: (
    userId: string,
    params?: { page?: number; pageSize?: number }
  ) => {
    return apiService.get(`/users/${userId}/activity-logs`, { params });
  },

  // Update user avatar
  updateAvatar: (userId: string, file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return apiService.upload(`/users/${userId}/avatar`, formData);
  },
};
