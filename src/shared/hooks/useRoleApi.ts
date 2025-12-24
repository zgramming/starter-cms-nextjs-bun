import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roleService } from "@/modules/roles/services/role.service";
import type { Role } from "@/types/user";
import type { PaginatedResponse, ApiError } from "@/types/api";
import { notifications } from "@mantine/notifications";
import { queryKeys } from "./queryKeys";

export function useRoles(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  [key: string]: unknown;
}) {
  return useQuery<PaginatedResponse<Role>, ApiError>({
    queryKey: queryKeys.roles.list(params),
    queryFn: async () => {
      const response = await roleService.getAll(params);
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useRole(id: string) {
  return useQuery({
    queryKey: queryKeys.roles.detail(id),
    queryFn: async () => {
      const response = await roleService.getById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Role>) => roleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.lists() });
      notifications.show({
        title: "Success",
        message: "Role created successfully",
        color: "green",
      });
    },
    onError: (error: ApiError) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to create role",
        color: "red",
      });
    },
  });
}

// Update role mutation
export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Role> }) =>
      roleService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.lists() });
      notifications.show({
        title: "Success",
        message: "Role updated successfully",
        color: "green",
      });
    },
    onError: (error: ApiError) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to update role",
        color: "red",
      });
    },
  });
}

// Delete role mutation
export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.lists() });
      notifications.show({
        title: "Success",
        message: "Role deleted successfully",
        color: "green",
      });
    },
    onError: (error: ApiError) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to delete role",
        color: "red",
      });
    },
  });
}
