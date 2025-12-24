import { useQuery } from "@tanstack/react-query";
import { roleService } from "../services/role.service";
import type { Role } from "@/types/user";
import type { PaginatedResponse, ApiError } from "@/types/api";

interface UseRolesParams extends Record<string, unknown> {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}

export function useRoles(params: UseRolesParams = {}) {
  return useQuery<PaginatedResponse<Role>, ApiError>({
    queryKey: ["roles", params],
    queryFn: async () => {
      const response = await roleService.getAll(params);
      return response.data.data;
    },
  });
}

export function useRole(id: string) {
  return useQuery<Role, ApiError>({
    queryKey: ["roles", id],
    queryFn: async () => {
      const response = await roleService.getById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
}

export * from "./useRoleMutations";
