import { api } from "@/shared/lib/http-client";
import type { Role } from "@/types/user";

export const roleApi = {
  getPermissions: (roleId: string) => {
    return api.get(`/roles/${roleId}/permissions`);
  },

  updatePermissions: (roleId: string, permissionIds: string[]) => {
    return api.put(`/roles/${roleId}/permissions`, { permissionIds });
  },

  clone: (roleId: string, newName: string) => {
    return api.post(`/roles/${roleId}/clone`, { name: newName });
  },

  getUsersByRole: (
    roleId: string,
    params?: { page?: number; pageSize?: number }
  ) => {
    return api.get(`/roles/${roleId}/users`, { params });
  },
};
