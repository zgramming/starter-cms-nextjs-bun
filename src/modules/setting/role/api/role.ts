import { apiService } from "@/shared/lib/api-service";
import { createRestApiService } from "@/core/api/crud";
import type { Role } from "@/types/user";

// Extend base CRUD API with custom role-specific endpoints
export const roleApi = {
  // Spread all CRUD methods
  ...createRestApiService<Role>("roles"),

  // ===== Custom Role-Specific Methods =====

  // Get all permissions for a role
  getPermissions: (roleId: string) => {
    return apiService.get(`/roles/${roleId}/permissions`);
  },

  // Update role permissions
  updatePermissions: (roleId: string, permissionIds: string[]) => {
    return apiService.put(`/roles/${roleId}/permissions`, { permissionIds });
  },

  // Clone role with new name
  clone: (roleId: string, newName: string) => {
    return apiService.post(`/roles/${roleId}/clone`, { name: newName });
  },

  // Get users assigned to this role
  getUsersByRole: (
    roleId: string,
    params?: { page?: number; pageSize?: number }
  ) => {
    return apiService.get(`/roles/${roleId}/users`, { params });
  },
};
