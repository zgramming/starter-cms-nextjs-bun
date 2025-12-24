import type { BaseQueryParams } from "@/core/types/query-params";

// Centralized Query Keys for React Query
// This ensures consistency and easy refactoring

export const queryKeys = {
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (params?: BaseQueryParams) =>
      [...queryKeys.users.lists(), params] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },

  roles: {
    all: ["roles"] as const,
    lists: () => [...queryKeys.roles.all, "list"] as const,
    list: (params?: BaseQueryParams) =>
      [...queryKeys.roles.lists(), params] as const,
    details: () => [...queryKeys.roles.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.roles.details(), id] as const,
  },

  parameters: {
    all: ["parameters"] as const,
    lists: () => [...queryKeys.parameters.all, "list"] as const,
    list: (params?: BaseQueryParams) =>
      [...queryKeys.parameters.lists(), params] as const,
    details: () => [...queryKeys.parameters.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.parameters.details(), id] as const,
  },

  categories: {
    all: ["categories"] as const,
    lists: () => [...queryKeys.categories.all, "list"] as const,
    list: (params?: BaseQueryParams) =>
      [...queryKeys.categories.lists(), params] as const,
    details: () => [...queryKeys.categories.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.categories.details(), id] as const,
  },

  modules: {
    all: ["modules"] as const,
    lists: () => [...queryKeys.modules.all, "list"] as const,
    list: (params?: BaseQueryParams) =>
      [...queryKeys.modules.lists(), params] as const,
    details: () => [...queryKeys.modules.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.modules.details(), id] as const,
  },

  menus: {
    all: ["menus"] as const,
    lists: () => [...queryKeys.menus.all, "list"] as const,
    list: (params?: BaseQueryParams) =>
      [...queryKeys.menus.lists(), params] as const,
    details: () => [...queryKeys.menus.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.menus.details(), id] as const,
  },
};

// Factory function to create query keys for any resource
export function createQueryKeys(resource: string) {
  return {
    all: [resource] as const,
    lists: () => [resource, "list"] as const,
    list: (params?: BaseQueryParams) => [resource, "list", params] as const,
    details: () => [resource, "detail"] as const,
    detail: (id: string) => [resource, "detail", id] as const,
  };
}
