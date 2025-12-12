import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { userApi, roleApi } from "@/services/api";
import { User, Role } from "@/types";
import { PaginatedResponse, ApiError } from "@/lib/api-client";
import { notifications } from "@mantine/notifications";

// Query Keys
export const queryKeys = {
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.users.lists(), params] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  roles: {
    all: ["roles"] as const,
    lists: () => [...queryKeys.roles.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.roles.lists(), params] as const,
    details: () => [...queryKeys.roles.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.roles.details(), id] as const,
  },
  // Add more resources as needed
};

// ==================== USER HOOKS ====================

// Get all users with pagination
export function useUsers(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  return useQuery<PaginatedResponse<User>, ApiError>({
    queryKey: queryKeys.users.list(params),
    queryFn: async () => {
      const response = await userApi.getAll(params);
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single user by ID
export function useUser(id: string, options?: UseQueryOptions<User, ApiError>) {
  return useQuery<User, ApiError>({
    queryKey: queryKeys.users.detail(id),
    queryFn: async () => {
      const response = await userApi.getById(id);
      return response.data.data;
    },
    enabled: !!id,
    ...options,
  });
}

// Create user mutation
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => userApi.create(data),
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
      userApi.update(id, data),
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
    mutationFn: (id: string) => userApi.delete(id),
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
    mutationFn: (ids: string[]) => userApi.bulkDelete(ids),
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

// ==================== ROLE HOOKS ====================

export function useRoles(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  return useQuery<PaginatedResponse<Role>, ApiError>({
    queryKey: queryKeys.roles.list(params),
    queryFn: async () => {
      const response = await roleApi.getAll(params);
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useRole(id: string) {
  return useQuery({
    queryKey: queryKeys.roles.detail(id),
    queryFn: async () => {
      const response = await roleApi.getById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Role>) => roleApi.create(data),
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

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Role> }) =>
      roleApi.update(id, data),
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

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roleApi.delete(id),
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

// ==================== GENERIC HOOKS FACTORY ====================

// Factory function to create CRUD hooks for any resource
export function createCrudHooks<T>(
  resource: string,
  api: ReturnType<typeof import("@/services/api").createCrudApi<T>>
) {
  const keys = {
    all: [resource] as const,
    lists: () => [...keys.all, "list"] as const,
    list: (params?: Record<string, unknown>) =>
      [...keys.lists(), params] as const,
    details: () => [...keys.all, "detail"] as const,
    detail: (id: string) => [...keys.details(), id] as const,
  };

  return {
    useList: (params?: Record<string, unknown>) => {
      return useQuery({
        queryKey: keys.list(params),
        queryFn: async () => {
          const response = await api.getAll(params);
          return response.data.data;
        },
      });
    },

    useDetail: (id: string) => {
      return useQuery({
        queryKey: keys.detail(id),
        queryFn: async () => {
          const response = await api.getById(id);
          return response.data.data;
        },
        enabled: !!id,
      });
    },

    useCreate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (data: Partial<T>) => api.create(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: keys.lists() });
          notifications.show({
            title: "Success",
            message: `${resource} created successfully`,
            color: "green",
          });
        },
      });
    },

    useUpdate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<T> }) =>
          api.update(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: keys.lists() });
          notifications.show({
            title: "Success",
            message: `${resource} updated successfully`,
            color: "green",
          });
        },
      });
    },

    useDelete: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (id: string) => api.delete(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: keys.lists() });
          notifications.show({
            title: "Success",
            message: `${resource} deleted successfully`,
            color: "green",
          });
        },
      });
    },
  };
}
