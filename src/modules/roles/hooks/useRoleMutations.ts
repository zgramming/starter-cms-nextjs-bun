import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roleService } from "../services/role.service";
import type { Role } from "@/types/user";
import type { ApiError } from "@/types/api";
import { notifications } from "@mantine/notifications";

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Role>) => roleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
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

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Role> }) =>
      roleService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
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

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
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

export function useBulkDeleteRoles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => roleService.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      notifications.show({
        title: "Success",
        message: "Roles deleted successfully",
        color: "green",
      });
    },
    onError: (error: ApiError) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to delete roles",
        color: "red",
      });
    },
  });
}
