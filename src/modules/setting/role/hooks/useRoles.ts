import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roleApi } from "../api/role";
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
      const response = await roleApi.getAll(params);
      return response.data.data;
    },
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (role: Omit<Role, "id">) => {
      const response = await roleApi.create(role);
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
      const response = await roleApi.update(role.id, role);
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
      await roleApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
