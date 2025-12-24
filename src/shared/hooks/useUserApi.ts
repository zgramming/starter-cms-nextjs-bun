import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { User } from "@/types/user";
import type { PaginatedResponse, ApiError } from "@/types/api";
import { notifications } from "@mantine/notifications";
import { queryKeys } from "./queryKeys";
import { userService } from "@/modules/users/services/user.service";

export function useUsers(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  [key: string]: unknown;
}) {
  return useQuery<PaginatedResponse<User>, ApiError>({
    queryKey: queryKeys.users.list(params),
    queryFn: async () => {
      const response = await userService.getAll(params);
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUser(id: string, options?: UseQueryOptions<User, ApiError>) {
  return useQuery<User, ApiError>({
    queryKey: queryKeys.users.detail(id),
    queryFn: async () => {
      const response = await userService.getById(id);
      return response.data.data;
    },
    enabled: !!id,
    ...options,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      notifications.show({
        title: "Success",
        message: "User created successfully",
        color: "green",
      });
    },
    onError: (error: ApiError) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to create user",
        color: "red",
      });
    },
  });
}

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      userService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(variables.id),
      });
      notifications.show({
        title: "Success",
        message: "User updated successfully",
        color: "green",
      });
    },
    onError: (error: ApiError) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to update user",
        color: "red",
      });
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      notifications.show({
        title: "Success",
        message: "User deleted successfully",
        color: "green",
      });
    },
    onError: (error: ApiError) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to delete user",
        color: "red",
      });
    },
  });
}

// Bulk delete users
export function useBulkDeleteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => userService.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      notifications.show({
        title: "Success",
        message: "Users deleted successfully",
        color: "green",
      });
    },
    onError: (error: ApiError) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to delete users",
        color: "red",
      });
    },
  });
}
