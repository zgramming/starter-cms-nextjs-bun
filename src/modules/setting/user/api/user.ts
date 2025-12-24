import { api } from "@/shared/lib/http-client";
import type { User } from "@/types/user";

export const userApi = {
  changePassword: (
    userId: string,
    data: { oldPassword: string; newPassword: string }
  ) => {
    return api.post(`/users/${userId}/change-password`, data);
  },

  resetPassword: (email: string) => {
    return api.post("/users/reset-password", { email });
  },

  bulkActivate: (userIds: string[]) => {
    return api.post("/users/bulk-activate", { ids: userIds });
  },

  bulkDeactivate: (userIds: string[]) => {
    return api.post("/users/bulk-deactivate", { ids: userIds });
  },

  assignRole: (userId: string, roleId: string) => {
    return api.post(`/users/${userId}/assign-role`, { roleId });
  },

  getActivityLogs: (
    userId: string,
    params?: { page?: number; pageSize?: number }
  ) => {
    return api.get(`/users/${userId}/activity-logs`, { params });
  },

  updateAvatar: (userId: string, file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return api.upload(`/users/${userId}/avatar`, formData);
  },
};
