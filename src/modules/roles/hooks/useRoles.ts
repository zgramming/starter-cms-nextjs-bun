import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roleService } from "../services/role.service";
import type { Role } from "@/types/user";

interface UseRolesParams extends Record<string, unknown> {
  page?: number;
  pageSize?: number;
  search?: string;
}

export function useRoles(params: UseRolesParams = {}) {
  return useQuery({
    queryKey: ["roles", params],
    queryFn: async () => {
      const response = await roleService.getAll(params);
      return response.data.data;
    },
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (role: Omit<Role, "id">) => {
      const response = await roleService.create(role);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (role: Role) => {
      const response = await roleService.update(role.id, role);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await roleService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
