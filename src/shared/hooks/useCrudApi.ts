import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/types/api";
import { notifications } from "@mantine/notifications";
import { createQueryKeys } from "./queryKeys";

// Generic CRUD Hooks Factory
// Use this to quickly create hooks for any resource without duplicating code

export function createCrudHooks<T>(
  resource: string,
  api: ReturnType<typeof import("@/core/api/crud").createRestApiService<T>>
) {
  const keys = createQueryKeys(resource);

  return {
    // Get all items with optional params
    useList: (params?: Record<string, unknown>) => {
      return useQuery({
        queryKey: keys.list(params),
        queryFn: async () => {
          const response = await api.getAll(params);
          return response.data.data;
        },
      });
    },

    // Get single item by ID
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

    // Create new item
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
        onError: (error: ApiError) => {
          notifications.show({
            title: "Error",
            message: error.message || `Failed to create ${resource}`,
            color: "red",
          });
        },
      });
    },

    // Update existing item
    useUpdate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<T> }) =>
          api.update(id, data),
        onSuccess: (_, variables) => {
          queryClient.invalidateQueries({ queryKey: keys.lists() });
          queryClient.invalidateQueries({
            queryKey: keys.detail(variables.id),
          });
          notifications.show({
            title: "Success",
            message: `${resource} updated successfully`,
            color: "green",
          });
        },
        onError: (error: ApiError) => {
          notifications.show({
            title: "Error",
            message: error.message || `Failed to update ${resource}`,
            color: "red",
          });
        },
      });
    },

    // Delete item
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
        onError: (error: ApiError) => {
          notifications.show({
            title: "Error",
            message: error.message || `Failed to delete ${resource}`,
            color: "red",
          });
        },
      });
    },

    // Bulk delete items
    useBulkDelete: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (ids: string[]) => api.bulkDelete(ids),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: keys.lists() });
          notifications.show({
            title: "Success",
            message: `${resource} deleted successfully`,
            color: "green",
          });
        },
        onError: (error: ApiError) => {
          notifications.show({
            title: "Error",
            message: error.message || `Failed to delete ${resource}`,
            color: "red",
          });
        },
      });
    },
  };
}
