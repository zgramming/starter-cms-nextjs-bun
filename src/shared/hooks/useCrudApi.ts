import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryKeys } from "./queryKeys";
import { BaseRepository } from "@/core/api/base-repository";
import type { BaseQueryParams } from "@/core/types/query-params";
import { useMutationCallbacks } from "@/shared/utils/mutation-helpers";

export function createCrudHooks<T>(resource: string, api: BaseRepository<T>) {
  const keys = createQueryKeys(resource);

  return {
    useList: (params?: BaseQueryParams) => {
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
      const callbacks = useMutationCallbacks(resource, "created");
      return useMutation({
        mutationFn: (data: Partial<T>) => api.create(data),
        ...callbacks,
      });
    },

    useUpdate: () => {
      const queryClient = useQueryClient();
      const callbacks = useMutationCallbacks(resource, "updated");
      return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<T> }) =>
          api.update(id, data),
        onSuccess: (_, variables) => {
          queryClient.invalidateQueries({
            queryKey: keys.detail(variables.id),
          });
          callbacks.onSuccess();
        },
        onError: callbacks.onError,
      });
    },

    useDelete: () => {
      const callbacks = useMutationCallbacks(resource, "deleted");
      return useMutation({
        mutationFn: (id: string) => api.delete(id),
        ...callbacks,
      });
    },

    useBulkDelete: () => {
      const callbacks = useMutationCallbacks(resource, "deleted");
      return useMutation({
        mutationFn: (ids: string[]) => api.bulkDelete(ids),
        ...callbacks,
      });
    },
  };
}
