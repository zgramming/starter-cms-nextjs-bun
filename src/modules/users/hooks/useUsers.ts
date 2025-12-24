import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import type { User } from "@/types/user";
import type { PaginatedResponse, ApiError } from "@/types/api";

interface UseUsersParams extends Record<string, unknown> {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}

export function useUsers(params: UseUsersParams = {}) {
  return useQuery<PaginatedResponse<User>, ApiError>({
    queryKey: ["users", params],
    queryFn: async () => {
      const response = await userService.getAll(params);
      return response.data.data;
    },
  });
}

export function useUser(id: string) {
  return useQuery<User, ApiError>({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await userService.getById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
}

export * from "./useUserMutations";
