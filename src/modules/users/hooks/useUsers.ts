import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import type { User } from "@/types/user";

interface UseUsersParams extends Record<string, unknown> {
  page?: number;
  pageSize?: number;
  search?: string;
}

export function useUsers(params: UseUsersParams = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const response = await userService.getAll(params);
      return response.data.data;
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Omit<User, "id">) => {
      const response = await userService.create(user);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: User) => {
      const response = await userService.update(user.id, user);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await userService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
